import { IsInt, IsNotEmpty } from 'class-validator';

export class JoinReservationDto {
  @IsNotEmpty()
  @IsInt()
  matchId: number;
}
