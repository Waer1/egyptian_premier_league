import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBasicAuth,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SignInDTO } from './dto/signin.DTO';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SITE_ADMINGuard } from 'src/guards/siteAdmin.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBasicAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiBody({
    description: 'The login details',
    type: SignInDTO,
    examples: {
      'Waer User': {
        value: {
          username: 'waer',
          password: '12345678Ww+',
        },
      },
      'Site Admin': {
        value: {
          username: 'admin',
          password: 'Admin1234+',
        },
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 201, description: 'Signed up successfully.' })
  @ApiBody({
    description: 'The signup details',
    type: CreateUserDto,
  })
  async signup(@Body() signUpDTO: CreateUserDto) {
    return this.authService.signup(signUpDTO);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out' })
  @ApiResponse({ status: 200, description: 'Logged out successfully.' })
  async logout() {
    return { message: 'Logged out successfully.' };
  }

  @UseGuards(JwtAuthGuard, SITE_ADMINGuard)
  @ApiBearerAuth()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Access token refreshed.' })
  async refresh() {
    return { waer: 'waer' };
  }
}
