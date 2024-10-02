import { Injectable } from '@nestjs/common';
import { ReqCreateHouseDto } from './dtos/req.create-house.dto';
import { ReqUpdateHouseDto } from './dtos/req.update-house.dto';

@Injectable()
export class HousesService {
  create(reqCreateHouseDto: ReqCreateHouseDto) {
    return 'This action adds a new house';
  }

  findAll() {
    return `This action returns all houses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} house`;
  }

  update(id: number, reqUpdateHouseDto: ReqUpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
