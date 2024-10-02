import { ApiProperty } from '@nestjs/swagger';
import { mockResCreateUser } from 'src/_mock/dtos/users/res.create-user.dto';

export class ResCreateUserDto {
  @ApiProperty({ example: mockResCreateUser.id })
  id: number;
  @ApiProperty({ example: mockResCreateUser.accessToken })
  accessToken: string;
}
