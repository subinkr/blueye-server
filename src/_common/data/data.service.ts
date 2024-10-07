import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  async uploadImage(file: Express.Multer.File) {
    const image = file.filename;
    return { image };
  }
}
