import { Module } from '@nestjs/common';
import { EnvModule } from './modules/env/env.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { StadiumsModule } from './modules/stadiums/stadiums.module';

@Module({
  imports: [EnvModule, DatabaseModule, UsersModule, StadiumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
