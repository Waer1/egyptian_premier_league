import { IsEmpty } from 'class-validator';

export class SignInDTO {
  @IsEmpty()
  readonly username: string;
  @IsEmpty()
  readonly password: string;
}
