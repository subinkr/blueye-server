import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class DataService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadImage(file: Express.Multer.File) {
    const extension = file.originalname.split('.').pop();
    const key = `images/${UUID()}.${extension}`;

    const url = await this.s3Service.uploadFile(
      key,
      file.buffer,
      file.mimetype,
    );

    return { url };
  }
}
