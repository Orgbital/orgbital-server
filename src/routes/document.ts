import { Router, Request, Response } from 'express';
import type { Connection } from 'sharedb';
import { connection } from '../share';
import { v4 as uuidv4 } from 'uuid';

export const documentRouter = Router();

/**
 * Returns a uuid to a document.
 * TODO: Retrieve document contents, probably from body
 */
export const createDocumentHandler = ({ body, params }: Request, res: Response<string>): void => {
  const { collectionName } = params;
  const { bufferContent } = body;
  const id: string = uuidv4();
  createDocument(id, collectionName, connection, bufferContent)
    .then(id => res.status(201).send(id));
}

export function createDocument (id: string, collectionName: string, connection: Connection, content: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // TODO: See if there's a way to create document without connection.get()
    const doc = connection.get(collectionName, id);

    doc.create({ content }, err => {
      if (err) {
        reject(err);
      }
    })

    resolve(id);
  })
}

// function fetchDocument (collectionName: string, documentId: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const doc = connection.get(collectionName, documentId);

//     doc.fetch(err => {
//       if (err) {
//         reject(err);
//       }

//       resolve();
//     })
//   })
// }

documentRouter
  .post('/Documents/:collectionName/', createDocumentHandler);

export default {
  createDocument,
  createDocumentHandler,
  documentRouter,
};
