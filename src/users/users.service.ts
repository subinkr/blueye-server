import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReqCreateUserDto } from './dtos/req.create-user.dto';
import { ReqUpdateUserDto } from './dtos/req.update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/_core/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqLoginUserDto } from './dtos/req.login-user.dto';
import { AuthService } from 'src/_common/auth/auth.service';
import { ResCreateUserDto } from './dtos/res.create-user.dto';
import { ResLoginUserDto } from './dtos/res.login-user.dto';
import { ResUpdateUserDto } from './dtos/res.update-user.dto';
import { ResRemoveUserDto } from './dtos/res.remove-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    return user;
  }

  async create(reqCreateUserDto: ReqCreateUserDto): Promise<ResCreateUserDto> {
    const { id, username, password, repeatPassword } = reqCreateUserDto;
    const userIdExist = await this.userRepo.exists({
      where: { id },
    });
    const usernameExist = await this.userRepo.exists({
      where: { username },
    });

    if (userIdExist || usernameExist)
      throw new ConflictException('이미 존재하는 유저입니다.');
    if (password !== repeatPassword)
      throw new BadRequestException('두 비밀번호가 다릅니다.');

    const hashedPassword = await this.authService.hashPassword(password);

    await this.userRepo.save({
      ...reqCreateUserDto,
      password: hashedPassword,
    });

    const accessToken = await this.authService.signToken(id);

    return { id, accessToken };
  }

  async login(reqLoginUserDto: ReqLoginUserDto): Promise<ResLoginUserDto> {
    const { username, password } = reqLoginUserDto;
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    await this.authService.verifyPassword(password, user.password);

    const { id } = user;
    const accessToken = await this.authService.signToken(id);

    return { id, accessToken };
  }

  async update(
    loginUserId: number,
    reqUpdateUserDto: ReqUpdateUserDto,
  ): Promise<ResUpdateUserDto> {
    const { newUsername, newPassword, repeatPassword } = reqUpdateUserDto;
    const user = await this.findOne(loginUserId);

    if (newUsername) {
      const usernameExist = await this.userRepo.exists({
        where: { username: newUsername },
      });
      if (usernameExist) {
        throw new ConflictException('이미 존재하는 유저입니다.');
      }

      await this.userRepo.save({
        ...user,
        username: newUsername,
      });

      return { message: '아이디가 수정되었습니다.' };
    }

    if (newPassword !== repeatPassword)
      throw new BadRequestException('두 비밀번호가 다릅니다.');

    const hashedPassword = await this.authService.hashPassword(newPassword);

    await this.userRepo.save({
      ...user,
      password: hashedPassword,
    });

    return { message: '비밀번호가 수정되었습니다.' };
  }

  async remove(id: number): Promise<ResRemoveUserDto> {
    await this.findOne(id);
    await this.userRepo.delete(id);
    return { message: '계정이 삭제되었습니다.' };
  }
}
