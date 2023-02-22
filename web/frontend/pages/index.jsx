import {
  Card,
  Page,
  Layout,
  TextContainer,
  Stack,
  Button,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export default function HomePage() {

  const fetch = useAuthenticatedFetch();

  const onClick = async () => {
    const result = await fetch ("/api/products/all");
    console.log(result);
  }

  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Button onClick={onClick}>Send database</Button>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
