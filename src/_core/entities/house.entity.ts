import { ApiProperty } from '@nestjs/swagger';
import { MockHouse } from 'src/_mock/entities/house.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class House {
  @ApiProperty({ example: MockHouse.house.id })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: MockHouse.house.city })
  @Column()
  city: string;

  @ApiProperty({ example: MockHouse.house.title })
  @Column()
  title: string;
  @ApiProperty({ example: MockHouse.house.writer })
  @Column()
  writer: number;
  @ApiProperty({ example: MockHouse.house.descriptions })
  @Column()
  descriptions: string; // JSON.parse()

  @ApiProperty({ example: MockHouse.house.builder })
  @Column()
  builder: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.builderDetail })
  @Column()
  builderDetail: string;

  @ApiProperty({ example: MockHouse.house.price })
  @Column()
  price: string;

  @ApiProperty({ example: MockHouse.house.location })
  @Column()
  location: string;
  @ApiProperty({ example: MockHouse.house.googleMap })
  @Column()
  googleMap: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.pricePerSquareMeter })
  @Column()
  pricePerSquareMeter: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.salesType })
  @Column()
  salesType: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.squareMeter })
  @Column()
  squareMeter: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.config })
  @Column()
  config: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.date })
  @Column()
  date: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.houseHolders })
  @Column()
  houseHolders: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.own })
  @Column()
  own: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.expectedReturn })
  @Column()
  expectedReturn: string; // @html marked()
  @ApiProperty({ example: MockHouse.house.tax })
  @Column()
  tax: string; // @html marked()

  @ApiProperty({ example: MockHouse.house.images })
  @Column()
  images: string; // split('\n')
}
