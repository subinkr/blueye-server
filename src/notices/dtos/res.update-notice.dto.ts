import { ApiProperty } from '@nestjs/swagger';

export class ResUpdateNoticeDto {
  @ApiProperty({ example: 1 })
  id: number;
}
