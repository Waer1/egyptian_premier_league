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

  @Column({ type: 'datetime' })
  dateAndTime: Date;

  @ManyToOne(() => Stadium, { cascade: true })
  matchVenue: Stadium;

  @Column()
  mainReferee: string;

  @Column()
  firstLinesman: string;

  @Column()
  secondLinesman: string;

  @Column({})
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
}
