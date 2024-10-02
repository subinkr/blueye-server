import { ApiProperty } from '@nestjs/swagger';
import { mockReqUpdateUser } from 'src/_mock/dtos/users/req.update-user.dto';

export class ReqUpdateUserDto {
  @ApiProperty({ example: mockReqUpdateUser.newUsername })
  newUsername: string;
  @ApiProperty({ example: mockReqUpdateUser.newPassword })
  newPassword: string;
  @ApiProperty({ example: mockReqUpdateUser.repeatPassword })
  repeatPassword: string;
}
