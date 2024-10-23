import { MockHouse } from 'src/_mock/entities/house.entity';
import { ResFindOneHouseDto } from 'src/houses/dtos/res.find-one-house.dto';

export const mockResFindOneHouse: ResFindOneHouseDto = {
  house: MockHouse.defaultHouse,
  loginUserId: 0,
};
