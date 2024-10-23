import { ApiProperty } from '@nestjs/swagger';
import { mockResUpdateTour } from 'src/_mock/dtos/tours/res.update-tour.dto';

export class ResUpdateTourDto {
  @ApiProperty({ example: mockResUpdateTour.id })
  id: number;

  @ApiProperty({ example: mockResUpdateTour.message })
  message: string;
}
