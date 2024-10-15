import { ApiProperty } from '@nestjs/swagger';
import { mockResFindAllHouse } from 'src/_mock/dtos/houses/res.find-all-house.dto';

export class ResFindAllHouseDto {
  @ApiProperty({ example: mockResFindAllHouse.id })
  id: number;
  @ApiProperty({ example: mockResFindAllHouse.image })
  image: string;
  @ApiProperty({ example: mockResFindAllHouse.title })
  title: string;
  @ApiProperty({ example: mockResFindAllHouse.date })
  date: string;
  @ApiProperty({ example: mockResFindAllHouse.price })
  price: string;
}
