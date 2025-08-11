import { ApiProperty } from '@nestjs/swagger';

export class ResFindOneNoticeDto {
  @ApiProperty({ 
    example: 1,
    description: '공지사항 고유 ID'
  })
  id: number;

  @ApiProperty({ 
    example: '중요 공지사항 제목',
    description: '공지사항 제목'
  })
  title: string;

  @ApiProperty({ 
    example: '공지사항 내용입니다.',
    description: '공지사항 내용'
  })
  content: string;

  @ApiProperty({ 
    example: 1,
    description: '작성자 ID'
  })
  writer: number;

  @ApiProperty({ 
    example: '2024-01-01T00:00:00.000Z',
    description: '생성일시'
  })
  created_at: Date;

  @ApiProperty({ 
    example: '2024-01-01T00:00:00.000Z',
    description: '수정일시'
  })
  updated_at: Date;
}
