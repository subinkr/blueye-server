import { User } from '../../_core/entities/user.entity';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { LoginUserDto } from '../../users/dto/login-user.dto';

export const defaultUser: User = {
  id: 1,
  username: 'username',
  password: 'p@ssw0rd',
};

export class MockUser {
  static user: User = {
    ...defaultUser,
  };

  static createUser: CreateUserDto = {
    ...defaultUser,
    repeatPassword: defaultUser.password,
  };

  static updateUser: UpdateUserDto = {
    newUsername: 'newUsername',
    newPassword: 'newP@ssw0rd',
    repeatPassword: 'newP@ssw0rd',
  };

  static loginUser: LoginUserDto = {
    username: 'username',
    password: 'p@ssw0rd',
  };
}
