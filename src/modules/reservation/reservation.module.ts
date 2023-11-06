import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { UsersModule } from '../users/users.module';
import { MatchsModule } from '../matchs/matchs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UsersModule, MatchsModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
