import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match) private matchRepositry: Repository<Match>,
  ) {}

  create(createMatchDto: CreateMatchDto) {
    const newMatch = this.matchRepositry.insert(createMatchDto);
    return newMatch;
  }

  findAll() {
    return this.matchRepositry.find({});
  }

  async findOne(id: number) {
    const match = this.matchRepositry.findOne({ where: { id } });
    if (!match) {
      throw new Error('Match not found');
    }
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.findOne(id);
    Object.assign(match, updateMatchDto);
    await this.matchRepositry.save(match);
    return match;
  }

  async remove(id: number) {
    const match = await this.findOne(id);
    await this.matchRepositry.remove(match);
    return match;
  }
}
