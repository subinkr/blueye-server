import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';

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
