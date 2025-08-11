import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

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

  @ApiProperty({ 
    example: true, 
    required: false,
    description: '상단 고정 여부 (선택사항)'
  })
  @IsBoolean()
  @IsOptional()
  is_pinned?: boolean;

  @ApiProperty({ 
    example: true, 
    required: false,
    description: '게시 활성화 여부 (선택사항)'
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
