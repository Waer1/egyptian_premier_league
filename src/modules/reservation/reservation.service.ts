import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Repository, DataSource } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MatchsService } from '../matchs/matchs.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private userService: UsersService,
    private matchService: MatchsService,
    private dataSource: DataSource,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: number) {
    // get the user and the match
    const user = await this.userService.findOne(userId);
    const match = await this.matchService.findOne(createReservationDto.matchId);

    // check if the user is already reserved a seat in this match
    if (
      !match.isValidAndAvailableSeat(
        createReservationDto.seatRaw,
        createReservationDto.seatColum,
      )
    ) {
      throw new BadRequestException('Seat is already reserved');
    }

    // start the transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // reserve the seat
      const reservation = this.reservationRepository.create({
        user: user,
        match: match,
        ...createReservationDto,
      });
      match.reserveSeat(
        createReservationDto.seatRaw,
        createReservationDto.seatColum,
      );

      await queryRunner.manager.save(reservation);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return new ConflictException(
        'sorry there is a conflict, try again please',
      );
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.reservationRepository.find();
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new BadRequestException('Reservation not found');
    }
    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
    userId: number,
  ) {
    if (updateReservationDto.matchId) {
      throw new BadRequestException('You can not update the match id');
    }

    const reservation = await this.findOne(id);

    if (reservation.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not the owner of this reservation',
      );
    }

    const match = reservation.match;

    // check if the user is already reserved a seat in this match
    if (
      !match.isValidAndAvailableSeat(
        updateReservationDto.seatRaw,
        updateReservationDto.seatColum,
      )
    ) {
      throw new BadRequestException('Seat is already reserved');
    }

    // start the transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // reserve the seat
      match.unresereveSeat(reservation.seatRaw, reservation.seatColum);
      Object.assign(reservation, updateReservationDto);

      await queryRunner.manager.save(reservation);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return new ConflictException(
        'sorry there is a conflict, try again please',
      );
    } finally {
      await queryRunner.release();
    }

    return reservation;
  }

  async remove(id: number, userId: number) {
    const reservation = await this.findOne(id);

    if (reservation.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not the owner of this reservation',
      );
    }

    return await this.reservationRepository.remove(reservation);
  }
}
