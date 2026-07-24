import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { UpdateUser } from 'src/dto/update-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() user: CreateUserDto) {
    const created = await this.userService.create(user);
    return { message: 'User created successfully', id: created.id };
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post('login')
  async login(@Body() userInfo: LoginUserDto) {
    const user = await this.userService.findByEmail(userInfo);
    if (user) return { data: user, message: 'Logged In successfully' };
    else throw new NotFoundException({ message: 'email or password is Incorrect' });
  }

  @Get('find/all')
  async getAll(@Paginate() query: PaginateQuery) {
    console.log('user here');
    const users = await this.userService.findAll(query);
    return users;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    const selectedUser = await this.userService.findOne(id);
    if (selectedUser) {
      const updatedUser = await this.userService.update(id, user);
      return { message: 'User Updated Successfully', data: updatedUser };
    }
    return false;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const status = await this.userService.deleteUser(id);
    return status ? { message: 'User Deleted Successfully' } : { message: 'Something Went Wrong' };
  }

  @Delete(':id/temp')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const status = await this.userService.softDelete(id);
    return status ? { message: 'User Disabled!' } : { messsage: 'Something Went Wrong!' };
  }
}
