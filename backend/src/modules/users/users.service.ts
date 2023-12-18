import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from 'src/entities/user.entity';

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

    delete newUser.password;
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

  async findByUsername(username: string, includePassword = false) {
    let query = this.userRepositry
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    if (includePassword) {
      query = query.addSelect('user.password');
    }

    return query.getOne();
  }

  async approve(id: number) {
    const user = await this.userRepositry.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.status = UserStatus.APPROVED;
    await this.userRepositry.save(user);
    return user;
  }

  async findPendingUsers(): Promise<User[]> {
    return this.userRepositry.find({ where: { status: UserStatus.PENDING } });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.userRepositry.find({ where: { status: UserStatus.APPROVED } });
  }

  async getCurrentUser(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.userRepositry.findOne({ where: { username } });
    return !!user;
  }
}
