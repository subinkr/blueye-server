import { Test, TestingModule } from '@nestjs/testing';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { providers } from 'src/_mock/providers';
import { mockResCreateTour } from 'src/_mock/dtos/tours/res.create-tour.dto';
import { mockReqCreateTour } from 'src/_mock/dtos/tours/req.create-tour.dto';
import { MockUser } from 'src/_mock/entities/user.entity';
import { MockTour } from 'src/_mock/entities/tour.entity';
import { mockResFindAllTour } from 'src/_mock/dtos/tours/res.find-all-tour.dto';
import { mockReqFindAllTour } from 'src/_mock/dtos/tours/req.find-all-tour.dto';
import { mockResUpdateTour } from 'src/_mock/dtos/tours/res.update-tour.dto';
import { mockResRemoveTour } from 'src/_mock/dtos/tours/res.remove-tour.dto';

describe('ToursController', () => {
  let controller: ToursController;
  let service: ToursService;
  const { defaultUser } = MockUser;
  const { defaultTour } = MockTour;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToursController],
      providers: providers,
    }).compile();

    controller = module.get<ToursController>(ToursController);
    service = module.get<ToursService>(ToursService);
  });

  describe('Post tour create', () => {
    it('USE | service create', async () => {
      service.create = jest.fn().mockReturnValue(mockResCreateTour);
      await controller.create(mockReqCreateTour, defaultUser.id);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('Get tour find all', () => {
    it('USE | service findAll', async () => {
      service.findAll = jest.fn().mockReturnValue(mockResFindAllTour);
      await controller.findAll(mockReqFindAllTour);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('Get tour find one', () => {
    it('USE | service findOne', async () => {
      service.findOne = jest.fn().mockReturnValue(defaultTour);
      await controller.findOne(`${defaultTour.id}`, defaultUser.id);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('Put tour update', () => {
    it('USE | service update', async () => {
      service.update = jest.fn().mockReturnValue(mockResUpdateTour);
      await controller.update(
        `${defaultTour.id}`,
        mockReqCreateTour,
        defaultUser.id,
      );
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Delete tour remove', () => {
    it('USE | service remove', async () => {
      service.remove = jest.fn().mockReturnValue(mockResRemoveTour);
      await controller.remove(`${defaultTour.id}`, defaultUser.id);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
