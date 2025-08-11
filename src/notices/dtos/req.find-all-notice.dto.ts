import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReqFindAllNoticeDto {
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
