import { ApiProperty } from '@nestjs/swagger';
import { MockUser } from '../../_mock/entities/user.entity';

export class LoginUserDto {
  @ApiProperty({ example: MockUser.loginUser.username })
  username: string;
  @ApiProperty({ example: MockUser.loginUser.password })
  password: string;
}
