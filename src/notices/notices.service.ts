import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/_core/entities/notice.entity';
import { ReqCreateNoticeDto } from './dtos/req.create-notice.dto';
import { ReqUpdateNoticeDto } from './dtos/req.update-notice.dto';
import { ReqFindAllNoticeDto } from './dtos/req.find-all-notice.dto';
import { ResCreateNoticeDto } from './dtos/res.create-notice.dto';
import { ResFindAllNoticeDto } from './dtos/res.find-all-notice.dto';
import { ResFindOneNoticeDto } from './dtos/res.find-one-notice.dto';
import { ResUpdateNoticeDto } from './dtos/res.update-notice.dto';
import { ResRemoveNoticeDto } from './dtos/res.remove-notice.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepo: Repository<Notice>,
  ) {}

  async create(
    reqCreateNoticeDto: ReqCreateNoticeDto,
    loginUserId: number,
  ): Promise<ResCreateNoticeDto> {
    try {
      const notice = await this.noticeRepo.save({
        ...reqCreateNoticeDto,
        writer: loginUserId,
      });

      return { id: notice.id };
    } catch (e) {
      throw new BadRequestException('입력하지 않은 내용이 있습니다.');
    }
  }

  async findAll(
    reqFindAllNoticeDto: ReqFindAllNoticeDto,
  ): Promise<ResFindAllNoticeDto[]> {
    const { page = 1, limit = 10 } = reqFindAllNoticeDto;
    
    const notices = await this.noticeRepo
      .createQueryBuilder('notice')
      .orderBy('notice.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return notices.map((notice) => ({
      id: notice.id,
      title: notice.title,
      content: notice.content,
      writer: notice.writer,
      created_at: notice.created_at,
      updated_at: notice.updated_at,
    }));
  }

  async findOne(id: number): Promise<ResFindOneNoticeDto> {
    const notice = await this.noticeRepo.findOne({
      where: { id },
    });

    if (!notice) {
      throw new NotFoundException('공지사항을 찾을 수 없습니다.');
    }

    return {
      id: notice.id,
      title: notice.title,
      content: notice.content,
      writer: notice.writer,
      created_at: notice.created_at,
      updated_at: notice.updated_at,
    };
  }

  async update(
    id: number,
    reqUpdateNoticeDto: ReqUpdateNoticeDto,
    loginUserId: number,
  ): Promise<ResUpdateNoticeDto> {
    const notice = await this.noticeRepo.findOne({
      where: { id },
    });

    if (!notice) {
      throw new NotFoundException('공지사항을 찾을 수 없습니다.');
    }

    if (notice.writer !== loginUserId) {
      throw new BadRequestException('수정 권한이 없습니다.');
    }

    try {
      await this.noticeRepo.update(id, reqUpdateNoticeDto);
      return { id };
    } catch (e) {
      throw new BadRequestException('수정에 실패했습니다.');
    }
  }

  async remove(id: number, loginUserId: number): Promise<ResRemoveNoticeDto> {
    const notice = await this.noticeRepo.findOne({
      where: { id },
    });

    if (!notice) {
      throw new NotFoundException('공지사항을 찾을 수 없습니다.');
    }

    if (notice.writer !== loginUserId) {
      throw new BadRequestException('삭제 권한이 없습니다.');
    }

    try {
      await this.noticeRepo.delete(id);
      return { id };
    } catch (e) {
      throw new BadRequestException('삭제에 실패했습니다.');
    }
  }
}
