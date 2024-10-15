import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';
import { providers } from 'src/_mock/providers';
import { mockReqCreateHouse } from 'src/_mock/dtos/houses/req.create-house.dto';
import { MockUser } from 'src/_mock/entities/user.entity';
import { MockHouse } from 'src/_mock/entities/house.entity';
import { mockResCreateHouse } from 'src/_mock/dtos/houses/res.create-house.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { mockReqFindAllHouse } from 'src/_mock/dtos/houses/req.find-all-house.dto';
import { mockResFindAllHouse } from 'src/_mock/dtos/houses/res.find-all-house.dto';
import { mockReqUpdateHouse } from 'src/_mock/dtos/houses/req.update-house.dto';
import { mockResUpdateHouse } from 'src/_mock/dtos/houses/res.update-house.dto';
import { mockResRemoveHouse } from 'src/_mock/dtos/houses/res.remove-house.dto';

describe('HousesService', () => {
  let service: HousesService;
  const { houseUser, otherUser } = MockUser;
  const { defaultHouse } = MockHouse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<HousesService>(HousesService);
  });

  describe('Create', () => {
    it('RUN | create', async () => {
      const result = await service.create(mockReqCreateHouse, houseUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(mockResCreateHouse);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | not enough content', async () => {
      const mockReqBadContent = { ...mockReqCreateHouse, title: null };
      const result = service.create(mockReqBadContent, houseUser.id);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('Find all', () => {
    it('RUN | FindAll', async () => {
      const result = await service.findAll(mockReqFindAllHouse);
      const keys = Object.keys(result[0]);
      const required = Object.keys(mockResFindAllHouse);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  describe('Find one', () => {
    it('RUN | FindOne', async () => {
      const result = await service.findOne(defaultHouse.id);
      const keys = Object.keys(result);
      const required = Object.keys(defaultHouse);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  describe('Update', () => {
    it('RUN | Update', async () => {
      const result = await service.update(
        defaultHouse.id,
        mockReqUpdateHouse,
        houseUser.id,
      );
      const keys = Object.keys(result);
      const required = Object.keys(mockResUpdateHouse);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | no permission', async () => {
      const result = service.update(
        defaultHouse.id,
        mockReqUpdateHouse,
        otherUser.id,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Remove', () => {
    it('RUN | Remove', async () => {
      const result = await service.remove(defaultHouse.id, houseUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(mockResRemoveHouse);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | no permission', async () => {
      const result = service.remove(defaultHouse.id, otherUser.id);
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
