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
  HttpCode,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { ReqCreateHouseDto } from './dtos/req.create-house.dto';
import { ReqUpdateHouseDto } from './dtos/req.update-house.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { ReqFindAllHouseDto } from './dtos/req.find-all-house.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ResCreateHouseDto } from './dtos/res.create-house.dto';
import { ResFindAllHouseDto } from './dtos/res.find-all-house.dto';
import { ResUpdateHouseDto } from './dtos/res.update-house.dto';
import { ResRemoveHouseDto } from './dtos/res.remove-house.dto';
import { ResFindOneHouseDto } from './dtos/res.find-one-house.dto';

@ApiTags('매물')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '매물 등록',
    description: '새로운 매물을 등록합니다. 인증이 필요한 작업입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '매물 등록 성공',
    type: ResCreateHouseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  async create(
    @Body() reqCreateHouseDto: ReqCreateHouseDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateHouseDto> {
    return this.housesService.create(reqCreateHouseDto, loginUserId);
  }

  @Get()
  @ApiOperation({
    summary: '매물 목록 조회',
    description: '조건에 맞는 매물 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '매물 목록 조회 성공',
    type: [ResFindAllHouseDto],
  })
  async findAll(
    @Query() reqFindAllHouseDto: ReqFindAllHouseDto,
  ): Promise<ResFindAllHouseDto[]> {
    return this.housesService.findAll(reqFindAllHouseDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '매물 상세 조회',
    description: '특정 매물의 상세 정보를 조회합니다. 인증이 필요한 작업입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '매물 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '매물 상세 조회 성공',
    type: ResFindOneHouseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 404,
    description: '매물을 찾을 수 없음',
  })
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
  @ApiOperation({
    summary: '매물 정보 수정',
    description: '특정 매물의 정보를 수정합니다. 인증이 필요한 작업입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '매물 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '매물 수정 성공',
    type: ResUpdateHouseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 404,
    description: '매물을 찾을 수 없음',
  })
  async update(
    @Param('id') id: string,
    @Body() reqUpdateHouseDto: ReqUpdateHouseDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateHouseDto> {
    return this.housesService.update(+id, reqUpdateHouseDto, loginUserId);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '매물 삭제',
    description: '특정 매물을 삭제합니다. 인증이 필요한 작업입니다.',
  })
  @ApiParam({
    name: 'id',
    description: '매물 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '매물 삭제 성공',
    type: ResRemoveHouseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 404,
    description: '매물을 찾을 수 없음',
  })
  async remove(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveHouseDto> {
    return this.housesService.remove(+id, loginUserId);
  }
}
