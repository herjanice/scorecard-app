import express, { response } from 'express';
import cors from 'cors';
import db from './backend/src/db';
import routes from './backend/src/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

db.connect();

const port = process.env.PORT || 4000
app.listen(port, () => 
    console.log(`App listen on port ${port}!`),
)