import { Controller, Get, Post, Delete, UseInterceptors, UploadedFile, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MagazinesService } from './magazines.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Magazine } from '../_core/entities/magazine.entity';

@ApiTags('잡지')
@Controller('magazines')
export class MagazinesController {
  constructor(private readonly magazinesService: MagazinesService) {}

  @Post()
  @ApiOperation({ 
    summary: '잡지 업로드', 
    description: '잡지 썸네일과 정보를 업로드합니다.' 
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('thumbnail'))
  @ApiBody({
    schema: {
      type: 'object',
      required: ['thumbnail', 'title', 'type', 'redirectUrl'],
      properties: {
        thumbnail: {
          type: 'string',
          format: 'binary',
          description: '썸네일 이미지 (PNG/JPG/JPEG)',
        },
        title: {
          type: 'string',
          description: '잡지 제목',
          example: '2024년 1월호',
        },
        type: {
          type: 'string',
          description: '잡지 종류',
          example: 'monthly',
        },
        redirectUrl: {
          type: 'string',
          description: '이동할 URL',
          example: 'https://example.com/magazine/2024-01',
        },
        description: {
          type: 'string',
          description: '잡지 내용 설명',
          example: '이번 호는 부동산 시장의 주요 동향과 전망을 다룹니다.',
        },
        published: {
          type: 'string',
          description: '발행일 (YYYY-MM-DD 형식)',
          example: '2025-03-10',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '잡지 업로드 성공',
    type: Magazine,
  })
  async create(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body('title') title: string,
    @Body('type') type: string,
    @Body('redirectUrl') redirectUrl: string,
    @Body('description') description?: string,
    @Body('published') published?: string,
  ) {
    return await this.magazinesService.create(thumbnail, title, type, redirectUrl, description, published);
  }

  @Get()
  @ApiOperation({ 
    summary: '잡지 목록 조회', 
    description: '잡지 목록을 조회합니다. type 파라미터로 필터링할 수 있습니다.' 
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: '잡지 종류로 필터링',
    example: 'monthly',
  })
  @ApiResponse({
    status: 200,
    description: '잡지 목록 조회 성공',
    type: [Magazine],
  })
  async findAll(@Query('type') type?: string) {
    return await this.magazinesService.findAll(type);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: '잡지 삭제', 
    description: '특정 ID의 잡지를 삭제합니다.' 
  })
  @ApiResponse({
    status: 200,
    description: '잡지 삭제 성공',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true,
        },
        message: {
          type: 'string',
          example: 'Magazine with ID 1 has been deleted',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '잡지를 찾을 수 없음',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'Magazine with ID 999 not found',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.magazinesService.delete(id);
  }
}
