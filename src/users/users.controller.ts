import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ReqCreateUserDto } from './dtos/req.create-user.dto';
import { ReqUpdateUserDto } from './dtos/req.update-user.dto';
import { ReqLoginUserDto } from './dtos/req.login-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { ResCreateUserDto } from './dtos/res.create-user.dto';
import { ResLoginUserDto } from './dtos/res.login-user.dto';
import { ResUpdateUserDto } from './dtos/res.update-user.dto';
import { ResRemoveUserDto } from './dtos/res.remove-user.dto';
import { ReqDeleteUserDto } from './dtos/req.delete-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() reqCreateUserDto: ReqCreateUserDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateUserDto> {
    return this.usersService.create(reqCreateUserDto, loginUserId);
  }

  @Post('login')
  async login(
    @Body() reqLoginUserDto: ReqLoginUserDto,
  ): Promise<ResLoginUserDto> {
    return this.usersService.login(reqLoginUserDto);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Body() reqUpdateUserDto: ReqUpdateUserDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateUserDto> {
    return this.usersService.update(loginUserId, reqUpdateUserDto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Body() reqDeleteUserDto: ReqDeleteUserDto,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveUserDto> {
    return this.usersService.remove(reqDeleteUserDto, loginUserId);
  }
}
