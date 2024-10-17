import { ApiProperty } from '@nestjs/swagger';
import { House } from 'src/_core/entities/house.entity';
import { mockResUpdateHouse } from 'src/_mock/dtos/houses/res.update-house.dto';

export class ResFindOneHouseDto {
  @ApiProperty({ example: mockResUpdateHouse.id })
  house: House;

  @ApiProperty({ example: mockResUpdateHouse.message })
  loginUserId: number;
}
