import express from 'express';

const app = express();

app.get('/', (_, res) => res.send('Hello.'));

app.listen(3000);
