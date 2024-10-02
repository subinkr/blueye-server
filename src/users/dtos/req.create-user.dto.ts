import { ApiProperty } from '@nestjs/swagger';
import { mockReqCreateUser } from 'src/_mock/dtos/users/req.create-user.dto';

export class ReqCreateUserDto {
  @ApiProperty({ example: mockReqCreateUser.id })
  id: number;
  @ApiProperty({ example: mockReqCreateUser.username })
  username: string;
  @ApiProperty({ example: mockReqCreateUser.password })
  password: string;
  @ApiProperty({ example: mockReqCreateUser.repeatPassword })
  repeatPassword: string;
}
