import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';

@Module({
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
