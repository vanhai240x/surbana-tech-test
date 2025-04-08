import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try {
      const location = this.locationsRepository.create(createLocationDto);
      this.logger.info(`Created location: ${createLocationDto.locationNumber}`);
      return await this.locationsRepository.save(location);
    } catch (error) {
      if (error.code === '23505') {
        this.logger.warn(`Duplicate locationNumber: ${createLocationDto.locationNumber}`);
        throw new ConflictException(`Location with locationNumber '${createLocationDto.locationNumber}' already exists`);
      }
      this.logger.error(`Error creating location: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Location[]> {
    this.logger.info('Fetching all locations');
    return this.locationsRepository.find({ relations: ['parent'] });
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationsRepository.findOne({
      where: { id },
      relations: ['parent'],
    });
    if (!location) {
      this.logger.warn(`Location with ID ${id} not found`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    this.logger.info(`Fetched location: ${location.locationNumber}`);
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.findOne(id);
    Object.assign(location, updateLocationDto);
    this.logger.info(`Updated location: ${location.locationNumber}`);
    return this.locationsRepository.save(location);
  }

  async remove(id: number): Promise<void> {
    const location = await this.findOne(id);
    await this.locationsRepository.remove(location);
    this.logger.info(`Deleted location: ${location.locationNumber}`);
  }

  async findTree(): Promise<Location[]> {
    try {
      this.logger.info('Fetching location tree');
      const allLocations = await this.locationsRepository.find();

      if (!allLocations || allLocations.length === 0) {
        this.logger.warn('No locations found');
        return [];
      }

      const locationMap = new Map<number, Location>();
      allLocations.forEach((loc) => {
        loc.children = [];
        locationMap.set(loc.id, loc);
      });

      allLocations.forEach((loc) => {
        if (loc.parentId) {
          const parent = locationMap.get(loc.parentId);
          if (parent) {
            parent.children.push(loc);
          }
        }
      });

      const tree = allLocations.filter((loc) => !loc.parentId);
      this.logger.info(`Found ${tree.length} root nodes`);
      return tree;
    } catch (error) {
      this.logger.error(`Error fetching tree: ${error.message}`);
      throw error;
    }
  }
}