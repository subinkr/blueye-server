import { ApiProperty } from '@nestjs/swagger';
import { mockReqCreateTour } from 'src/_mock/dtos/tours/req.create-tour.dto';

export class ReqCreateTourDto {
  @ApiProperty({ example: mockReqCreateTour.city })
  city: string;

  @ApiProperty({ example: mockReqCreateTour.title })
  title: string;
  @ApiProperty({ example: mockReqCreateTour.descriptions })
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: mockReqCreateTour.price })
  price: string;
  @ApiProperty({ example: mockReqCreateTour.date })
  date: string; // @html marked()

  @ApiProperty({ example: mockReqCreateTour.mainImage })
  mainImage: string;
  @ApiProperty({ example: mockReqCreateTour.images })
  images: string; // split('|')
}
