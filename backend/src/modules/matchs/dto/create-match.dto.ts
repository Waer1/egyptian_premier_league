import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/shared/teams';
import { IsNotEqualTo } from 'src/shared/IsNotEqual';
import { IsTimeString } from 'src/shared/IsTimeString';

export class CreateMatchDto {
  @ApiProperty({
    description: 'The home team',
    enum: Team,
    example: Team.AL_AHLY,
  })
  @IsEnum(Team)
  @IsNotEmpty()
  homeTeam: Team;

  @ApiProperty({
    description: 'The away team',
    enum: Team,
    example: Team.ZAMALEK,
  })
  @IsEnum(Team)
  @IsNotEmpty()
  @IsNotEqualTo('homeTeam', {
    message: 'Away team must not be the same as the home team',
  })
  awayTeam: Team;

  @ApiProperty({ description: 'The date of the match' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'The time of the match', example: '08:00' })
  @IsNotEmpty()
  @IsTimeString({ message: 'Time must be a string in the format "HH:mm"' })
  time: string;

  @ApiProperty({
    description: 'The venue of the match',
    type: String,
    example: 'Stadium A',
  })
  @IsNotEmpty()
  stauimName: string;

  @ApiProperty({ description: 'The main referee', example: 'Referee 1' })
  @IsString()
  @IsNotEmpty()
  mainReferee: string;

  @ApiProperty({ description: 'The first linesman', example: 'Linesman 1' })
  @IsString()
  @IsNotEmpty()
  firstLinesman: string;

  @ApiProperty({ description: 'The second linesman', example: 'Linesman 2' })
  @IsString()
  @IsNotEmpty()
  secondLinesman: string;

  getDateTime(): Date {
    const [hours, minutes] = this.time.split(':').map(Number);
    const date = new Date(this.date);
    date.setHours(hours, minutes);
    return date;
  }
}
