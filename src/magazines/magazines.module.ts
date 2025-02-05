import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagazinesController } from './magazines.controller';
import { MagazinesService } from './magazines.service';
import { Magazine } from '../_core/entities/magazine.entity';
import { S3Service } from '../_common/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazinesController],
  providers: [MagazinesService, S3Service],
})
export class MagazinesModule {}
