import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Team } from 'src/shared/teams';
import { NotEquals } from 'class-validator';
import { Stadium } from './stadum.entity';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Match extends BaseEntity {
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

  @Column({ type: 'datetime' })
  dateTime: Date;


  @ManyToOne(() => Stadium, { cascade: true })
  matchVenue: Stadium;

  @Column()
  mainReferee: string;

  @Column()
  firstLinesman: string;

  @Column()
  secondLinesman: string;

  @Column({ type: 'mediumtext' })
  reservedSeats: string;

  minimizeSeatsArray(seatsArray: boolean[][]): string {
    return seatsArray
      .map((row) => row.map((value) => (value ? '1' : '0')).join(''))
      .join(',');
  }

  getSeatsArray(): boolean[][] {
    const seatsArray: boolean[][] = Array(this.matchVenue.rows)
      .fill(null)
      .map(() => Array(this.matchVenue.seatsPerRow).fill(false));

    if (this.reservedSeats) {
      const reservedSeatsArray = this.reservedSeats
        .split(',')
        .map((row) => row.split('').map((value) => value === '1'));

      return reservedSeatsArray;
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
}
