import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Team } from 'src/shared/teams';
import { NotEquals } from 'class-validator';
import { Stadium } from './stadum.entity';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Team,
  })
  homeTeam: Team;

  @Column({
    type: 'enum',
    enum: Team,
  })
  @NotEquals('homeTeam')
  awayTeam: Team;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @ManyToOne(() => Stadium, { cascade: true })
  matchVenue: Stadium;

  @Column()
  mainReferee: string;

  @Column()
  firstLinesman: string;

  @Column()
  secondLinesman: string;

  @Column({ default: '' })
  reservedSeats: string;

  reservedSeatsArray: boolean[][];

  @BeforeInsert()
  @BeforeUpdate()
  convertSeatsArrayToString() {
    this.reservedSeats = JSON.stringify(this.reservedSeatsArray);
  }

  getSeatsArray(): boolean[][] {
    const seatsArray: boolean[][] = Array(this.matchVenue.rows)
      .fill(null)
      .map(() => Array(this.matchVenue.seatsPerRow).fill(false));

    if (this.reservedSeats) {
      const reservedSeatsArray = JSON.parse(this.reservedSeats);
      for (const [rowIndex, columnIndex] of reservedSeatsArray) {
        seatsArray[rowIndex][columnIndex] = true;
      }
    }

    return seatsArray;
  }

  isValidAndAvailableSeat(row: number, column: number): boolean {
    const seatsArray = this.getSeatsArray();

    // Check if the row and column are within the valid range
    if (
      row < 0 ||
      row >= seatsArray.length ||
      column < 0 ||
      column >= seatsArray[0].length
    ) {
      throw new BadRequestException('Invalid seat');
    }

    // Check if the seat is available
    if (seatsArray[row][column]) {
      return false;
    }

    return true;
  }

  reserveSeat(row: number, column: number) {
    const seatsArray = this.getSeatsArray();

    if (!this.isValidAndAvailableSeat(row, column)) {
      throw new BadRequestException('Seat is already reserved');
    }

    seatsArray[row][column] = true;
    this.reservedSeatsArray = seatsArray;
  }

  unresereveSeat(row: number, column: number) {
    const seatsArray = this.getSeatsArray();

    if (!this.isValidAndAvailableSeat(row, column)) {
      throw new BadRequestException('Seat is not reserved');
    }

    seatsArray[row][column] = false;
    this.reservedSeatsArray = seatsArray;
  }
}
