import { ApiProperty } from '@nestjs/swagger';

export class ResRemoveNoticeDto {
  @ApiProperty({ example: 1 })
  id: number;
}
