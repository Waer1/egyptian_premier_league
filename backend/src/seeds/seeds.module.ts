import { Module, OnModuleInit } from '@nestjs/common';
import { MatchesSeedsService } from './matches.seed';
import { StadiumSeedsService } from './stadiums.seed';
import { MatchsModule } from 'src/modules/matchs/matchs.module';
import { StadiumsModule } from 'src/modules/stadiums/stadiums.module';

@Module({
  imports: [MatchsModule, StadiumsModule],
  providers: [MatchesSeedsService, StadiumSeedsService],
})
export class SeedsModule implements OnModuleInit {
  constructor(
    private readonly MatchesSeedsService: MatchesSeedsService,
    private readonly StadiumSeedsService: StadiumSeedsService,
  ) {}

  async onModuleInit() {
    await this.StadiumSeedsService.seedsStadiums();
    await this.MatchesSeedsService.seedsMatches();
  }
}
