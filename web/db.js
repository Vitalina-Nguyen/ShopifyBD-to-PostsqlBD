import postgres from 'postgres'
import * as dotenv from 'dotenv';
dotenv.config()
import express from "express";

const sql = postgres(
    process.env.URL, {
    host: process.env.DB_HOST,            
    port: 5432,         
    database: process.env.DATABASE,            
    username: process.env.DB_USERNAME,            
    password: process.env.DB_PASSWORD,            
    ssl: true,

}) 

export default sql