import { ApiProperty } from '@nestjs/swagger';
import { MockTour } from 'src/_mock/entities/tour.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tour {
  @ApiProperty({ example: MockTour.defaultTour.id })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: MockTour.defaultTour.city })
  @Column()
  city: string;

  @ApiProperty({ example: MockTour.defaultTour.title })
  @Column()
  title: string;
  @ApiProperty({ example: MockTour.defaultTour.writer })
  @Column()
  writer: number;
  @ApiProperty({ example: MockTour.defaultTour.descriptions })
  @Column()
  descriptions: string; // @html marked()
  @ApiProperty({ example: MockTour.defaultTour.price })
  @Column()
  price: string;

  @ApiProperty({ example: MockTour.defaultTour.date })
  @Column()
  date: string; // @html marked()

  @ApiProperty({ example: MockTour.defaultTour.images })
  @Column()
  mainImage: string;

  @ApiProperty({ example: MockTour.defaultTour.images })
  @Column()
  images: string; // split('|')
}
