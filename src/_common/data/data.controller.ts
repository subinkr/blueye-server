import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { DataService } from './data.service';
import { ApiBody, ApiConsumes, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('파일')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('image')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지 파일을 업로드하고 URL을 반환합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '이미지 파일 (jpg, jpeg, png, gif)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '이미지 업로드 성공',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: '업로드된 이미지 URL',
          example: 'https://bucket.s3.region.amazonaws.com/images/example.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 파일 형식',
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.dataService.uploadImage(file);
  }
}
