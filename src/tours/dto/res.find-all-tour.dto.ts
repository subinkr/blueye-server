import { ApiProperty } from '@nestjs/swagger';
import { mockResFindAllTour } from 'src/_mock/dtos/tours/res.find-all-tour.dto';

export class ResFindAllTourDto {
  @ApiProperty({ example: mockResFindAllTour.id })
  id: number;
  @ApiProperty({ example: mockResFindAllTour.image })
  image: string;
  @ApiProperty({ example: mockResFindAllTour.title })
  title: string;
  @ApiProperty({ example: mockResFindAllTour.date })
  date: string;
  @ApiProperty({ example: mockResFindAllTour.price })
  price: string;
}
