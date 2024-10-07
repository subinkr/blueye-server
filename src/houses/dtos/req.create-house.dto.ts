import { ApiProperty } from '@nestjs/swagger';
import { mockReqCreateHouse } from 'src/_mock/dtos/houses/req.create-house.dto';

export class ReqCreateHouseDto {
  @ApiProperty({ example: mockReqCreateHouse.city })
  city: string;

  @ApiProperty({ example: mockReqCreateHouse.title })
  title: string;
  @ApiProperty({ example: mockReqCreateHouse.descriptions })
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: mockReqCreateHouse.builder })
  builder: string; // @html marked()
  @ApiProperty({ example: mockReqCreateHouse.builderDetail })
  builderDetail: string;

  @ApiProperty({ example: mockReqCreateHouse.price })
  price: string;

  @ApiProperty({ example: mockReqCreateHouse.location })
  location: string;
  @ApiProperty({ example: mockReqCreateHouse.googleMap })
  googleMap: string; // @html marked()

  @ApiProperty({ example: mockReqCreateHouse.pricePerSquareMeter })
  pricePerSquareMeter: string; // @html marked()
  @ApiProperty({ example: mockReqCreateHouse.salesType })
  salesType: string; // @html marked()
  @ApiProperty({ example: mockReqCreateHouse.squareMeter })
  squareMeter: string; // @html marked()

  @ApiProperty({ example: mockReqCreateHouse.config })
  config: string; // @html marked()

  @ApiProperty({ example: mockReqCreateHouse.date })
  date: string; // @html marked()

  @ApiProperty({ example: mockReqCreateHouse.houseHolders })
  houseHolders: string; // @html marked()
  @ApiProperty({ example: mockReqCreateHouse.own })
  own: string; // @html marked()

  @ApiProperty({ example: mockReqCreateHouse.expectedReturn })
  expectedReturn: string; // @html marked()
  @ApiProperty({ example: mockReqCreateHouse.tax })
  tax: string; // @html marked()

  @ApiProperty({ example: mockReqCreateHouse.images })
  images: string; // split('\n')
}
