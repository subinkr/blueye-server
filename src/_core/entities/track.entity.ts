import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, PrimaryColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity()
export class Track {
  @PrimaryColumn()
  id: string;

  @Column()
  property: string;

  @Column()
  address: string;

  @Column({ default: false })
  deleted: boolean;

  @ManyToMany(() => Log, log => log.tracks)
  logs: Log[];
}
