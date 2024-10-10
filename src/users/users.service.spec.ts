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

describe('UsersService', () => {
  let service: UsersService;
  let authService: AuthService;
  const { defaultUser, notExistUser } = MockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Find one', () => {
    it('RUN | findOne', async () => {
      await service.findOne(defaultUser.id);
    });

    it('ERR | cannot find user', async () => {
      const result = service.findOne(notExistUser.id);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Create', () => {
    it('RUN | create', async () => {
      await service.create(mockReqCreateUser, defaultUser.id);
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
      await service.login(mockReqLoginUser);
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
      await service.update(defaultUser.id, mockReqUpdateUsername);
    });

    it('RUN | update password', async () => {
      const mockReqUpdatePassword: ReqUpdateUserDto = {
        newUsername: null,
        newPassword: 'newP@ssw0rd',
        repeatPassword: 'newP@ssw0rd',
      };
      authService.hashPassword = jest.fn().mockReturnValue(mockResUpdateUser);
      await service.update(defaultUser.id, mockReqUpdatePassword);
      expect(authService.hashPassword).toHaveBeenCalled();
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
    it('RUN | remove', async () => {
      service.findOne = jest.fn();
      await service.remove(defaultUser.id);
      expect(service.findOne).toHaveBeenCalled();
    });
  });
});
