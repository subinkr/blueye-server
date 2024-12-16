import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ReqCreateUserDto } from './dtos/req.create-user.dto';
import { ReqUpdateUserDto } from './dtos/req.update-user.dto';
import { ReqLoginUserDto } from './dtos/req.login-user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/decorator/id.decorator';
import { ResCreateUserDto } from './dtos/res.create-user.dto';
import { ResLoginUserDto } from './dtos/res.login-user.dto';
import { ResUpdateUserDto } from './dtos/res.update-user.dto';
import { ResRemoveUserDto } from './dtos/res.remove-user.dto';
import { ReqDeleteUserDto } from './dtos/req.delete-user.dto';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '사용자 등록',
    description: '새로운 사용자를 등록합니다. 관리자 권한이 필요한 작업입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '사용자 등록 성공',
    type: ResCreateUserDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 403,
    description: '권한 없음 (관리자가 아님)',
  })
  async create(
    @Body() reqCreateUserDto: ReqCreateUserDto,
    @AuthId() loginUserId: number,
  ): Promise<ResCreateUserDto> {
    return this.usersService.create(reqCreateUserDto, loginUserId);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: ResLoginUserDto,
  })
  @ApiResponse({
    status: 401,
    description: '잘못된 이메일 또는 비밀번호',
  })
  async login(
    @Body() reqLoginUserDto: ReqLoginUserDto,
  ): Promise<ResLoginUserDto> {
    return this.usersService.login(reqLoginUserDto);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '사용자 정보 수정',
    description: '로그인한 사용자의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 수정 성공',
    type: ResUpdateUserDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  async update(
    @Body() reqUpdateUserDto: ReqUpdateUserDto,
    @AuthId() loginUserId: number,
  ): Promise<ResUpdateUserDto> {
    return this.usersService.update(loginUserId, reqUpdateUserDto);
  }

  @Delete()
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '회원 탈퇴',
    description: '로그인한 사용자의 계정을 삭제합니다. 비밀번호 확인이 필요합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '회원 탈퇴 성공',
    type: ResRemoveUserDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않은 사용자',
  })
  @ApiResponse({
    status: 403,
    description: '잘못된 비밀번호',
  })
  async remove(
    @Body() reqDeleteUserDto: ReqDeleteUserDto,
    @AuthId() loginUserId: number,
  ): Promise<ResRemoveUserDto> {
    return this.usersService.remove(reqDeleteUserDto, loginUserId);
  }
}
