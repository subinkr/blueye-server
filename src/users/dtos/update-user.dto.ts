import { ApiProperty } from '@nestjs/swagger';
import { mockUpdateUser } from 'src/_mock/dtos/users/update-user.dto';

export class UpdateUserDto {
  @ApiProperty({ example: mockUpdateUser.newUsername })
  newUsername: string;
  @ApiProperty({ example: mockUpdateUser.newPassword })
  newPassword: string;
  @ApiProperty({ example: mockUpdateUser.repeatPassword })
  repeatPassword: string;
}
