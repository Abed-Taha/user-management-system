import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Abdallah Hassan Taha',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'abd@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345667',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
