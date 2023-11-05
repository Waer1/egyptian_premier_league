import { PartialType } from '@nestjs/mapped-types';
import { CreateStadiumDto } from './create-stadium.dto';

export class UpdateStadiumDto extends PartialType(CreateStadiumDto) {}
