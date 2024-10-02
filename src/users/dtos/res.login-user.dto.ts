import { ApiProperty } from '@nestjs/swagger';
import { mockResLoginUser } from 'src/_mock/dtos/users/res.login-user.dto';

export class ResLoginUserDto {
  @ApiProperty({ example: mockResLoginUser.id })
  id: number;
  @ApiProperty({ example: mockResLoginUser.accessToken })
  accessToken: string;
}
