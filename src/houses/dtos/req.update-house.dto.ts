import { PartialType } from '@nestjs/mapped-types';
import { ReqCreateHouseDto } from './req.create-house.dto';

export class ReqUpdateHouseDto extends PartialType(ReqCreateHouseDto) {}
