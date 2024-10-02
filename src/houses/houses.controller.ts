import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { ReqCreateHouseDto } from './dtos/req.create-house.dto';
import { ReqUpdateHouseDto } from './dtos/req.update-house.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  create(@Body() reqCreateHouseDto: ReqCreateHouseDto) {
    return this.housesService.create(reqCreateHouseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() reqUpdateHouseDto: ReqUpdateHouseDto,
  ) {
    return this.housesService.update(+id, reqUpdateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housesService.remove(+id);
  }
}
