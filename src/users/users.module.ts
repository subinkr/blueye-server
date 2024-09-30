import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/_core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
})
export class UsersModule {}
