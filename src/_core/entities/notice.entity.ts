import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Notice {
  @ApiProperty({ 
    example: 1,
    description: '공지사항 고유 ID (자동 생성)'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    example: '중요 공지사항 제목',
    description: '공지사항 제목 (필수)',
    minLength: 1,
    maxLength: 200
  })
  @Column()
  title: string;

  @ApiProperty({ 
    example: '공지사항 내용입니다.',
    description: '공지사항 내용 (필수)',
    minLength: 1
  })
  @Column('text')
  content: string;

  @ApiProperty({ 
    example: 1,
    description: '작성자 ID (자동 설정)'
  })
  @Column()
  writer: number; // 작성자 ID

  @ApiProperty({ 
    example: true,
    description: '상단 고정 여부 (기본값: false)'
  })
  @Column({ default: true })
  is_pinned: boolean; // 상단 고정 여부

  @ApiProperty({ 
    example: true,
    description: '게시 활성화 여부 (기본값: true)'
  })
  @Column({ default: true })
  is_active: boolean; // 활성화 여부

  @ApiProperty({ 
    example: '2024-01-01T00:00:00.000Z',
    description: '생성일시 (자동 생성)'
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ 
    example: '2024-01-01T00:00:00.000Z',
    description: '수정일시 (자동 업데이트)'
  })
  @UpdateDateColumn()
  updated_at: Date;
}
