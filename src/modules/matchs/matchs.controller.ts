import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('matchs')
@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

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
  findOne(@Param('id') id: string) {
    return this.matchsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update match' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully updated.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The id of the match' })
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchsService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete match' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully deleted.',
  })
  @ApiParam({ name: 'id', required: true, description: 'The id of the match' })
  remove(@Param('id') id: string) {
    return this.matchsService.remove(+id);
  }
}
