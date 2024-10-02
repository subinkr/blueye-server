import { ApiProperty } from '@nestjs/swagger';
import { MockHouse } from 'src/_mock/entities/house.entity';

export class ReqCreateHouseDto {
  @ApiProperty({ example: MockHouse.house.id })
  id: number;

  @ApiProperty({ example: MockHouse.house.city })
  city: string;

  @ApiProperty({ example: MockHouse.house.title })
  title: string;
  @ApiProperty({ example: MockHouse.house.writer })
  writer: number;
  @ApiProperty({ example: MockHouse.house.descriptions })
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: MockHouse.house.builder })
  builder: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.builderDetail })
  builderDetail: string;

  @ApiProperty({ example: MockHouse.house.price })
  price: string;

  @ApiProperty({ example: MockHouse.house.location })
  location: string;
  @ApiProperty({ example: MockHouse.house.googleMap })
  googleMap: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.pricePerSquareMeter })
  pricePerSquareMeter: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.salesType })
  salesType: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.squareMeter })
  squareMeter: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.config })
  config: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.date })
  date: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.houseHolders })
  houseHolders: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.own })
  own: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.expectedReturn })
  expectedReturn: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.tax })
  tax: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.images })
  images: string; // split('\n')
}
