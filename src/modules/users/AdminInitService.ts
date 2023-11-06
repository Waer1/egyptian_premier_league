import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender, User, UserRole, UserStatus } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminInitService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminUser = await this.usersRepository.findOne({
      where: { username: 'admin' },
    });

    if (!adminUser) {
      const user = this.usersRepository.create({
        username: 'admin',
        password: 'Admin1234+',
        firstName: 'Admin',
        lastName: 'Admin',
        birthDate: new Date(),
        gender: Gender.MALE,
        city: 'Amman',
        address: 'Amman',
        email: 'admin@admin.com',
        role: UserRole.SITE_ADMIN,
        status: UserStatus.APPROVED,
      });

      await this.usersRepository.save(user);
    }
  }
}
