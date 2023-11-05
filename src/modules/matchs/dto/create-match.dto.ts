import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/shared/teams';
import { IsNotEqualTo } from 'src/shared/IsNotEqual';
import { IsTimeString } from 'src/shared/IsTimeString';

export class CreateMatchDto {
  @ApiProperty({ description: 'The home team' })
  @IsEnum(Team)
  @IsNotEmpty()
  homeTeam: Team;

  @ApiProperty({ description: 'The away team' })
  @IsEnum(Team)
  @IsNotEmpty()
  @IsNotEqualTo('homeTeam', {
    message: 'Away team must not be the same as the home team',
  })
  awayTeam: Team;

  @ApiProperty({ description: 'The date of the match' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'The time of the match' })
  @IsNotEmpty()
  @IsTimeString({ message: 'Time must be a string in the format "HH:mm"' })
  time: string;

  @ApiProperty({ description: 'The venue of the match', type: String })
  @IsNotEmpty()
  stauimName: string;

  @ApiProperty({ description: 'The main referee' })
  @IsString()
  @IsNotEmpty()
  mainReferee: string;

  @ApiProperty({ description: 'The first linesman' })
  @IsString()
  @IsNotEmpty()
  firstLinesman: string;

  @ApiProperty({ description: 'The second linesman' })
  @IsString()
  @IsNotEmpty()
  secondLinesman: string;
}
