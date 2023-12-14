import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
