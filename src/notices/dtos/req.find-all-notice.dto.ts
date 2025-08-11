import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReqFindAllNoticeDto {
  @ApiProperty({ 
    example: true, 
    required: false,
    description: '활성화 상태 필터 (true: 활성화된 공지사항만, false: 비활성화된 공지사항만)'
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  is_active?: boolean;

  @ApiProperty({ 
    example: 1, 
    required: false,
    description: '페이지 번호 (기본값: 1)',
    minimum: 1
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiProperty({ 
    example: 10, 
    required: false,
    description: '페이지당 항목 수 (기본값: 10, 최대: 100)',
    minimum: 1,
    maximum: 100
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;
}
