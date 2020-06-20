import { NextFunction, Router, Request, Response } from 'express';
import sharedb from '../share';
import { v4 as uuidv4 } from 'uuid';

export const documentRouter = Router();

/**
 * Returns a uuid to a document.
 * TODO: Retrieve document contents, probably from body
 */
export const createDocumentHandler = ({ body, params }: Request, res: Response<string>, next: NextFunction): void => {
  const { collectionName } = params;
  const id: string = uuidv4();
  createDocument(id, collectionName, body)
    .then(id => res.status(201).send(id))
    .catch(err => next(err));
}

export function createDocument (id: string, collectionName: string, content: Record<string, unknown>): Promise<string> {
  return new Promise((resolve, reject) => {
    const connection = sharedb.connect();
    const doc = connection.get(collectionName, id);

    doc.create(content, err => {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    })

  })
}

documentRouter
  .post('/Documents/:collectionName/', createDocumentHandler);

export default {
  createDocument,
  createDocumentHandler,
  documentRouter,
};
