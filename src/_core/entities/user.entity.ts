import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MockUser } from 'src/_mock/entities/user.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: MockUser.defaultUser.id })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ example: MockUser.defaultUser.username })
  @Column()
  username: string;

  @ApiProperty({ example: MockUser.defaultUser.password })
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
