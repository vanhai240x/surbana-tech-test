import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Location {
  @ApiProperty({ description: 'The unique ID of the location', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The building identifier', example: 'A' })
  @Column()
  building: string;

  @ApiProperty({ description: 'The name of the location', example: 'Car Park' })
  @Column()
  locationName: string;

  @ApiProperty({ description: 'A unique location identifier', example: 'A-CarPark' })
  @Column({ unique: true })
  locationNumber: string;

  @ApiProperty({ description: 'The area in square meters', example: 80.62 })
  @Column('float')
  area: number;

  @ApiProperty({ description: 'The parent location ID (optional)', example: null })
  @Column({ nullable: true })
  parentId: number;

  @ApiProperty({ description: 'The parent location (if any)', type: () => Location, required: false })
  @ManyToOne(() => Location, (location) => location.id, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Location;
}