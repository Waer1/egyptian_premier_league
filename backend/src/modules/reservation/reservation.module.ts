import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { UsersModule } from '../users/users.module';
import { MatchsModule } from '../matchs/matchs.module';
import { ReservationGateway } from './reserve.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    UsersModule,
    MatchsModule,
    AuthModule,
    MatchsModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationGateway],
})
export class ReservationModule {}
