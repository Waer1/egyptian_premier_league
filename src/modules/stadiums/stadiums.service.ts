import { Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';

@Injectable()
export class StadiumsService {
  create(createStadiumDto: CreateStadiumDto) {
    return 'This action adds a new stadium';
  }

  findAll() {
    return `This action returns all stadiums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stadium`;
  }

  update(id: number, updateStadiumDto: UpdateStadiumDto) {
    return `This action updates a #${id} stadium`;
  }

  remove(id: number) {
    return `This action removes a #${id} stadium`;
  }
}
