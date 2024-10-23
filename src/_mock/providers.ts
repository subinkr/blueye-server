import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { User } from 'src/_core/entities/user.entity';
import { HousesService } from 'src/houses/houses.service';
import { UsersService } from 'src/users/users.service';
import { MockUser } from './entities/user.entity';
import { DataService } from 'src/_common/data/data.service';
import { House } from 'src/_core/entities/house.entity';
import { MockHouse } from './entities/house.entity';
import { ToursService } from 'src/tours/tours.service';
import { Tour } from 'src/_core/entities/tour.entity';
import { MockTour } from './entities/tour.entity';

export const providers = [
  JwtService,
  AuthService,
  DataService,
  UsersService,
  HousesService,
  ToursService,
  {
    provide: getRepositoryToken(User),
    useClass: MockUser,
  },
  {
    provide: getRepositoryToken(House),
    useClass: MockHouse,
  },
  {
    provide: getRepositoryToken(Tour),
    useClass: MockTour,
  },
];
