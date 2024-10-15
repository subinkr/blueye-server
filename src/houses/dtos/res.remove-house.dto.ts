import { ApiProperty } from '@nestjs/swagger';
import { mockResRemoveHouse } from 'src/_mock/dtos/houses/res.remove-house.dto';

export class ResRemoveHouseDto {
  @ApiProperty({ example: mockResRemoveHouse.message })
  message: string;
}
