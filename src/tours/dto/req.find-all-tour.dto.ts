import { ApiProperty } from '@nestjs/swagger';
import { mockReqFindAllTour } from 'src/_mock/dtos/tours/req.find-all-tour.dto';

export class ReqFindAllTourDto {
  @ApiProperty({ example: mockReqFindAllTour.city })
  city: string;
}
