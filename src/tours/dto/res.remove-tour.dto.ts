import { ApiProperty } from '@nestjs/swagger';
import { mockResRemoveTour } from 'src/_mock/dtos/tours/res.remove-tour.dto';

export class ResRemoveTourDto {
  @ApiProperty({ example: mockResRemoveTour.message })
  message: string;
}
