import { Module } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stadium } from 'src/entities/stadum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stadium])],
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
