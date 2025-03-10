import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Magazine {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '잡지 ID' })
  id: number;

  @Column()
  @ApiProperty({ description: '잡지 제목' })
  title: string;

  @Column()
  @ApiProperty({ description: '잡지 종류' })
  type: string;

  @Column()
  @ApiProperty({ description: '썸네일 URL' })
  thumbnailUrl: string;

  @Column()
  @ApiProperty({ description: '이동할 URL' })
  redirectUrl: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '잡지 내용 설명', required: false })
  description: string;
  
  @Column({ nullable: true })
  @ApiProperty({ description: '발행일 (YYYY-MM-DD 형식)', required: false })
  published: string;
}
