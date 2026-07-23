import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
