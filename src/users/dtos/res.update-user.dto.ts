import { ApiProperty } from '@nestjs/swagger';
import { mockResUpdateUser } from 'src/_mock/dtos/users/res.update-user.dto';

export class ResUpdateUserDto {
  @ApiProperty({ example: mockResUpdateUser.message })
  message: string;
}
