import { BadRequestException, Injectable, Search } from '@nestjs/common';
import { CreateMatchDto, getDateTime } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Repository } from 'typeorm';
import { StadiumsService } from '../stadiums/stadiums.service';
import { getTeamImageLocation } from 'src/shared/teams';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match) private matchRepositry: Repository<Match>,
    private stadiumService: StadiumsService,
  ) {}

  minimizeSeatsArray(seatsArray: boolean[][]): string {
    return seatsArray
      .map((row) => row.map((value) => (value ? '1' : '0')).join(''))
      .join(',');
  }

  async create(createMatchDto: CreateMatchDto) {
    const targetStadium = await this.stadiumService.findOneByName(
      createMatchDto.stauimName,
    );

    if (!targetStadium) {
      throw new BadRequestException('Stadium not found');
    }

    const createMatchDtoInstance = Object.assign(
      new CreateMatchDto(),
      createMatchDto,
    );
    const { time, date } = createMatchDtoInstance;

    const existingMatch = await this.matchRepositry.findOne({
      where: {
        dateTime: getDateTime(time, date),
      },
    });

    if (existingMatch) {
      throw new BadRequestException(
        'There is already a match scheduled on this day',
      );
    }

    const seatsArray: boolean[][] = Array(targetStadium.rows)
      .fill(null)
      .map(() => Array(targetStadium.seatsPerRow).fill(false));

    const matchReq = {
      matchVenue: targetStadium,
      ...createMatchDto,
      dateTime: getDateTime(time, date),
      reservedSeats: this.minimizeSeatsArray(seatsArray),
    };

    matchReq.homeTeam.logo = getTeamImageLocation(matchReq.homeTeam.name);
    matchReq.awayTeam.logo = getTeamImageLocation(matchReq.awayTeam.name);

    const newMatch = this.matchRepositry.create(matchReq);
    await this.matchRepositry.save(newMatch);
    return newMatch;
  }

  async findAll() {
    const matches = await this.matchRepositry.find({
      skip: 0,
      take: 10,
    });
    return matches;
  }

  async findOne(id: number) {
    const match = await this.matchRepositry.findOne({
      where: { id: id },
      relations: {
        matchVenue: true,
      },
    });
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

  async doesMatchExist(id: number) {
    const matchExist = await this.matchRepositry.exist({ where: { id } });
    return matchExist;
  }

  async reserveSeat(matchId: number, row: number, column: number) {
    const match = await this.findOne(matchId);

    const seatsArray = match.getSeatsArray();

    if (!match.isValidAndAvailableSeat(row, column)) {
      throw new BadRequestException('Seat is already reserved');
    }

    seatsArray[row][column] = true;

    match.reservedSeats = match.minimizeSeatsArray(seatsArray);

    // Save the updated Match entity to the database
    await this.matchRepositry.save(match);
  }

  async unresereveSeat(matchId: number, row: number, column: number) {
    const match = await this.findOne(matchId);

    const seatsArray = match.getSeatsArray();

    if (match.isValidAndAvailableSeat(row, column)) {
      throw new BadRequestException('Seat is not reserved');
    }

    seatsArray[row][column] = false;

    match.reservedSeats = match.minimizeSeatsArray(seatsArray);
    await this.matchRepositry.save(match);
  }

  async getMatchesBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<Match[]> {
    const matches = await this.matchRepositry
      .createQueryBuilder('match')
      .where('match.dateTime >= :startDate', { startDate })
      .andWhere('match.dateTime <= :endDate', { endDate })
      .limit(10)
      .getMany();

    return matches;
  }
}
