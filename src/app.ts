import { config as configEnv } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { documentRouter } from './routes/document';

configEnv();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (_, res) => res.sendStatus(200));
// Despite the naming inconsistency, a collection is a group of documents
app.use('/Collections', documentRouter);

export default app;