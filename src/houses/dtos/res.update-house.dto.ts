import { ApiProperty } from '@nestjs/swagger';
import { mockResUpdateHouse } from 'src/_mock/dtos/houses/res.update-house.dto';

export class ResUpdateHouseDto {
  @ApiProperty({ example: mockResUpdateHouse.message })
  message: string;
}
