import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/_core/entities/track.entity';
import { Log } from 'src/_core/entities/log.entity';
import { AuthService } from 'src/_common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Log])],
  controllers: [TracksController],
  providers: [TracksService, AuthService, JwtService],
})
export class TracksModule {}
