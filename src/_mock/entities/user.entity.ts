import { User } from 'src/_core/entities/user.entity';

export const defaultUser: User = {
  id: 1,
  username: 'username',
  password: 'p@ssw0rd',
};

export class MockUser {
  static user: User = {
    ...defaultUser,
  };
}
