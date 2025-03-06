import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { Track } from 'src/_core/entities/track.entity';
import { Log } from 'src/_core/entities/log.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ReqCreateLogDto } from './dtos/req.create-log.dto';
import { ReqCreateTrackDto } from './dtos/req.create-track.dto';
import { AuthGuard } from 'src/_common/auth/auth.guard';

@ApiTags('트랙')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: '트랙과 관련된 로그 가져오기' })
  @ApiResponse({ status: 200, description: '트랙과 로그가 성공적으로 조회되었습니다.' })
  @Get(':id')
  async findOneWithLogs(@Param('id') id: string) {
    return await this.tracksService.findOneWithLogs(id);
  }
  
  @Post()
  @ApiOperation({ summary: '새로운 트랙 생성' })
  @ApiResponse({ status: 201, description: '트랙이 성공적으로 생성되었습니다.' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['property', 'address'],
      properties: {
        property: {
          type: 'string',
          description: '부동산 이름',
          example: '서울 아파트',
        },
        address: {
          type: 'string',
          description: '부동산 주소',
          example: '서울특별시 강남구 테헤란로 123',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @AuthId() loginUserId: number,
    @Body() reqCreateTrackDto: ReqCreateTrackDto,
  ) {
    return await this.tracksService.create(reqCreateTrackDto, loginUserId);
  }

  @Delete(':id')
  @ApiOperation({ summary: '트랙 삭제' })
  @ApiResponse({ status: 200, description: '트랙이 성공적으로 삭제되었습니다.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @AuthId() loginUserId: number,
  ) {
    return await this.tracksService.remove(id, loginUserId);
  }
  
  @Post('log')
  @ApiOperation({ summary: '새로운 로그 생성' })
  @ApiResponse({ status: 201, description: '로그가 성공적으로 생성되었습니다.' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['content'],
      properties: {
        content: {
          type: 'string',
          description: '로그 내용',
          example: '트랙 생성 완료',
        },
        trackId: {
          type: 'string',
          description: '트랙 ID',
          nullable: true,
          example: '904c471f',
        },
        property: {
          type: 'string',
          description: '부동산 이름',
          nullable: true,
          example: '서울 아파트',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createLog(
    @AuthId() loginUserId: number,
    @Body() reqCreateLogDto: ReqCreateLogDto,
  ) {
    return await this.tracksService.createLog(reqCreateLogDto, loginUserId);
  }

  @Delete('log/:id')
  @ApiOperation({ summary: '로그 삭제' })
  @ApiResponse({ status: 200, description: '로그가 성공적으로 삭제되었습니다.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeLog(@Param('id') id: string, @AuthId() loginUserId: number) {
    return await this.tracksService.removeLog(id, loginUserId);
  }
}