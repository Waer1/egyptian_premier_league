import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Match } from './match.entity';

@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  rows: number;

  @Column()
  seatsPerRow: number;

  @OneToMany(() => Match, (match) => match.matchVenue)
  matches: Match[];
}
