import { ApiProperty } from '@nestjs/swagger';
import { mockLoginUser } from 'src/_mock/dtos/users/login-user.dto';

export class LoginUserDto {
  @ApiProperty({ example: mockLoginUser.username })
  username: string;
  @ApiProperty({ example: mockLoginUser.password })
  password: string;
}
