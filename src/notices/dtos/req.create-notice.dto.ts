import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class ReqCreateNoticeDto {
  @ApiProperty({ 
    example: '중요 공지사항 제목',
    description: '공지사항 제목 (필수)',
    minLength: 1,
    maxLength: 200
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: '공지사항 내용입니다.',
    description: '공지사항 내용 (필수)',
    minLength: 1
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ 
    example: true, 
    required: false,
    description: '상단 고정 여부 (기본값: false)'
  })
  @IsBoolean()
  @IsOptional()
  is_pinned?: boolean = false;

  @ApiProperty({ 
    example: true, 
    required: false,
    description: '게시 활성화 여부 (기본값: true)'
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;
}
