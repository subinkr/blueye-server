import { Test, TestingModule } from '@nestjs/testing';
import { ToursService } from './tours.service';
import { providers } from 'src/_mock/providers';
import { MockUser } from 'src/_mock/entities/user.entity';
import { MockTour } from 'src/_mock/entities/tour.entity';
import { mockReqCreateTour } from 'src/_mock/dtos/tours/req.create-tour.dto';
import { mockResCreateTour } from 'src/_mock/dtos/tours/res.create-tour.dto';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { mockReqFindAllTour } from 'src/_mock/dtos/tours/req.find-all-tour.dto';
import { mockResFindAllTour } from 'src/_mock/dtos/tours/res.find-all-tour.dto';
import { mockResFindOneTour } from 'src/_mock/dtos/tours/res.find-one-tour.dto';
import { mockReqUpdateTour } from 'src/_mock/dtos/tours/req.update-tour.dto';
import { mockResUpdateTour } from 'src/_mock/dtos/tours/res.update-tour.dto';
import { mockResRemoveTour } from 'src/_mock/dtos/tours/res.remove-tour.dto';

describe('ToursService', () => {
  let service: ToursService;
  const { defaultUser, uploadUser, otherUser } = MockUser;
  const { defaultTour, notExistTour } = MockTour;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<ToursService>(ToursService);
  });

  describe('Create', () => {
    it('RUN | create', async () => {
      const result = await service.create(mockReqCreateTour, uploadUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(mockResCreateTour);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | not enough content', async () => {
      const mockReqBadContent = { ...mockReqCreateTour, title: null };
      const result = service.create(mockReqBadContent, uploadUser.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('Find all', () => {
    it('RUN | FindAll', async () => {
      const result = await service.findAll(mockReqFindAllTour);
      const keys = Object.keys(result[0]);
      const required = Object.keys(mockResFindAllTour);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  describe('Find one', () => {
    it('RUN | FindOne', async () => {
      const result = await service.findOne(defaultTour.id, defaultUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(mockResFindOneTour);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | not found tour', async () => {
      const result = service.findOne(notExistTour.id, defaultUser.id);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Update', () => {
    it('RUN | Update', async () => {
      const result = await service.update(
        defaultTour.id,
        mockReqUpdateTour,
        uploadUser.id,
      );
      const keys = Object.keys(result);
      const required = Object.keys(mockResUpdateTour);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | no permission', async () => {
      const result = service.update(
        defaultTour.id,
        mockReqUpdateTour,
        otherUser.id,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Remove', () => {
    it('RUN | Remove', async () => {
      const result = await service.remove(defaultTour.id, uploadUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(mockResRemoveTour);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | no permission', async () => {
      const result = service.remove(defaultTour.id, otherUser.id);
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
