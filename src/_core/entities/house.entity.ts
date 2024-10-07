import { ApiProperty } from '@nestjs/swagger';
import { MockHouse } from 'src/_mock/entities/house.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class House {
  @ApiProperty({ example: MockHouse.defaultHouse.id })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: MockHouse.defaultHouse.city })
  @Column()
  city: string;

  @ApiProperty({ example: MockHouse.defaultHouse.title })
  @Column()
  title: string;
  @ApiProperty({ example: MockHouse.defaultHouse.writer })
  @Column()
  writer: number;
  @ApiProperty({ example: MockHouse.defaultHouse.descriptions })
  @Column()
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: MockHouse.defaultHouse.builder })
  @Column()
  builder: string; // @html marked()
  @ApiProperty({ example: MockHouse.defaultHouse.builderDetail })
  @Column()
  builderDetail: string;

  @ApiProperty({ example: MockHouse.defaultHouse.price })
  @Column()
  price: string;

  @ApiProperty({ example: MockHouse.defaultHouse.location })
  @Column()
  location: string;
  @ApiProperty({ example: MockHouse.defaultHouse.googleMap })
  @Column()
  googleMap: string; // @html marked()

  @ApiProperty({ example: MockHouse.defaultHouse.pricePerSquareMeter })
  @Column()
  pricePerSquareMeter: string; // @html marked()
  @ApiProperty({ example: MockHouse.defaultHouse.salesType })
  @Column()
  salesType: string; // @html marked()
  @ApiProperty({ example: MockHouse.defaultHouse.squareMeter })
  @Column()
  squareMeter: string; // @html marked()

  @ApiProperty({ example: MockHouse.defaultHouse.config })
  @Column()
  config: string; // @html marked()

  @ApiProperty({ example: MockHouse.defaultHouse.date })
  @Column()
  date: string; // @html marked()

  @ApiProperty({ example: MockHouse.defaultHouse.houseHolders })
  @Column()
  houseHolders: string; // @html marked()
  @ApiProperty({ example: MockHouse.defaultHouse.own })
  @Column()
  own: string; // @html marked()

  @ApiProperty({ example: MockHouse.defaultHouse.expectedReturn })
  @Column()
  expectedReturn: string; // @html marked()
  @ApiProperty({ example: MockHouse.defaultHouse.tax })
  @Column()
  tax: string; // @html marked()

  @ApiProperty({ example: MockHouse.defaultHouse.images })
  @Column()
  images: string; // split('\n')
}
