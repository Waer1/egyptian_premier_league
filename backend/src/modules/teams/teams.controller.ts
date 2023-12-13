import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamsService } from './teams.service';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(
    @Inject(TeamsService)
    private teamsService: TeamsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({
    status: 200,
    description: 'Returns all teams.',
  })
  getAllTeams() {
    return this.teamsService.getAllTeams();
  }
}
