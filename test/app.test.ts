import { makeFetch } from 'supertest-fetch';

import app from '../src/app';

const fetch = makeFetch(app);

test('GET /', async () => {
  await fetch('/')
    .expectStatus(200)
    .expectBody("OK");
})