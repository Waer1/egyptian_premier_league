import { Module } from '@nestjs/common';
import { EnvModule } from './modules/env/env.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [EnvModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
