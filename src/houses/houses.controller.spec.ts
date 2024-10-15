import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { providers } from 'src/_mock/providers';
import { mockResCreateHouse } from 'src/_mock/dtos/houses/res.create-house.dto';
import { mockReqCreateHouse } from 'src/_mock/dtos/houses/req.create-house.dto';
import { MockUser } from 'src/_mock/entities/user.entity';
import { mockResFindAllHouse } from 'src/_mock/dtos/houses/res.find-all-house.dto';
import { mockReqFindAllHouse } from 'src/_mock/dtos/houses/req.find-all-house.dto';
import { MockHouse } from 'src/_mock/entities/house.entity';
import { mockResUpdateHouse } from 'src/_mock/dtos/houses/res.update-house.dto';
import { mockResRemoveHouse } from 'src/_mock/dtos/houses/res.remove-house.dto';

describe('HousesController', () => {
  let controller: HousesController;
  let service: HousesService;
  const { defaultUser } = MockUser;
  const { defaultHouse } = MockHouse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: providers,
    }).compile();

    controller = module.get<HousesController>(HousesController);
    service = module.get<HousesService>(HousesService);
  });

  describe('Post house create', () => {
    it('USE | service create', async () => {
      service.create = jest.fn().mockReturnValue(mockResCreateHouse);
      await controller.create(mockReqCreateHouse, defaultUser.id);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('Get house find all', () => {
    it('USE | service findAll', async () => {
      service.findAll = jest.fn().mockReturnValue(mockResFindAllHouse);
      await controller.findAll(mockReqFindAllHouse);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('Get house find one', () => {
    it('USE | service findOne', async () => {
      service.findOne = jest.fn().mockReturnValue(defaultHouse);
      await controller.findOne(`${defaultHouse.id}`);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('Put house update', () => {
    it('USE | service update', async () => {
      service.update = jest.fn().mockReturnValue(mockResUpdateHouse);
      await controller.update(
        `${defaultHouse.id}`,
        mockReqCreateHouse,
        defaultUser.id,
      );
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Delete house remove', () => {
    it('USE | service remove', async () => {
      service.remove = jest.fn().mockReturnValue(mockResRemoveHouse);
      await controller.remove(`${defaultHouse.id}`, defaultUser.id);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
