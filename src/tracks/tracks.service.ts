import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../_core/entities/track.entity';
import { Log } from '../_core/entities/log.entity';
import { v4 as uuidv4 } from 'uuid';
import { ReqCreateTrackDto } from './dtos/req.create-track.dto';
import { ReqCreateLogDto } from './dtos/req.create-log.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async findOneWithLogs(trackId: string): Promise<{ track: Track; logs: Log[] }> {
    const track = await this.trackRepository.findOneBy({ id: trackId, deleted: false });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const logs = await this.logRepository.find({ where: { tracks: { id: trackId } } });
    return { track, logs };
  }

  async create(reqCreateTrackDto: ReqCreateTrackDto, loginUserId: number): Promise<Track> {
    if (loginUserId === undefined) {
      throw new ForbiddenException('User ID is required');
    }
    const track = this.trackRepository.create({ ...reqCreateTrackDto, id: uuidv4().slice(0, 8) });
    return this.trackRepository.save(track);
  }

  async createLog(reqCreateLogDto: ReqCreateLogDto, loginUserId: number): Promise<Log> {
    if (loginUserId === undefined) {
      throw new ForbiddenException('User ID is required');
    }
    let tracks: Track[] = [];
    if (reqCreateLogDto.trackId) {
      const track = await this.trackRepository.findOneBy({ id: reqCreateLogDto.trackId, deleted: false });
      if (track) tracks.push(track);
    } else if (reqCreateLogDto.property) {
      tracks = await this.trackRepository.find({ where: { property: reqCreateLogDto.property, deleted: false } });
    }

    if (tracks.length === 0) {
      throw new NotFoundException('No tracks found for the given criteria');
    }
    const log = this.logRepository.create({ content: reqCreateLogDto.content, tracks });
    return this.logRepository.save(log);
  }

  async remove(trackId: string, loginUserId: number): Promise<void> {
    if (loginUserId === undefined) {
      throw new ForbiddenException('User ID is required');
    }
    
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    
    // Soft delete by updating the deleted flag
    track.deleted = true;
    await this.trackRepository.save(track);
  }

  async removeLog(logId: string, loginUserId: number): Promise<void> {
    if (loginUserId === undefined) {
      throw new ForbiddenException('User ID is required');
    }
    await this.logRepository.delete(logId);
  }
}
