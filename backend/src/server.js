import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import db from './db';
import dotenv from 'dotenv-defaults';
import cors from 'cors';
import routes from './routes';
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

db.connect();

app.use("/api", routes);
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});