import { Readable } from 'typeorm/platform/PlatformTools';

export const emptyFile = {
  fieldname: '',
  originalname: '',
  encoding: '',
  mimetype: '',
  size: 1,
  stream: new Readable(),
  destination: '',
  filename: '',
  path: '',
  buffer: Buffer.alloc(1),
};
