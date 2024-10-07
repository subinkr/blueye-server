import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { ReqCreateHouseDto } from './dtos/req.create-house.dto';
import { ReqUpdateHouseDto } from './dtos/req.update-house.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { ReqFindAllHouseDto } from './dtos/req.find-all-house.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  create(
    @Body() reqCreateHouseDto: ReqCreateHouseDto,
    @AuthId() loginUserId: number,
  ) {
    return this.housesService.create(reqCreateHouseDto, loginUserId);
  }

  @Get()
  findAll(@Query() reqFindAllHouseDto: ReqFindAllHouseDto) {
    return this.housesService.findAll(reqFindAllHouseDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housesService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() reqUpdateHouseDto: ReqUpdateHouseDto,
    @AuthId() loginUserId: number,
  ) {
    return this.housesService.update(+id, reqUpdateHouseDto, loginUserId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthId() loginUserId: number) {
    return this.housesService.remove(+id, loginUserId);
  }
}
