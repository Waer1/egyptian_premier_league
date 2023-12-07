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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SITE_ADMINGuard } from 'src/guards/siteAdmin.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserRole } from 'src/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
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
          role: UserRole.FAN,
        },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
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
          role: UserRole.FAN,
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
  @Get('username/:username')
  @ApiOperation({ summary: 'Get a user by username' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  async findByUsername(@Param('username') username: string) {
    return await this.usersService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a user' })
  @ApiResponse({ status: 200, description: 'User successfully approved.' })
  async approve(@Param('id') id: string) {
    return await this.usersService.approve(+id);
  }
}
