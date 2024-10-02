import { ReqCreateUserDto } from 'src/users/dtos/req.create-user.dto';

export const mockReqCreateUser: ReqCreateUserDto = {
  id: 1,
  username: 'newUsername',
  password: 'p@ssw0rd',
  repeatPassword: 'p@ssw0rd',
};
