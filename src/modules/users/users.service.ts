import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const existingUser = await this.userRepositry.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = this.userRepositry.create(createUserDto);
    await this.userRepositry.save(newUser);
    return newUser;
  }

  findAll() {
    return this.userRepositry.find({});
  }

  async findOne(id: number) {
    const user = await this.userRepositry.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepositry.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    Object.assign(user, updateUserDto);
    await this.userRepositry.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepositry.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepositry.delete(user.id);
    return user;
  }
}
