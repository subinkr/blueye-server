import { ApiProperty } from '@nestjs/swagger';
import { mockReqUpdateHouse } from 'src/_mock/dtos/houses/req.update-house.dto';

export class ReqUpdateHouseDto {
  @ApiProperty({ example: mockReqUpdateHouse.city })
  city: string;

  @ApiProperty({ example: mockReqUpdateHouse.title })
  title: string;
  @ApiProperty({ example: mockReqUpdateHouse.descriptions })
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: mockReqUpdateHouse.builder })
  builder: string; // @html marked()
  @ApiProperty({ example: mockReqUpdateHouse.builderDetail })
  builderDetail: string;

  @ApiProperty({ example: mockReqUpdateHouse.price })
  price: string;

  @ApiProperty({ example: mockReqUpdateHouse.location })
  location: string;
  @ApiProperty({ example: mockReqUpdateHouse.googleMap })
  googleMap: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateHouse.pricePerSquareMeter })
  pricePerSquareMeter: string; // @html marked()
  @ApiProperty({ example: mockReqUpdateHouse.salesType })
  salesType: string; // @html marked()
  @ApiProperty({ example: mockReqUpdateHouse.squareMeter })
  squareMeter: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateHouse.config })
  config: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateHouse.date })
  date: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateHouse.houseHolders })
  houseHolders: string; // @html marked()
  @ApiProperty({ example: mockReqUpdateHouse.own })
  own: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateHouse.expectedReturn })
  expectedReturn: string; // @html marked()
  @ApiProperty({ example: mockReqUpdateHouse.tax })
  tax: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateHouse.images })
  images: string; // split('\n')
}
