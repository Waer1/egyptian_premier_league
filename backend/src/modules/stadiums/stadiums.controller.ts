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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { EFA_MANAGERGuard } from 'src/guards/EFA_MANAGER.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('stadiums')
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @UseGuards(JwtAuthGuard, EFA_MANAGERGuard)
  @ApiBearerAuth('EFA_MANAGERGuard')
  @Post()
  @ApiOperation({ summary: 'Create a new stadium' })
  @ApiResponse({ status: 201, description: 'Stadium successfully created.' })
  @ApiBody({
    description: 'Stadium creation payload',
    type: CreateStadiumDto,
    examples: {
      'Stadium creation': {
        value: {
          name: 'Stadium1',
          shape: 'Oval',
          rows: 20,
          seatsPerRow: 50,
        },
      },
    },
  })
  async create(@Body() createStadiumDto: CreateStadiumDto) {
    return await this.stadiumsService.create(createStadiumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stadiums' })
  @ApiResponse({ status: 200, description: 'Return all stadiums.' })
  async findAll() {
    return await this.stadiumsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('EFA_MANAGERGuard')
  @ApiOperation({ summary: 'Get a stadium by id' })
  @ApiResponse({ status: 200, description: 'Return the stadium.' })
  async findOne(@Param('id') id: string) {
    return await this.stadiumsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, EFA_MANAGERGuard)
  @ApiBearerAuth('EFA_MANAGERGuard')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a stadium' })
  @ApiResponse({ status: 200, description: 'Stadium successfully updated.' })
  @ApiBody({
    description: 'Stadium update payload',
    type: UpdateStadiumDto,
    examples: {
      'Stadium update': {
        value: {
          name: 'Stadium2',
          shape: 'Circle',
          rows: 30,
          seatsPerRow: 60,
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateStadiumDto: UpdateStadiumDto,
  ) {
    return await this.stadiumsService.update(+id, updateStadiumDto);
  }

  @UseGuards(JwtAuthGuard, EFA_MANAGERGuard)
  @ApiBearerAuth('EFA_MANAGERGuard')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stadium' })
  @ApiResponse({ status: 200, description: 'Stadium successfully deleted.' })
  async remove(@Param('id') id: string) {
    return await this.stadiumsService.remove(+id);
  }
}
