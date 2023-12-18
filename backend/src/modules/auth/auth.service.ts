import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords, encryptPassword } from 'src/shared/encryption.util';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from 'src/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EditUserDto } from './dto/edit-profile.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

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

  async changePassword(id: number, updateUserDto: UpdatePasswordDto) {
    const { newPassword, oldPassword } = updateUserDto;
    const user = await this.usersService.findOne(id);
    this.validateUser(user.username, oldPassword);

    const newHadedPassword = await encryptPassword(newPassword);
    user.password = newHadedPassword;
    await this.usersService.update(id, user);
  }

  async updateProfile(id: number, updateUserDto: EditUserDto) {
    const user = await this.usersService.findOne(id);
    if (updateUserDto.username) {
      // Check if the username is reserved
      const isUsernameTaken = await this.usersService.isUsernameTaken(
        updateUserDto.username,
      );
      if (isUsernameTaken) {
        throw new BadRequestException('Username is already taken');
      }
    }

    // await this.validateUser(user.username, updateUserDto.password);
    delete user.password;
    Object.assign(user, updateUserDto);
    await this.usersService.update(id, user);
    return user;
  }
}
