import { MockTour } from 'src/_mock/entities/tour.entity';
import { ResFindOneTourDto } from 'src/tours/dto/res.find-one-tour.dto';

export const mockResFindOneTour: ResFindOneTourDto = {
  tour: MockTour.defaultTour,
  loginUserId: 0,
};
