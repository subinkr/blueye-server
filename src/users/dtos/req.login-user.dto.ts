import { ApiProperty } from '@nestjs/swagger';
import { mockReqLoginUser } from 'src/_mock/dtos/users/req.login-user.dto';

export class ReqLoginUserDto {
  @ApiProperty({ example: mockReqLoginUser.username })
  username: string;
  @ApiProperty({ example: mockReqLoginUser.password })
  password: string;
}
