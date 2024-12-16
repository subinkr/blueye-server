import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../_core/entities/report.entity';
import { S3Service } from '../_common/s3/s3.service';
import { PDFDocument } from 'pdf-lib';
import * as path from 'path';

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

  async create(file: Express.Multer.File, title: string) {
    const fileName = this.sanitizeFileName(file.originalname);
    const pdfKey = `reports/${fileName}`;
    const thumbnailKey = `thumbnails/${fileName}.png`;

    try {
      const s3Url = await this.s3Service.uploadFile(
        pdfKey,
        file.buffer,
        'application/pdf'
      );

      const pdfDoc = await PDFDocument.load(file.buffer);
      const pages = pdfDoc.getPages();
      if (pages.length > 0) {
        // TODO: Implement thumbnail generation
      }

      const report = this.reportsRepository.create({
        title,
        fileName,
        filePath: pdfKey,
        thumbnailPath: thumbnailKey,
      });

      return this.reportsRepository.save(report);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.reportsRepository.find({
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
