import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../_core/entities/report.entity';
import { S3Service } from '../_common/s3/s3.service';
import * as path from 'path';
import { fromBuffer } from 'pdf2pic';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as os from 'os';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
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
    file: Express.Multer.File,
    thumbnail: Express.Multer.File | undefined,
    title: string,
    country: string
  ) {
    const fileName = this.sanitizeFileName(file.originalname);
    const pdfKey = `reports/${fileName}`;
    const thumbnailKey = `thumbnails/${fileName}.png`;

    try {
      // Upload PDF to S3
      const pdfUrl = await this.s3Service.uploadFile(
        pdfKey,
        file.buffer,
        'application/pdf'
      );

      let thumbnailUrl = '';

      // Handle thumbnail
      if (thumbnail) {
        // If thumbnail is provided, optimize it
        const optimizedThumbnail = await sharp(thumbnail.buffer)
          .resize(800, 800, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .png({ quality: 80 })
          .toBuffer();

        // Upload optimized thumbnail to S3
        thumbnailUrl = await this.s3Service.uploadFile(
          thumbnailKey,
          optimizedThumbnail,
          'image/png'
        );
      } else {
        // Generate thumbnail from PDF if no thumbnail provided
        const tempDir = os.tmpdir();
        const tempImagePath = path.join(tempDir, `${fileName}.png`);

        try {
          // Generate thumbnail from PDF
          const options = {
            density: 100,
            saveFilename: fileName,
            savePath: tempDir,
            format: "png",
            width: 800,
            height: 800
          };
          
          const convert = fromBuffer(file.buffer, options);
          await convert(1);
          
          // Optimize the generated thumbnail
          const thumbnailBuffer = await sharp(tempImagePath)
            .resize(800, 800, {
              fit: 'contain',
              background: { r: 255, g: 255, b: 255, alpha: 1 }
            })
            .png({ quality: 80 })
            .toBuffer();

          // Upload to S3
          thumbnailUrl = await this.s3Service.uploadFile(
            thumbnailKey,
            thumbnailBuffer,
            'image/png'
          );

          // Clean up temporary file
          fs.unlinkSync(tempImagePath);
        } catch (error) {
          console.error('Error generating thumbnail from PDF:', error);
          // Continue without thumbnail if generation fails
        }
      }

      const report = this.reportsRepository.create({
        title,
        fileName,
        filePath: pdfUrl,
        thumbnailPath: thumbnailUrl,
        country,
      });

      return this.reportsRepository.save(report);
    } catch (error) {
      // Cleanup on error
      try {
        await this.s3Service.deleteFile(pdfKey);
        await this.s3Service.deleteFile(thumbnailKey);
      } catch (cleanupError) {
        console.error('Error cleaning up files:', cleanupError);
      }
      throw error;
    }
  }

  findAll(country?: string) {
    const where = country ? { country } : {};
    return this.reportsRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.reportsRepository.findOne({ where: { id } });
  }

  async getFile(id: number) {
    const report = await this.findOne(id);
    if (!report) {
      return null;
    }

    return this.s3Service.getSignedUrl(report.filePath);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    if (!report) {
      return null;
    }

    // Delete files from S3
    await this.s3Service.deleteFile(report.filePath);
    if (report.thumbnailPath) {
      await this.s3Service.deleteFile(report.thumbnailPath);
    }

    // Delete from database
    await this.reportsRepository.remove(report);
    return true;
  }
}
