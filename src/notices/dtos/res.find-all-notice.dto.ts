import { ApiProperty } from '@nestjs/swagger';

export class ResFindAllNoticeDto {
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
    example: true,
    description: '상단 고정 여부'
  })
  is_pinned: boolean;

  @ApiProperty({ 
    example: true,
    description: '게시 활성화 여부'
  })
  is_active: boolean;

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
