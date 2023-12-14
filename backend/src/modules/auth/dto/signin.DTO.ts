import { isNotEmpty } from 'class-validator';

export class SignInDTO {
  readonly username: string;


  readonly password: string;
}
