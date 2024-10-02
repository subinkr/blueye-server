import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { User } from 'src/_core/entities/user.entity';
import { HousesService } from 'src/houses/houses.service';
import { UsersService } from 'src/users/users.service';
import { MockUser } from './entities/user.entity';

export const providers = [
  JwtService,
  AuthService,
  UsersService,
  HousesService,
  {
    provide: getRepositoryToken(User),
    useClass: MockUser,
  },
];
