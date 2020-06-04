import express from 'express';
import ShareDb from 'sharedb';
import http from 'http';
import { Server as WebSocketServer } from 'ws';
import { type as OtTextType } from 'ot-text-unicode';
import WebSocketJSONStream from '@soundation/websocket-json-stream';

// Register ot-text-unicode document type so ShareDb can recognize it
ShareDb.types.register(OtTextType);

const backend = new ShareDb();
const PORT = 8080;

function createDoc (cb: () => void): void {
  const conn = backend.connect();
  // Hardcode a doc for PoC purposes
  const doc = conn.get('foo', 'bar');
  doc.fetch(err => {
    if (err) throw err;

    if (doc.type === null) {
      doc.create({ content: "public class Program {}" }, cb);
      return;
    }

    cb();
  })
}

function startServer (): void {
  const app = express();
  const server = http.createServer(app);

  app.get('/', (_, res) => res.send('Hello World!'));

  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws: WebSocket) => {
    // constructs a websocket stream that knows how to deal with JS objects
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream); // let sharedb listen to this json stream
  });

  server.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
};

createDoc(startServer);
