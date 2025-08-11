import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
}
