import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Body, ParseIntPipe, Delete, HttpCode } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Report } from '../_core/entities/report.entity';
import { NotFoundException } from '@nestjs/common';

@ApiTags('보고서')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ 
    summary: '보고서 업로드', 
    description: 'PDF 형식의 보고서를 업로드합니다. 파일과 제목이 필요합니다.' 
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'title'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF 파일 (10MB 이하)',
        },
        title: {
          type: 'string',
          description: '보고서 제목',
          example: '2023년 연간 보고서',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '보고서 업로드 성공',
    type: Report,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (파일 누락, 잘못된 형식 등)',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadReport(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ) {
    return await this.reportsService.create(file, title);
  }

  @Get()
  @ApiOperation({ 
    summary: '보고서 목록 조회', 
    description: '업로드된 모든 보고서의 목록을 최신순으로 조회합니다.' 
  })
  @ApiResponse({
    status: 200,
    description: '보고서 목록 조회 성공',
    type: [Report],
  })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '보고서 상세 조회', 
    description: '특정 보고서의 상세 정보를 조회합니다.' 
  })
  @ApiParam({
    name: 'id',
    description: '보고서 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '보고서 상세 조회 성공',
    type: Report,
  })
  @ApiResponse({
    status: 404,
    description: '보고서를 찾을 수 없음',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const report = await this.reportsService.findOne(id);
    if (!report) {
      throw new NotFoundException('보고서를 찾을 수 없습니다.');
    }
    return report;
  }

  @Get(':id/download')
  @ApiOperation({ 
    summary: '보고서 다운로드 URL 조회', 
    description: '보고서 파일을 다운로드할 수 있는 서명된 URL을 반환합니다.' 
  })
  @ApiParam({
    name: 'id',
    description: '보고서 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '다운로드 URL 생성 성공',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: '서명된 다운로드 URL (1시간 유효)',
          example: 'https://bucket.s3.region.amazonaws.com/reports/file.pdf?signature=...',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '보고서를 찾을 수 없음',
  })
  async downloadReport(@Param('id', ParseIntPipe) id: number) {
    const url = await this.reportsService.getFile(id);
    if (!url) {
      throw new NotFoundException('보고서를 찾을 수 없습니다.');
    }
    return { url };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ 
    summary: '보고서 삭제', 
    description: '보고서와 관련된 모든 파일(PDF, 썸네일)을 삭제합니다.' 
  })
  @ApiParam({
    name: 'id',
    description: '보고서 ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '보고서 삭제 성공',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: '삭제 성공 여부',
          example: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '보고서를 찾을 수 없음',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.reportsService.remove(id);
    if (!result) {
      throw new NotFoundException('보고서를 찾을 수 없습니다.');
    }
    return { success: true };
  }
}
