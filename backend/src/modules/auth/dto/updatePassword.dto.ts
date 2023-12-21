import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'The old password',
    required: true,
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'The new password',
    minLength: 8,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short, minimum length is 8 characters',
  })
  newPassword: string;
}
