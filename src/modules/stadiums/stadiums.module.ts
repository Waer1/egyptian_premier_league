import { Module } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';

@Module({
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
