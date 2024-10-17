import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { ReqCreateHouseDto } from './dtos/req.create-house.dto';
import { ReqUpdateHouseDto } from './dtos/req.update-house.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { ReqFindAllHouseDto } from './dtos/req.find-all-house.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ResCreateHouseDto } from './dtos/res.create-house.dto';
import { ResFindAllHouseDto } from './dtos/res.find-all-house.dto';
import { House } from 'src/_core/entities/house.entity';
import { ResUpdateHouseDto } from './dtos/res.update-house.dto';
import { ResRemoveHouseDto } from './dtos/res.remove-house.dto';
import { ResFindOneHouseDto } from './dtos/res.find-one-house.dto';

@ApiTags('houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() reqCreateHouseDto: ReqCreateHouseDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateHouseDto> {
    return this.housesService.create(reqCreateHouseDto, loginUserId);
  }

  @Get()
  async findAll(
    @Query() reqFindAllHouseDto: ReqFindAllHouseDto,
  ): Promise<ResFindAllHouseDto[]> {
    return this.housesService.findAll(reqFindAllHouseDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ): Promise<ResFindOneHouseDto> {
    return this.housesService.findOne(+id, loginUserId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() reqUpdateHouseDto: ReqUpdateHouseDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateHouseDto> {
    return this.housesService.update(+id, reqUpdateHouseDto, loginUserId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveHouseDto> {
    return this.housesService.remove(+id, loginUserId);
  }
}
