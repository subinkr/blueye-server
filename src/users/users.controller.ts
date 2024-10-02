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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(
    @Body() reqCreateUserDto: ReqCreateUserDto,
  ): Promise<ResCreateUserDto> {
    return this.usersService.create(reqCreateUserDto);
  }

  @Post('login')
  async login(
    @Body() reqLoginUserDto: ReqLoginUserDto,
  ): Promise<ResLoginUserDto> {
    return this.usersService.login(reqLoginUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqUpdateUserDto: ReqUpdateUserDto,
    @AuthId() loginUserID: number,
  ): Promise<ResUpdateUserDto> {
    if (id !== loginUserID) throw new UnauthorizedException('권한이 없습니다.');
    return this.usersService.update(+id, reqUpdateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthId() loginUserID: number,
  ): Promise<ResRemoveUserDto> {
    if (id !== loginUserID) throw new UnauthorizedException('권한이 없습니다.');
    return this.usersService.remove(+id);
  }
}
