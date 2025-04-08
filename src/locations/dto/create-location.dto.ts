import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ description: 'The building identifier (e.g., A, B)', example: 'A' })
  @IsString()
  building: string;

  @ApiProperty({ description: 'The name of the location', example: 'Car Park' })
  @IsString()
  locationName: string;

  @ApiProperty({ description: 'A unique location identifier', example: 'A-CarPark' })
  @IsString()
  locationNumber: string;

  @ApiProperty({ description: 'The area in square meters', example: 80.62 })
  @IsNumber()
  @Min(0)
  area: number;

  @ApiProperty({ description: 'The parent location ID (optional)', example: null, required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}