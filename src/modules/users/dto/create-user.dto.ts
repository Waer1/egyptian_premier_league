import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
  IsStrongPassword,
} from 'class-validator';
import { Gender, UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  address: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}
