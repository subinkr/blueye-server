import { ApiProperty } from '@nestjs/swagger';
import { mockReqUpdateTour } from 'src/_mock/dtos/tours/req.update-tour.dto';

export class ReqUpdateTourDto {
  @ApiProperty({ example: mockReqUpdateTour.city })
  city: string;

  @ApiProperty({ example: mockReqUpdateTour.title })
  title: string;
  @ApiProperty({ example: mockReqUpdateTour.descriptions })
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: mockReqUpdateTour.price })
  price: string;
  @ApiProperty({ example: mockReqUpdateTour.date })
  date: string; // @html marked()

  @ApiProperty({ example: mockReqUpdateTour.mainImage })
  mainImage: string;
  @ApiProperty({ example: mockReqUpdateTour.images })
  images: string; // split('\n')
}
