import { IsEmail } from 'class-validator';
import { encryptPassword } from 'src/shared/encryption.util';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export enum UserRole {
  SITE_ADMIN = 'siteAdmin',
  EFA_MANAGER = 'EFA manager',
  FAN = 'fan',
  GUEST = 'guest',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({})
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column()
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({})
  // @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FAN,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await encryptPassword(this.password);
    }
  }
}
