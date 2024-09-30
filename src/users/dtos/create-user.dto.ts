import { ApiProperty } from '@nestjs/swagger';
import { mockCreateUser } from 'src/_mock/dtos/users/create-user.dto';

export class CreateUserDto {
  @ApiProperty({ example: mockCreateUser.id })
  id: number;
  @ApiProperty({ example: mockCreateUser.username })
  username: string;
  @ApiProperty({ example: mockCreateUser.password })
  password: string;
  @ApiProperty({ example: mockCreateUser.repeatPassword })
  repeatPassword: string;
}
