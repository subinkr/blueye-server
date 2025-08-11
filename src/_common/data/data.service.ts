import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { S3Service } from '../s3/s3.service';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DataService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadImage(file: Express.Multer.File) {
    try {
      const extension = file.originalname.split('.').pop();
      const key = `images/${UUID()}.${extension}`;

      // 파일 시스템에서 파일 읽기
      const filePath = join(process.cwd(), 'uploads', file.filename);
      const fileBuffer = readFileSync(filePath);

      // S3에 업로드
      const url = await this.s3Service.uploadFile(
        key,
        fileBuffer,
        file.mimetype,
      );

      // 로컬 파일 삭제
      try {
        unlinkSync(filePath);
      } catch (error) {
        console.warn('로컬 파일 삭제 실패:', error);
      }

      return { url };
    } catch (error) {
      console.error('이미지 업로드 에러:', error);
      throw error;
    }
  }
}
