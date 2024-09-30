import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../_core/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/_common/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    return user;
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: number; accessToken: string }> {
    const { id, password, repeatPassword } = createUserDto;
    const userExist = await this.userRepo.exists({
      where: { id },
    });

    if (userExist) throw new ConflictException('이미 존재하는 유저입니다.');
    if (password !== repeatPassword)
      throw new BadRequestException('두 비밀번호가 다릅니다.');

    const hashedPassword = await this.authService.hashPassword(password);

    await this.userRepo.save({
      ...createUserDto,
      password: hashedPassword,
    });

    const accessToken = await this.authService.signToken(id);

    return { id, accessToken };
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');

    await this.authService.verifyPassword(password, user.password);

    const { id } = user;
    const accessToken = await this.authService.signToken(id);

    return { id, accessToken };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    const { newUsername, newPassword, repeatPassword } = updateUserDto;
    const user = await this.findOne(id);

    if (newUsername) {
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

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.userRepo.delete(id);
    return { message: '계정이 삭제되었습니다.' };
  }
}
