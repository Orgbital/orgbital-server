import { config as configEnv } from 'dotenv';
import express from 'express';


configEnv();

const app = express();

app.get('/', (_, res) => res.sendStatus(200));

export default app;