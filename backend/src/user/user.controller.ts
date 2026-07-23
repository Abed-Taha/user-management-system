import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() user: CreateUserDto) {
    try {
      const created = await this.userService.create(user as any);
      return { message: 'User created successfully', id: created.id };
    } catch (error: any) {
      throw new HttpException(error.message || 'Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }
}
