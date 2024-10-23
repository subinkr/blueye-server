import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReqCreateTourDto } from './dto/req.create-tour.dto';
import { ReqFindAllTourDto } from './dto/req.find-all-tour.dto';
import { ReqUpdateTourDto } from './dto/req.update-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/_core/entities/tour.entity';
import { Repository } from 'typeorm';
import { ResCreateTourDto } from './dto/res.create-tour.dto';
import { ResFindAllTourDto } from './dto/res.find-all-tour.dto';
import { ResFindOneTourDto } from './dto/res.find-one-tour.dto';
import { ResUpdateTourDto } from './dto/res.update-tour.dto';
import { ResRemoveTourDto } from './dto/res.remove-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepo: Repository<Tour>,
  ) {}

  async create(
    reqCreateTourDto: ReqCreateTourDto,
    loginUserId: number,
  ): Promise<ResCreateTourDto> {
    try {
      const tour = await this.tourRepo.save({
        ...reqCreateTourDto,
        writer: loginUserId,
      });

      return { id: tour.id };
    } catch (e) {
      throw new BadRequestException('입력하지 않은 내용이 있습니다.');
    }
  }

  async findAll(
    reqFindAllTourDto: ReqFindAllTourDto,
  ): Promise<ResFindAllTourDto[]> {
    const { city } = reqFindAllTourDto;
    const tours = await this.tourRepo.find({
      where: { city },
    });

    const resTours = tours.map((tour) => {
      return {
        id: tour.id,
        image: tour.images.split('|')[0],
        title: tour.title,
        date: tour.date,
        price: tour.price,
      };
    });

    return resTours;
  }

  async findOne(id: number, loginUserId: number): Promise<ResFindOneTourDto> {
    const tour = await this.tourRepo.findOne({
      where: { id },
    });
    if (!tour) {
      throw new NotFoundException('투어를 찾을 수 없습니다.');
    }

    return { tour, loginUserId };
  }

  async update(
    id: number,
    reqUpdateTourDto: ReqUpdateTourDto,
    loginUserId: number,
  ): Promise<ResUpdateTourDto> {
    const { tour } = await this.findOne(id, loginUserId);

    if (tour.writer !== loginUserId && loginUserId !== 0) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.tourRepo.update(id, reqUpdateTourDto);

    return { id, message: '수정되었습니다.' };
  }

  async remove(id: number, loginUserId: number): Promise<ResRemoveTourDto> {
    const { tour } = await this.findOne(id, loginUserId);
    if (tour.writer !== loginUserId && loginUserId !== 0) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.tourRepo.delete(id);

    return { message: '삭제되었습니다.' };
  }
}
