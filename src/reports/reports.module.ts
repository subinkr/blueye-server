import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from '../_core/entities/report.entity';
import { S3Module } from '../_common/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    S3Module,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
