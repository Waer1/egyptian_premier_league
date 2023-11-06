import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsInt()
  matchId: number;

  @IsNotEmpty()
  @IsInt()
  seatRaw: number;

  @IsNotEmpty()
  @IsInt()
  seatColum: number;
}
