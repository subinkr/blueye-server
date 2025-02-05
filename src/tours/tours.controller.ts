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
  HttpCode,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { ApiBearerAuth, ApiConsumes, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
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

@ApiTags('투어')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '투어 생성',
    description: '새로운 투어를 생성합니다. 인증이 필요한 작업입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '투어 생성 성공',
    type: ResCreateTourDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  async create(
    @Body() reqCreateTourDto: ReqCreateTourDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateTourDto> {
    return this.toursService.create(reqCreateTourDto, loginUserId);
  }

  @Get()
  @ApiOperation({
    summary: '투어 목록 조회',
    description: '조건에 맞는 투어 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '투어 목록 조회 성공',
    type: [ResFindAllTourDto],
  })
  async findAll(
    @Query() reqFindAllTourDto: ReqFindAllTourDto,
  ): Promise<ResFindAllTourDto[]> {
    return this.toursService.findAll(reqFindAllTourDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '투어 상세 조회',
    description: '특정 투어의 상세 정보를 조회합니다. 인증이 필요한 작업입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '투어 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '투어 상세 조회 성공',
    type: ResFindOneTourDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 404,
    description: '투어를 찾을 수 없음',
  })
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
  @ApiOperation({
    summary: '투어 수정',
    description: '특정 투어의 정보를 수정합니다. 인증이 필요한 작업입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '투어 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '투어 수정 성공',
    type: ResUpdateTourDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 404,
    description: '투어를 찾을 수 없음',
  })
  async update(
    @Param('id') id: string,
    @Body() reqUpdateTourDto: ReqUpdateTourDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateTourDto> {
    return this.toursService.update(+id, reqUpdateTourDto, loginUserId);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '투어 삭제',
    description: '특정 투어를 삭제합니다. 인증이 필요한 작업입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '투어 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '투어 삭제 성공',
    type: ResRemoveTourDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 404,
    description: '투어를 찾을 수 없음',
  })
  async remove(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveTourDto> {
    return this.toursService.remove(+id, loginUserId);
  }
}
