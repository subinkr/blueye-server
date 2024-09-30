import { ApiProperty } from '@nestjs/swagger';
import { MockUser } from 'src/source-code/mock/entities/user.entity.mock';

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
