import { Router, Request, Response } from 'express';
import { connection } from '../share';
import { v4 as uuidv4 } from 'uuid';

const documentRouter = Router();

/**
 * Returns a uuid to a document.
 * TODO: Retrieve document contents, probably from body
 */
documentRouter.post('/:collectionName/Documents/', ({ params }: Request, res: Response<string>) => {
  const { collectionName } = params;
  createDocument(collectionName)
    .then(id => res.status(201).send(id));
  res.send('foo');
})

documentRouter.get('/:collectionName/Documents/:documentId', ({ params }: Request, res: Response<unknown>) => {
  const { collectionName, documentId } = params;
  fetchDocument(collectionName, documentId)
    .then(() => res.status(201));
})

function createDocument (collectionName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const id: string = uuidv4();
    // TODO: See if there's a way to create document without connection.get()
    const doc = connection.get(collectionName, id);

    doc.fetch(err => {
      if (err) {
        reject(err);
      }

      resolve(id);
    })
  })
}

function fetchDocument (collectionName: string, documentId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = connection.get(collectionName, documentId);

    doc.fetch(err => {
      if (err) {
        reject(err);
      }

      resolve();
    })
  })
}

export default documentRouter;
