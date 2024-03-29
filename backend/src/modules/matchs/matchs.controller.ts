import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { EFA_MANAGERGuard } from 'src/guards/EFA_MANAGER.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('matchs')
@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @UseGuards(JwtAuthGuard, EFA_MANAGERGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create match' })
  @ApiResponse({
    status: 201,
    description: 'The match has been successfully created.',
  })
  async create(@Body() createMatchDto: CreateMatchDto) {
    return await this.matchsService.create(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all matches' })
  @ApiResponse({ status: 200, description: 'Return all matches.' })
  async findAll() {
    return await this.matchsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find match' })
  @ApiResponse({ status: 200, description: 'Return a match.' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the match' })
  async findOne(@Param('id') id: string) {
    const match = await this.matchsService.findOne(+id);
    return match;
  }

  @UseGuards(JwtAuthGuard, EFA_MANAGERGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update match' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully updated.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The id of the match' })
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return await this.matchsService.update(+id, updateMatchDto);
  }

  @UseGuards(JwtAuthGuard, EFA_MANAGERGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete match' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully deleted.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The id of the match' })
  async remove(@Param('id') id: string) {
    return await this.matchsService.remove(+id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          format: 'date',
          description: 'Start date in YYYY-MM-DD format',
        },
        endDate: {
          type: 'string',
          format: 'date',
          description: 'End date in YYYY-MM-DD format',
        },
      },
      required: ['startDate', 'endDate'],
    },
  })
  @Post('date-range')
  @ApiOperation({ summary: 'Get matches between dates' })
  @ApiResponse({
    status: 200,
    description: 'Matches between the provided dates.',
  })
  getMatchesBetweenDates(
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
  ) {
    return this.matchsService.getMatchesBetweenDates(
      new Date(startDate),
      new Date(endDate),
    );
  }
}
