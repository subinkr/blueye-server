import { ApiProperty } from '@nestjs/swagger';
import { mockReqFindAllHouse } from 'src/_mock/dtos/houses/req.find-all-house.dto';

export class ReqFindAllHouseDto {
  @ApiProperty({
    description: '도시',
    example: mockReqFindAllHouse.city,
    required: false,
    nullable: true
  })
  city: string;
}
