import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { Notice } from 'src/_core/entities/notice.entity';
import { AuthService } from 'src/_common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [NoticesController],
  providers: [NoticesService, AuthService, JwtService],
  exports: [NoticesService],
})
export class NoticesModule {}
