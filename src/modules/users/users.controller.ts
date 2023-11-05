import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiBody({
    description: 'User creation payload',
    type: CreateUserDto,
    examples: {
      'User creation': {
        value: {
          username: 'waer1',
          password: '12345678Ww+',
          firstName: 'yousef',
          lastName: 'alwaer',
          birthDate: '2023-11-05',
          gender: 'male',
          city: 'shoubra',
          email: 'elwaeryousef@gmail.com',
        },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiBody({
    description: 'User update payload',
    type: UpdateUserDto,
    examples: {
      'User update': {
        value: {
          username: 'newUsername',
          password: 'newPassword',
          firstName: 'newFirstName',
          lastName: 'newLastName',
          birthDate: '2023-11-05',
          gender: 'female',
          city: 'newCity',
          email: 'newEmail@example.com',
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
