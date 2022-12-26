import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import routes from './routes';
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes);
// app.use(bodyParser.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});

db.connect();

const port = process.env.PORT || 4000
app.listen(port, () => 
    console.log(`App listen on port ${port}!`),
)