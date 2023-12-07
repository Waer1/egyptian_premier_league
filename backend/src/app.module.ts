import { Module } from '@nestjs/common';
import { EnvModule } from './modules/env/env.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { StadiumsModule } from './modules/stadiums/stadiums.module';
import { AuthModule } from './modules/auth/auth.module';
import { MatchsModule } from './modules/matchs/matchs.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    UsersModule,
    StadiumsModule,
    AuthModule,
    MatchsModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}