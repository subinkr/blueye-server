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
  ParseIntPipe,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { ReqCreateNoticeDto } from './dtos/req.create-notice.dto';
import { ReqUpdateNoticeDto } from './dtos/req.update-notice.dto';
import { ReqFindAllNoticeDto } from './dtos/req.find-all-notice.dto';
import { ResCreateNoticeDto } from './dtos/res.create-notice.dto';
import { ResFindAllNoticeDto } from './dtos/res.find-all-notice.dto';
import { ResFindOneNoticeDto } from './dtos/res.find-one-notice.dto';
import { ResUpdateNoticeDto } from './dtos/res.update-notice.dto';
import { ResRemoveNoticeDto } from './dtos/res.remove-notice.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('공지사항')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '공지사항 등록',
    description: '새로운 공지사항을 등록합니다. 관리자만 접근 가능하며, 제목과 내용은 필수입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '공지사항 등록 성공',
    type: ResCreateNoticeDto,
    schema: {
      example: {
        id: 1
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 - 필수 필드 누락',
    schema: {
      example: {
        statusCode: 400,
        message: '입력하지 않은 내용이 있습니다.'
      }
    }
  })
  create(
    @Body() reqCreateNoticeDto: ReqCreateNoticeDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateNoticeDto> {
    return this.noticesService.create(reqCreateNoticeDto, loginUserId);
  }

  @Get()
  @ApiOperation({
    summary: '공지사항 목록 조회',
    description: '공지사항 목록을 조회합니다. 고정된 공지사항이 먼저 표시되며, 활성화된 공지사항만 조회할 수 있습니다.',
  })
  @ApiQuery({
    name: 'is_active',
    required: false,
    type: Boolean,
    description: '활성화 상태 필터 (true: 활성화된 공지사항만, false: 비활성화된 공지사항만)',
    example: true
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 1)',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '페이지당 항목 수 (기본값: 10)',
    example: 10
  })
  @ApiResponse({
    status: 200,
    description: '공지사항 목록 조회 성공',
    type: [ResFindAllNoticeDto],
    schema: {
      example: [
        {
          id: 1,
          title: '중요 공지사항',
          content: '이것은 중요한 공지사항입니다.',
          writer: 1,
          is_pinned: true,
          is_active: true,
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z'
        }
      ]
    }
  })
  findAll(@Query() reqFindAllNoticeDto: ReqFindAllNoticeDto): Promise<ResFindAllNoticeDto[]> {
    return this.noticesService.findAll(reqFindAllNoticeDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: '공지사항 상세 조회',
    description: '특정 공지사항의 상세 정보를 조회합니다. 비활성화된 공지사항은 조회할 수 없습니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '공지사항 ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: '공지사항 상세 조회 성공',
    type: ResFindOneNoticeDto,
    schema: {
      example: {
        id: 1,
        title: '중요 공지사항',
        content: '이것은 중요한 공지사항입니다. 상세한 내용이 여기에 표시됩니다.',
        writer: 1,
        is_pinned: true,
        is_active: true,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '공지사항을 찾을 수 없음',
    schema: {
      example: {
        statusCode: 404,
        message: '공지사항을 찾을 수 없습니다.'
      }
    }
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResFindOneNoticeDto> {
    return this.noticesService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '공지사항 수정',
    description: '공지사항을 수정합니다. 작성자만 수정할 수 있으며, 모든 필드는 선택사항입니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '공지사항 ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: '공지사항 수정 성공',
    type: ResUpdateNoticeDto,
    schema: {
      example: {
        id: 1
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: '수정 권한 없음',
    schema: {
      example: {
        statusCode: 403,
        message: '수정 권한이 없습니다.'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '공지사항을 찾을 수 없음',
    schema: {
      example: {
        statusCode: 404,
        message: '공지사항을 찾을 수 없습니다.'
      }
    }
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqUpdateNoticeDto: ReqUpdateNoticeDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateNoticeDto> {
    return this.noticesService.update(id, reqUpdateNoticeDto, loginUserId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '공지사항 삭제',
    description: '공지사항을 삭제합니다. 작성자만 삭제할 수 있으며, 삭제된 공지사항은 복구할 수 없습니다.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '공지사항 ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: '공지사항 삭제 성공',
    type: ResRemoveNoticeDto,
    schema: {
      example: {
        id: 1
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: '삭제 권한 없음',
    schema: {
      example: {
        statusCode: 403,
        message: '삭제 권한이 없습니다.'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '공지사항을 찾을 수 없음',
    schema: {
      example: {
        statusCode: 404,
        message: '공지사항을 찾을 수 없습니다.'
      }
    }
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveNoticeDto> {
    return this.noticesService.remove(id, loginUserId);
  }
}
