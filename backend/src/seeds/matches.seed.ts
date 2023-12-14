import { Inject, Injectable } from '@nestjs/common';
import { MatchsService } from '../modules/matchs/matchs.service';

@Injectable()
export class MatchesSeedsService {
  constructor(
    @Inject(MatchsService)
    private readonly matchsService: MatchsService,
  ) {}

  async seedsMatches() {
    
  }
}
