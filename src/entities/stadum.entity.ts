import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shape: string;

  @Column()
  rows: number;

  @Column()
  seatsPerRow: number;
}
