import { ApiProperty } from '@nestjs/swagger';

export class ResCreateNoticeDto {
  @ApiProperty({ example: 1 })
  id: number;
}
