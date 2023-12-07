import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FANGuard } from 'src/guards/FAN.guard';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard, FANGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiResponse({
    status: 201,
    description: 'The reservation has been successfully created.',
  })
  @ApiBody({
    description: 'The reservation details',
    type: CreateReservationDto,
    examples: {
      'Example 1': {
        summary: 'A single seat reservation',
        value: { matchId: 1, row: 2, column: 3 },
      },
      'Example 2': {
        summary: 'Another single seat reservation',
        value: { matchId: 2, row: 4, column: 5 },
      },
    },
  })
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req,
  ) {
    return await this.reservationService.create(
      createReservationDto,
      req.user.id,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Return all reservations.' })
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reservation by id' })
  @ApiResponse({ status: 200, description: 'Return the reservation.' })
  async findOne(@Param('id') id: string) {
    return await this.reservationService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, FANGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a reservation' })
  @ApiResponse({
    status: 200,
    description: 'The reservation has been successfully updated.',
  })
  @ApiBody({
    description: 'The updated reservation details',
    type: UpdateReservationDto,
    examples: {
      'Example 1': {
        summary: 'Update a single seat reservation',
        value: { matchId: 1, row: 2, column: 3 },
      },
      'Example 2': {
        summary: 'Update another single seat reservation',
        value: { matchId: 2, row: 4, column: 5 },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @Request() req,
  ) {
    return await this.reservationService.update(
      +id,
      updateReservationDto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard, FANGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reservation' })
  @ApiResponse({
    status: 200,
    description: 'The reservation has been successfully deleted.',
  })
  async remove(@Param('id') id: string, @Request() req) {
    return await this.reservationService.remove(+id, req.user.id);
  }
}
