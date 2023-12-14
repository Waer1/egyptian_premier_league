import { Injectable } from '@nestjs/common';
import { Team, getTeamImageLocation } from 'src/shared/teams';

@Injectable()
export class TeamsService {
  getAllTeams() {
    // Get all team names
    const teamNames = Object.values(Team);

    // Map each team name to an object with name and image location
    const teams = teamNames.map((name) => ({
      name,
      logo: getTeamImageLocation(name),
    }));

    return teams;
  }
}
