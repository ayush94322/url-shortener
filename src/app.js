import express from "express";
import prisma from "./prisma/client.js";

const app = express();

app.get('/', (req, res)=>{
    res.send(`Homepage`);
});

export default app;