import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
