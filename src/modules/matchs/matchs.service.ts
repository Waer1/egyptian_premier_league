import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Between, Repository } from 'typeorm';
import { StadiumsService } from '../stadiums/stadiums.service';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match) private matchRepositry: Repository<Match>,
    private stadiumService: StadiumsService,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const targetStadium = await this.stadiumService.findOneByName(
      createMatchDto.stauimName,
    );

    if (!targetStadium) {
      throw new BadRequestException('Stadium not found');
    }

    const existingMatch = await this.matchRepositry.findOne({
      where: {
        date: createMatchDto.date,
      },
    });

    if (existingMatch) {
      throw new BadRequestException(
        'There is already a match scheduled on this day',
      );
    }
    const matchReq = {
      matchVenue: targetStadium,
      ...createMatchDto,
    };

    const newMatch = this.matchRepositry.create(matchReq);
    await this.matchRepositry.save(newMatch);
    return newMatch;
  }

  findAll() {
    return this.matchRepositry.find({});
  }

  async findOne(id: number) {
    const match = this.matchRepositry.findOne({ where: { id } });
    if (!match) {
      throw new BadRequestException('Match not found');
    }
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.findOne(id);
    if (!match) {
      throw new BadRequestException('Match not found');
    }
    Object.assign(match, updateMatchDto);
    await this.matchRepositry.save(match);
    return match;
  }

  async remove(id: number) {
    const match = await this.findOne(id);

    if (!match) {
      throw new BadRequestException('Match not found');
    }

    await this.matchRepositry.remove(match);
    return match;
  }
}
