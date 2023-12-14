import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/shared/teams';
import { IsNotEqualTo } from 'src/shared/IsNotEqual';
import { IsTimeString } from 'src/shared/IsTimeString';
import { Type } from 'class-transformer';

export class TeamInfo {
  @ApiProperty({
    description: 'The team name',
    enum: Team,
    example: Team.AL_AHLY,
  })
  @IsEnum(Team)
  @IsNotEmpty()
  name: Team;

  logo: string;
}

export class CreateMatchDto {
  @ApiProperty({
    description: 'The home team',
    type: TeamInfo,
  })
  @Type(() => TeamInfo)
  @ValidateNested()
  homeTeam: TeamInfo;

  @ApiProperty({
    description: 'The away team',
    type: TeamInfo,
  })
  @Type(() => TeamInfo)
  @ValidateNested()
  @IsNotEqualTo('homeTeam', {
    message: 'Away team must not be the same as the home team',
  })
  awayTeam: TeamInfo;

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
}

export function getDateTime(time: string, _date: Date): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(_date);
  date.setHours(hours, minutes);
  return date;
}
