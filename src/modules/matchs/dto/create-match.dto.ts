import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/shared/teams';
import { Stadium } from 'src/entities/stadum.entity';

export class CreateMatchDto {
  @ApiProperty({ description: 'The home team' })
  @IsEnum(Team)
  @IsNotEmpty()
  homeTeam: Team;

  @ApiProperty({ description: 'The away team' })
  @IsEnum(Team)
  @IsNotEmpty()
  awayTeam: Team;

  @ApiProperty({ description: 'The date and time of the match' })
  @IsDate()
  @IsNotEmpty()
  dateAndTime: Date;

  @ApiProperty({ description: 'The venue of the match', type: Stadium })
  @ValidateNested()
  @Type(() => Stadium)
  @IsNotEmpty()
  matchVenue: Stadium;

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
