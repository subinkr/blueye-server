import { ApiProperty } from '@nestjs/swagger';
import { MockUser } from 'src/source-code/mock/entities/user.entity.mock';

export class UpdateUserDto {
  @ApiProperty({ example: MockUser.updateUser.newUsername })
  newUsername: string;
  @ApiProperty({ example: MockUser.updateUser.newPassword })
  newPassword: string;
  @ApiProperty({ example: MockUser.updateUser.repeatPassword })
  repeatPassword: string;
}
