import { User } from 'src/_core/entities/user.entity';

export class MockUser {
  static defaultUser: User = {
    id: 0,
    username: 'username',
    password: '$2b$10$Owm1poGOOcpAZdRb24dG3.rUKoavmZdfHQI9frukIPJfgA40dekES',
  };

  static notExistUser: User = {
    id: 9876,
    username: 'notExistUsername',
    password: '$2b$10$Owm1poGOOcpAZdRb24dG3.rUKoavmZdfHQI9frukIPJfgA40dekES',
  };

  static accessToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAzNDA5OTA0LCJleHAiOjFlKzUwfQ.BBf7DDbpw-mopP6iPvu8pxc7PoTjCbt5p7h3RPWT_Cw';

  static userList: User[] = [this.defaultUser];

  findOne({ where: { id, username } }) {
    const [user] =
      id !== undefined && id !== null
        ? MockUser.userList.filter((user) => user.id === id)
        : MockUser.userList.filter((user) => user.username === username);

    if (!user) return null;

    return user;
  }

  exists({ where: { id, username } }) {
    const [user] =
      id !== undefined && id !== null
        ? MockUser.userList.filter((user) => user.id === id)
        : MockUser.userList.filter((user) => user.username === username);

    if (user) return true;

    return false;
  }

  create() {
    return MockUser.defaultUser;
  }

  save() {
    MockUser.userList.push(MockUser.defaultUser);

    return MockUser.defaultUser;
  }

  update() {}

  delete() {
    return true;
  }
}
