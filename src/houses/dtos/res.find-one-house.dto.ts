import { ApiProperty } from '@nestjs/swagger';
import { House } from 'src/_core/entities/house.entity';
import { mockResFindOneHouse } from 'src/_mock/dtos/houses/res.find-one-house.dto';

export class ResFindOneHouseDto {
  @ApiProperty({ example: mockResFindOneHouse.house })
  house: House;

  @ApiProperty({ example: mockResFindOneHouse.loginUserId })
  loginUserId: number;
}
