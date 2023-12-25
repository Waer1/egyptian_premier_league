import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { StadiumsModule } from '../stadiums/stadiums.module';
import { Reservation } from 'src/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Reservation]), StadiumsModule],
  controllers: [MatchsController],
  providers: [MatchsService],
  exports: [MatchsService],
})
export class MatchsModule {}