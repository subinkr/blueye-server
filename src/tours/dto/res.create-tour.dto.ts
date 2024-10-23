import { ApiProperty } from '@nestjs/swagger';
import { mockResCreateTour } from 'src/_mock/dtos/tours/res.create-tour.dto';
export class ResCreateTourDto {
  @ApiProperty({ example: mockResCreateTour.id })
  id: number;
}
