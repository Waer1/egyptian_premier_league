import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short, minimum length is 8 characters',
  })
  newPassword: string;
}
