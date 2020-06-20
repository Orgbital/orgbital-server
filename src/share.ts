import ShareDb from 'sharedb';

const share = new ShareDb({
  db: new ShareDb.MemoryDB(),
});

export const connection = share.connect();

export default share;
