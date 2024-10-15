import { ApiProperty } from '@nestjs/swagger';
import { mockReqDeleteUser } from 'src/_mock/dtos/users/req.delete-user.dto';

export class ReqDeleteUserDto {
  @ApiProperty({ example: mockReqDeleteUser.id })
  id: number;
}
