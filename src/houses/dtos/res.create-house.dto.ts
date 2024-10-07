import { ApiProperty } from '@nestjs/swagger';
import { mockResCreateHouse } from 'src/_mock/dtos/houses/res.create-house.dto';

export class ResCreateHouseDto {
  @ApiProperty({ example: mockResCreateHouse.id })
  id: number;
}
