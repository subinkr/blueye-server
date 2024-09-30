import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signToken(id: number): Promise<string> {
    const accessToken = this.jwtService.sign(
      { id },
      {
        secret: process.env.JWT_SECRET || 'test',
        expiresIn: parseInt(process.env.JWT_EXPIRE) || 1234,
      },
    );
    return accessToken;
  }

  verifyToken(accessToken: string): { id: boolean } {
    const token = accessToken.split(' ')[1];
    const result = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET || 'test',
    });

    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_SALT) || 10,
    );
    return hashedPassword;
  }

  async verifyPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, userPassword);
    if (!result) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }
    return result;
  }
}
