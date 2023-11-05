import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';

@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }
}
