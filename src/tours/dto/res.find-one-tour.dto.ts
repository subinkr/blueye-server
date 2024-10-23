import { ApiProperty } from '@nestjs/swagger';
import { Tour } from 'src/_core/entities/tour.entity';
import { mockResFindOneTour } from 'src/_mock/dtos/tours/res.find-one-tour.dto';

export class ResFindOneTourDto {
  @ApiProperty({ example: mockResFindOneTour.tour })
  tour: Tour;

  @ApiProperty({ example: mockResFindOneTour.loginUserId })
  loginUserId: number;
}
