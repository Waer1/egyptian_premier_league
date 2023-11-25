import { IsInt, IsNotEmpty } from 'class-validator';

export class CancelReservationDto {
  @IsNotEmpty()
  @IsInt()
  reservationId: number;
}
