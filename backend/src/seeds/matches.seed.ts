import { Inject, Injectable } from '@nestjs/common';
import { MatchsService } from '../modules/matchs/matchs.service';
import { Team } from 'src/shared/teams';
import { CreateMatchDto } from 'src/modules/matchs/dto/create-match.dto';
import { StadiumsService } from 'src/modules/stadiums/stadiums.service';
import { Stadium } from 'src/entities/stadum.entity';

@Injectable()
export class MatchesSeedsService {
  constructor(
    @Inject(MatchsService)
    private readonly matchsService: MatchsService,
    @Inject(StadiumsService)
    private readonly stadiumsService: StadiumsService,
  ) {}

  async seedsMatches() {
    if ((await this.matchsService.findAll()).length === 0) {
      console.log('Seeding matches...');

      const teams = Object.values(Team); // Get all team names
      const startDate = new Date(); // Start from today
      const endDate = new Date();
      const stadiums = await this.stadiumsService.findAll();
      endDate.setMonth(startDate.getMonth() + 3); // End date is 3 months from now

      for (
        let day = startDate;
        day <= endDate;
        day.setDate(day.getDate() + 1)
      ) {
        for (let i = 0; i < 3; i++) {
          // Create 3 matches per day
          const homeTeam = this.getRandomTeam(teams);
          let awayTeam = this.getRandomTeam(teams);
          while (homeTeam === awayTeam) {
            // Ensure home team and away team are not the same
            awayTeam = this.getRandomTeam(teams);
          }

          const stadium = this.getRandomStadium(stadiums);

          const match: CreateMatchDto = {
            homeTeam: {
              name: homeTeam,
              logo: '',
            },
            awayTeam: {
              name: awayTeam,
              logo: '',
            },
            date: new Date(day),
            time: '20:00', // Set a default time or generate a random time
            stauimName: stadium.name, // Set a default stadium name or generate a random stadium name
            mainReferee: 'Default Referee', // Set a default referee name or generate a random referee name
            firstLinesman: 'Default Linesman 1', // Set a default linesman name or generate a random linesman name
            secondLinesman: 'Default Linesman 2',
          };

          await this.matchsService.create(match);
        }
      }
    }
  }

  getRandomStadium(stadiums: Stadium[]): Stadium {
    return stadiums[Math.floor(Math.random() * stadiums.length)];
  }

  getRandomTeam(teams: string[]): Team {
    return teams[Math.floor(Math.random() * teams.length)] as Team;
  }
}
