import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ReqUpdateNoticeDto {
  @ApiProperty({ 
    example: '수정된 공지사항 제목', 
    required: false,
    description: '공지사항 제목 (선택사항)',
    minLength: 1,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ 
    example: '수정된 공지사항 내용입니다.', 
    required: false,
    description: '공지사항 내용 (선택사항)',
    minLength: 1
  })
  @IsString()
  @IsOptional()
  content?: string;
}
