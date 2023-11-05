import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from 'src/shared/encryption.util';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
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

    return logininUser;
  }

  async login(user: User) {
    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);
    return this.login(newUser);
  }
}
