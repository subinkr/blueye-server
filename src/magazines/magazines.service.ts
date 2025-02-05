import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magazine } from '../_core/entities/magazine.entity';
import { S3Service } from '../_common/s3/s3.service';
import * as path from 'path';

@Injectable()
export class MagazinesService {
  constructor(
    @InjectRepository(Magazine)
    private magazinesRepository: Repository<Magazine>,
    private s3Service: S3Service,
  ) {}

  private sanitizeFileName(fileName: string): string {
    const ext = path.extname(fileName);
    const nameWithoutExt = path.basename(fileName, ext);
    const timestamp = new Date().getTime();
    const sanitizedName = nameWithoutExt
      .replace(/[^\w\s가-힣]/g, '')
      .replace(/\s+/g, '_');
    return `${timestamp}-${sanitizedName}${ext}`;
  }

  async create(
    thumbnail: Express.Multer.File,
    title: string,
    type: string,
    redirectUrl: string,
  ) {
    const fileName = this.sanitizeFileName(thumbnail.originalname);
    const thumbnailKey = `magazine-thumbnails/${fileName}`;

    try {
      // Upload thumbnail to S3
      const thumbnailUrl = await this.s3Service.uploadFile(
        thumbnailKey,
        thumbnail.buffer,
        'image/png',
      );

      // Create magazine record
      const magazine = this.magazinesRepository.create({
        title,
        type,
        thumbnailUrl,
        redirectUrl,
      });

      return await this.magazinesRepository.save(magazine);
    } catch (error) {
      throw error;
    }
  }

  async findAll(type?: string) {
    const query = this.magazinesRepository.createQueryBuilder('magazine');
    
    if (type) {
      query.where('magazine.type = :type', { type });
    }

    query.orderBy('magazine.id', 'DESC');
    
    return await query.getMany();
  }
}
