import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DataController],
  providers: [DataService, AuthService, JwtService],
})
export class DataModule {}
