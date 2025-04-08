import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @ApiProperty({ description: 'The building identifier (e.g., A, B)', example: 'A', required: false })
  building?: string;

  @ApiProperty({ description: 'The name of the location', example: 'Car Park', required: false })
  locationName?: string;

  @ApiProperty({ description: 'A unique location identifier', example: 'A-CarPark', required: false })
  locationNumber?: string;

  @ApiProperty({ description: 'The area in square meters', example: 80.62, required: false })
  area?: number;

  @ApiProperty({ description: 'The parent location ID (optional)', example: null, required: false })
  parentId?: number;
}