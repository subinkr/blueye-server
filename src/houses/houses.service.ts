import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReqCreateHouseDto } from './dtos/req.create-house.dto';
import { ReqUpdateHouseDto } from './dtos/req.update-house.dto';
import { Repository } from 'typeorm';
import { House } from 'src/_core/entities/house.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqFindAllHouseDto } from './dtos/req.find-all-house.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepo: Repository<House>,
  ) {}

  async create(reqCreateHouseDto: ReqCreateHouseDto, loginUserId: number) {
    try {
      const house = await this.houseRepo.save({
        ...reqCreateHouseDto,
        writer: loginUserId,
      });

      return { id: house.id };
    } catch (e) {
      throw new BadRequestException('입력하지 않은 내용이 있습니다.');
    }
  }

  async findAll(reqFindAllHouseDto: ReqFindAllHouseDto) {
    const { city } = reqFindAllHouseDto;
    const houses = await this.houseRepo.find({
      where: { city },
    });

    const resHouses = houses.map((house) => {
      return {
        id: house.id,
        image: house.images.split('|')[0],
        title: house.title,
        date: house.date,
        price: house.price,
      };
    });

    return resHouses;
  }

  async findOne(id: number) {
    const house = await this.houseRepo.findOne({
      where: { id },
    });

    return house;
  }

  async update(
    id: number,
    reqUpdateHouseDto: ReqUpdateHouseDto,
    loginUserId: number,
  ) {
    const house = await this.houseRepo.findOne({
      where: { id },
    });
    if (house.writer !== loginUserId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.houseRepo.update(id, reqUpdateHouseDto);

    return { message: '수정되었습니다.' };
  }

  async remove(id: number, loginUserId: number) {
    const house = await this.houseRepo.findOne({
      where: { id },
    });
    if (house.writer !== loginUserId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.houseRepo.delete(id);

    return { message: '삭제되었습니다.' };
  }
}
