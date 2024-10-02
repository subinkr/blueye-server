import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  async uploadImages(files: Express.Multer.File[]) {
    const images = files.map((file) => file.filename).join('\n');
    return images;
  }
}
