import { ApiProperty } from '@nestjs/swagger';
import { MockUser } from '../../_mock/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: MockUser.createUser.id })
  id: number;
  @ApiProperty({ example: MockUser.createUser.username })
  username: string;
  @ApiProperty({ example: MockUser.createUser.password })
  password: string;
  @ApiProperty({ example: MockUser.createUser.repeatPassword })
  repeatPassword: string;
}
