import { Entity, Column, ManyToMany, CreateDateColumn, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Track } from './track.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Track, track => track.logs)
  @JoinTable()
  tracks: Track[];

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
