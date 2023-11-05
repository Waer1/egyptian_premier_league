import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { StadiumsModule } from '../stadiums/stadiums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), StadiumsModule],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
