import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stadium } from 'src/entities/stadum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectRepository(Stadium) private stadiumRepository: Repository<Stadium>,
  ) {}

  async create(createStadiumDto: CreateStadiumDto) {
    const { name } = createStadiumDto;
    const existingStadium = this.stadiumRepository.findOne({ where: { name } });

    if (existingStadium) {
      throw new BadRequestException('Stadium already exists');
    }
    const newStadium = this.stadiumRepository.create(createStadiumDto);
    await this.stadiumRepository.save(newStadium);
    return newStadium;
  }

  findAll() {
    return this.stadiumRepository.find({});
  }

  async findOne(id: number) {
    const stadium = await this.stadiumRepository.findOne({ where: { id } });
    if (!stadium) {
      throw new BadRequestException('Stadium not found');
    }
    return stadium;
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    const stadium = await this.stadiumRepository.findOne({ where: { id } });
    if (!stadium) {
      throw new BadRequestException('Stadium not found');
    }
    Object.assign(stadium, updateStadiumDto);
    this.stadiumRepository.save(stadium);
    return stadium;
  }

  async remove(id: number) {
    const stadium = await this.stadiumRepository.findOne({ where: { id } });
    if (!stadium) {
      throw new BadRequestException('Stadium not found');
    }
    this.stadiumRepository.delete(stadium);
    return stadium;
  }
}
