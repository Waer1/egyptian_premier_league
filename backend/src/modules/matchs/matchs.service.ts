import { BadRequestException, Injectable, Search } from '@nestjs/common';
import { CreateMatchDto, getDateTime } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Between, Raw, Repository } from 'typeorm';
import { StadiumsService } from '../stadiums/stadiums.service';
import { getTeamImageLocation } from 'src/shared/teams';
import { Reservation } from 'src/entities/reservation.entity';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepositry: Repository<Reservation>,
    @InjectRepository(Match) private matchRepositry: Repository<Match>,
    private stadiumService: StadiumsService,
  ) {}

  formatDate(date: Date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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

    if (createMatchDto.homeTeam === createMatchDto.awayTeam) {
      throw new BadRequestException(
        'The home team cannot be the same as the away team',
      );
    }

    const createMatchDtoInstance = Object.assign(
      new CreateMatchDto(),
      createMatchDto,
    );
    const { time, date } = createMatchDtoInstance;

    // const matchDateTime = getDateTime(time, date);
    // const currentDateTime = new Date();

    // if (matchDateTime < currentDateTime) {
    //   throw new BadRequestException('Cannot create a match in the past');
    // }

    // const dateStr = this.formatDate(date);

    // const existingMatchForTeam = await this.matchRepositry.findOne({
    //   where: [
    //     {
    //       dateTime: Raw((alias) => `DATE(${alias}) = '${dateStr}'`),
    //       homeTeam: createMatchDto.homeTeam,
    //     },
    //     {
    //       dateTime: Raw((alias) => `DATE(${alias}) = '${dateStr}'`),
    //       awayTeam: createMatchDto.homeTeam,
    //     },
    //     {
    //       dateTime: Raw((alias) => `DATE(${alias}) = '${dateStr}'`),
    //       homeTeam: createMatchDto.awayTeam,
    //     },
    //     {
    //       dateTime: Raw((alias) => `DATE(${alias}) = '${dateStr}'`),
    //       awayTeam: createMatchDto.awayTeam,
    //     },
    //   ],
    // });

    // if (existingMatchForTeam) {
    //   throw new BadRequestException(
    //     'One of the teams already has a match scheduled on this day',
    //   );
    // }

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

    if (updateMatchDto.homeTeam && updateMatchDto.homeTeam.name) {
      updateMatchDto.homeTeam.logo = getTeamImageLocation(
        updateMatchDto.homeTeam.name,
      );
    }

    if (updateMatchDto.awayTeam && updateMatchDto.awayTeam.name) {
      updateMatchDto.awayTeam.logo = getTeamImageLocation(
        updateMatchDto.awayTeam.name,
      );
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

    await this.reservationRepositry.softDelete({
      match: {
        id: id,
      },
    });

    await this.matchRepositry.softDelete({
      id: id,
    });

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
    const matches = await this.matchRepositry.find({
      where: {
        dateTime: Between(startDate, endDate),
      },
      take: 10,
    });

    return matches;
  }
}
