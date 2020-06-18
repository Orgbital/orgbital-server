import { config as configEnv } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import { documentRouter } from './routes/document';

configEnv();

const app = express();
app.use(bodyParser.urlencoded());

app.get('/', (_, res) => res.sendStatus(200));
// Despite the naming inconsistency, a collection is a group of documents
app.use('/Collections', documentRouter);

export default app;