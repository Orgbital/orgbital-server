import { createServer } from 'http';
import WebSocketJSONStream from '@soundation/websocket-json-stream';
import { Server as WebSocketServer } from 'ws';

import app from './app';
import share from './share';

const PORT = process.env.APP_PORT || 8080;

const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', (ws: WebSocket) => {
  // constructs a websocket stream that knows how to deal with JS objects
  const stream = new WebSocketJSONStream(ws);
  
  share.listen(stream); // let sharedb listen to this json stream
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}.`));