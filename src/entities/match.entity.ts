import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
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

  @ManyToOne(() => User, { cascade: true })
  mainReferee: User;

  @ManyToOne(() => User, { cascade: true })
  firstLinesman: User;

  @ManyToOne(() => User, { cascade: true })
  secondLinesman: User;
}
