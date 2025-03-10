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
    description?: string,
    published?: string,
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
        description,
        published,
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

  async delete(id: number) {
    const magazine = await this.magazinesRepository.findOne({ where: { id } });
    
    if (!magazine) {
      throw new NotFoundException(`Magazine with ID ${id} not found`);
    }

    try {
      // Extract the key from the thumbnailUrl
      // Assuming the thumbnailUrl format is like https://bucket-name.s3.region.amazonaws.com/magazine-thumbnails/filename
      if (magazine.thumbnailUrl) {
        const urlParts = magazine.thumbnailUrl.split('/');
        const keyIndex = urlParts.findIndex(part => part === 'magazine-thumbnails');
        
        if (keyIndex !== -1) {
          const key = urlParts.slice(keyIndex).join('/');
          // Delete the file from S3
          await this.s3Service.deleteFile(key);
        }
      }

      // Delete the magazine from the database
      const result = await this.magazinesRepository.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Magazine with ID ${id} not found`);
      }
      
      return { success: true, message: `Magazine with ID ${id} has been deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete magazine: ${error.message}`);
    }
  }
}
