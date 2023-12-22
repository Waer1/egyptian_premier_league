import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'The ID of the match', example: 1 })
  @IsNotEmpty()
  @IsInt()
  matchId: number;

  @ApiProperty({ description: 'The row of the seat', example: 5 })
  @IsNotEmpty()
  @IsInt()
  seatRaw: number;

  @ApiProperty({ description: 'The column of the seat', example: 3 })
  @IsNotEmpty()
  @IsInt()
  seatColum: number;
}
