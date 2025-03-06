import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateTrackDto {
  @ApiProperty({ description: '부동산 이름' })
  property: string;

  @ApiProperty({ description: '부동산 주소' })
  address: string;
}
