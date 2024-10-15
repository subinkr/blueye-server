import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { providers } from 'src/_mock/providers';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { mockReqCreateUser } from 'src/_mock/dtos/users/req.create-user.dto';
import { mockReqLoginUser } from 'src/_mock/dtos/users/req.login-user.dto';
import { AuthService } from 'src/_common/auth/auth.service';
import { ReqUpdateUserDto } from './dtos/req.update-user.dto';
import { mockResUpdateUser } from 'src/_mock/dtos/users/res.update-user.dto';
import { MockUser } from 'src/_mock/entities/user.entity';
import { mockReqDeleteUser } from 'src/_mock/dtos/users/req.delete-user.dto';
import { mockResLoginUser } from 'src/_mock/dtos/users/res.login-user.dto';
import { mockResCreateUser } from 'src/_mock/dtos/users/res.create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let authService: AuthService;
  const { defaultUser, otherUser, notExistUser } = MockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Find one', () => {
    it('RUN | findOne', async () => {
      const result = await service.findOne(defaultUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(defaultUser);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | cannot find user', async () => {
      const result = service.findOne(notExistUser.id);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Create', () => {
    it('RUN | create', async () => {
      const result = await service.create(mockReqCreateUser, defaultUser.id);
      const keys = Object.keys(result);
      const required = Object.keys(mockResCreateUser);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | wrong repeat password', async () => {
      const result = service.create(
        {
          ...mockReqCreateUser,
          password: 'p@ssw0rd',
          repeatPassword: 'password',
        },
        notExistUser.id,
      );
      await expect(result).rejects.toThrow(ForbiddenException);
    });

    it('ERR | id or username already exist', async () => {
      const existUserIdResult = service.create(
        {
          ...mockReqCreateUser,
          id: 0,
        },
        defaultUser.id,
      );
      await expect(existUserIdResult).rejects.toThrow(ConflictException);

      const existUsernameResult = service.create(
        {
          ...mockReqCreateUser,
          id: null,
          username: 'username',
        },
        defaultUser.id,
      );
      await expect(existUsernameResult).rejects.toThrow(ConflictException);
    });

    it('ERR | wrong repeat password', async () => {
      const result = service.create(
        {
          ...mockReqCreateUser,
          password: 'p@ssw0rd',
          repeatPassword: 'password',
        },
        defaultUser.id,
      );
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('Login', () => {
    it('RUN | login', async () => {
      const result = await service.login(mockReqLoginUser);
      const keys = Object.keys(result);
      const required = Object.keys(mockResLoginUser);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('ERR | cannot find username', async () => {
      const result = service.login({
        ...mockReqCreateUser,
        username: 'notUsername',
      });
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Update', () => {
    it('RUN | update username', async () => {
      const mockReqUpdateUsername: ReqUpdateUserDto = {
        newUsername: 'newUsername',
        newPassword: null,
        repeatPassword: null,
      };
      const result = await service.update(
        defaultUser.id,
        mockReqUpdateUsername,
      );
      const keys = Object.keys(result);
      const required = Object.keys(mockResUpdateUser);
      expect(keys).toEqual(expect.arrayContaining(required));
    });

    it('USE | hashPassword', async () => {
      const mockReqUpdatePassword: ReqUpdateUserDto = {
        newUsername: null,
        newPassword: 'newP@ssw0rd',
        repeatPassword: 'newP@ssw0rd',
      };
      authService.hashPassword = jest
        .fn()
        .mockReturnValue(defaultUser.password);
      await service.update(defaultUser.id, mockReqUpdatePassword);
      expect(authService.hashPassword).toHaveBeenCalled();
    });

    it('ERR | already exist username', async () => {
      const mockReqUpdateExistUsername: ReqUpdateUserDto = {
        newUsername: 'username',
        newPassword: null,
        repeatPassword: null,
      };
      const result = service.update(defaultUser.id, mockReqUpdateExistUsername);
      await expect(result).rejects.toThrow(ConflictException);
    });

    it('ERR | wrong repeat password', async () => {
      const mockReqUpdateWrongPassword: ReqUpdateUserDto = {
        newUsername: null,
        newPassword: 'newP@ssw0rd',
        repeatPassword: 'newPassword',
      };
      const result = service.update(defaultUser.id, mockReqUpdateWrongPassword);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('Remove', () => {
    it('USE | findOne', async () => {
      service.findOne = jest.fn();
      await service.remove({ id: null }, otherUser.id);
      expect(service.findOne).toHaveBeenCalled();
    });

    it('RUN | delete other user', async () => {
      service.findOne = jest.fn();
      await service.remove(mockReqDeleteUser, defaultUser.id);
      expect(service.findOne).toHaveBeenCalled();
    });
  });
});
