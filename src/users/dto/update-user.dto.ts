import { ApiProperty } from '@nestjs/swagger';
import { MockUser } from '../../_mock/entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({ example: MockUser.updateUser.newUsername })
  newUsername: string;
  @ApiProperty({ example: MockUser.updateUser.newPassword })
  newPassword: string;
  @ApiProperty({ example: MockUser.updateUser.repeatPassword })
  repeatPassword: string;
}
