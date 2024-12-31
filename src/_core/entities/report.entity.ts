import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Report {
  @ApiProperty({ description: '보고서 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '보고서 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '국가' })
  @Column()
  country: string;

  @ApiProperty({ description: '파일 이름' })
  @Column()
  fileName: string;

  @ApiProperty({ description: '썸네일 이미지 경로' })
  @Column()
  thumbnailPath: string;

  @ApiProperty({ description: 'PDF 파일 경로' })
  @Column()
  filePath: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;
}
