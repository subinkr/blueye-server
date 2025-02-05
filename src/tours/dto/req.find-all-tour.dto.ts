import { ApiProperty } from '@nestjs/swagger';
import { mockReqFindAllTour } from 'src/_mock/dtos/tours/req.find-all-tour.dto';

export class ReqFindAllTourDto {
  @ApiProperty({
    description: '도시',
    example: mockReqFindAllTour.city,
    required: false,
    nullable: true
  })
  city?: string;
}
