import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { DataService } from './data.service';
import { ApiBody, ApiConsumes, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('파일')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('image')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('지원하지 않는 파일 형식입니다.'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지 파일을 업로드하고 URL을 반환합니다. (최대 10MB)',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '이미지 파일 (jpg, jpeg, png, gif, webp, 최대 10MB)',
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
  @ApiResponse({
    status: 413,
    description: '파일 크기 초과 (10MB)',
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.dataService.uploadImage(file);
  }
}
