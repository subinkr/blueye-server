import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
  Put,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { ReqCreateTourDto } from './dto/req.create-tour.dto';
import { ReqFindAllTourDto } from './dto/req.find-all-tour.dto';
import { ReqUpdateTourDto } from './dto/req.update-tour.dto';
import { ResCreateTourDto } from './dto/res.create-tour.dto';
import { ResFindAllTourDto } from './dto/res.find-all-tour.dto';
import { ResFindOneTourDto } from './dto/res.find-one-tour.dto';
import { ResUpdateTourDto } from './dto/res.update-tour.dto';
import { ResRemoveTourDto } from './dto/res.remove-tour.dto';

@ApiTags('tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() reqCreateTourDto: ReqCreateTourDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateTourDto> {
    return this.toursService.create(reqCreateTourDto, loginUserId);
  }

  @Get()
  async findAll(
    @Query() reqFindAllTourDto: ReqFindAllTourDto,
  ): Promise<ResFindAllTourDto[]> {
    return this.toursService.findAll(reqFindAllTourDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ): Promise<ResFindOneTourDto> {
    return this.toursService.findOne(+id, loginUserId);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() reqUpdateTourDto: ReqUpdateTourDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateTourDto> {
    return this.toursService.update(+id, reqUpdateTourDto, loginUserId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveTourDto> {
    return this.toursService.remove(+id, loginUserId);
  }
}
