import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Match } from './match.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { cascade: true })
  user: User;

  @ManyToOne(() => Match, { cascade: true })
  match: Match;

  @Column()
  seatNumber: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  reservationTime: Date;
}
