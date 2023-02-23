// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import sql from "./db.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

//Get all products
app.get("/api/products/all", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    const allProducts = await shopify.api.rest.Product.all({
      session: res.locals.shopify.session,
    });

    // console.log(allProducts);
    const allProductsAdded = allProducts.map(async (product) => {
      // insert into products (
      //   shopify_id, title, description )
      // values (${product.id}, ${product.title}, ${product.body_html})
      // on conflict (shopify_id)
      // do update
      //     set shopify_id = ${product.id},
      //     title = ${product.title},
      //     description = ${product.body_html}

      const productData = {
        title: product.title,
        shopify_id: product.id,
        description: product.body_html,
      };

      await sql`
      update products set 
        title = ${product.title},
        shopify_id = ${product.id},
        description = ${product.body_html}
      
        where shopify_id = ${product.id}
      `;

      let newProduct =
        await sql` select shopify_id from products where shopify_id = ${product.id} `;
      if (!newProduct) console.log("NULLLLLLLL");
      // console.log(newProduct);

      // await sql`
      // insert into products
      //   (title, shopify_id, description)
      //   values (${product.title}, ${product.id}, ${product.body_html})

      //  `;
    });

    console.log("END ");
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }

  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
