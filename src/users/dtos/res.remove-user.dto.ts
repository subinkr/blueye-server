import { ApiProperty } from '@nestjs/swagger';
import { mockResRemoveUser } from 'src/_mock/dtos/users/res.remove-user.dto';

export class ResRemoveUserDto {
  @ApiProperty({ example: mockResRemoveUser.message })
  message: string;
}
