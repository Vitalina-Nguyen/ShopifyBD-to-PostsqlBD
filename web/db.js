import postgres from 'postgres'

const sql = postgres(
    'postgres://marvel:kk3251Dn14mqqUoKmrEmG6vwV5QwlbjL@dpg-cfr2erpmbjsgn6tn8ueg-a/shopify_products', {
    host: 'dpg-cfr2erpmbjsgn6tn8ueg-a',            // Postgres ip address[s] or domain name[s]
    port: 5432,          // Postgres server port[s]
    database: 'shopify_products',            // Name of database to connect to
    username: 'marvel',            // Username of database user
    password: 'kk3251Dn14mqqUoKmrEmG6vwV5QwlbjL',            // Password of database user

}) 

export default sql