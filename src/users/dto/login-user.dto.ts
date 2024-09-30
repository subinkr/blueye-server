import { ApiProperty } from '@nestjs/swagger';
import { MockUser } from 'src/source-code/mock/entities/user.entity.mock';

export class LoginUserDto {
  @ApiProperty({ example: MockUser.loginUser.username })
  username: string;
  @ApiProperty({ example: MockUser.loginUser.password })
  password: string;
}
