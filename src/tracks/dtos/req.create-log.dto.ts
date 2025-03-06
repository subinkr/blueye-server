import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateLogDto {
  @ApiProperty({ description: '로그 내용' })
  content: string;

  @ApiProperty({ description: '트랙 ID', required: false })
  trackId?: string;

  @ApiProperty({ description: '부동산 이름', required: false })
  property?: string;
}
