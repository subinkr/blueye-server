import { ApiProperty } from '@nestjs/swagger';
import { mockReqFindAllHouse } from 'src/_mock/dtos/houses/req.find-all-house.dto';

export class ReqFindAllHouseDto {
  @ApiProperty({ example: mockReqFindAllHouse.city })
  city: string;
}
