import postgres from 'postgres'

const sql = postgres(
    'postgres://marvel:kk3251Dn14mqqUoKmrEmG6vwV5QwlbjL@dpg-cfr2erpmbjsgn6tn8ueg-a.oregon-postgres.render.com/shopify_products?ssl=true', {
    host: 'dpg-cfr2erpmbjsgn6tn8ueg-a.oregon-postgres.render.com',            
    port: 5432,         
    database: 'shopify_products',            
    username: 'marvel',            
    password: 'kk3251Dn14mqqUoKmrEmG6vwV5QwlbjL',            
    ssl: true,

}) 

export default sql