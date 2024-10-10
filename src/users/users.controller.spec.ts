import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { providers } from 'src/_mock/providers';
import { UsersService } from './users.service';
import { mockReqCreateUser } from 'src/_mock/dtos/users/req.create-user.dto';
import { mockResCreateUser } from 'src/_mock/dtos/users/res.create-user.dto';
import { mockResLoginUser } from 'src/_mock/dtos/users/res.login-user.dto';
import { mockReqLoginUser } from 'src/_mock/dtos/users/req.login-user.dto';
import { mockReqUpdateUser } from 'src/_mock/dtos/users/req.update-user.dto';
import { mockResUpdateUser } from 'src/_mock/dtos/users/res.update-user.dto';
import { mockResRemoveUser } from 'src/_mock/dtos/users/res.remove-user.dto';
import { MockUser } from 'src/_mock/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const { defaultUser, notExistUser } = MockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: providers,
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('Post users register', () => {
    it('USE | service create', async () => {
      service.create = jest.fn().mockReturnValue(mockResCreateUser);
      await controller.create(mockReqCreateUser, defaultUser.id);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('Post users login', () => {
    it('USE | service login', async () => {
      service.login = jest.fn().mockReturnValue(mockResLoginUser);
      await controller.login(mockReqLoginUser);
      expect(service.login).toHaveBeenCalled();
    });
  });

  describe('Patch users :id', () => {
    it('USE | service update', async () => {
      service.update = jest.fn().mockReturnValue(mockResUpdateUser);
      await controller.update(mockReqUpdateUser, defaultUser.id);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('Delete users :id', () => {
    it('USE | service remove', async () => {
      service.remove = jest.fn().mockReturnValue(mockResRemoveUser);
      await controller.remove(defaultUser.id);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
