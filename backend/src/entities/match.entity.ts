import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  AfterUpdate,
  AfterInsert,
  AfterLoad,
} from 'typeorm';
import { Team } from 'src/shared/teams';
import { NotEquals } from 'class-validator';
import { Stadium } from './stadum.entity';
import { BadRequestException } from '@nestjs/common';
import { Expose } from 'class-transformer';

export type TeamInfo = {
  name: Team;
  image: string;
};

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  homeTeam: TeamInfo;

  @Column('json')
  @NotEquals('homeTeam')
  awayTeam: TeamInfo;

  @Column({ type: 'datetime' })
  dateTime: Date;

  @ManyToOne(() => Stadium, { cascade: true, eager: true })
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

  seatsArray: boolean[][];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  setseatsArray() {
    this.seatsArray = this.getSeatsArray();
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
