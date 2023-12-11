import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from 'src/shared/encryption.util';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from 'src/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const logininUser = await this.usersService.findByUsername(username, true);

    if (!logininUser) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const correct_password = await comparePasswords(
      password,
      logininUser.password,
    );
    if (!correct_password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (logininUser.status === UserStatus.PENDING) {
      throw new UnauthorizedException(
        'Your account is Created but not approved yet',
      );
    }

    return logininUser;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      isApproved: user.status,
    };
    return {
      userData: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);
    return {
      message:
        'User has been created successfully but waiting for approval from site admin',
      user: newUser,
    };
  }

  validateToken(token: string) {
    try {
      console.log('token', token);
      const payload = this.jwtService.verify(token);
      console.log('payload', payload);
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
