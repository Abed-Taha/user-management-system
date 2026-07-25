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
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { UpdateUser } from 'src/dto/update-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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
    if (!user) throw new NotFoundException({ message: 'User Not Found!' });
    else return user;
  }

  @Post('login')
  async login(@Body() userInfo: LoginUserDto) {
    const user = await this.userService.findByEmail(userInfo);
    if (user) return { data: user, message: 'Logged In successfully' };
    else throw new NotFoundException({ message: 'email or password is Incorrect' });
  }

  @Get('find/all')
  async getAll(@Paginate() query: PaginateQuery) {
    console.log(query);
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

  @Delete(':id/delete')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const status = await this.userService.deleteUser(id);
    return status ? { message: 'User Deleted Successfully' } : { message: 'Something Went Wrong' };
  }

  @Put(':id/disable')
  async disableUser(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const status = await this.userService.disableUser(id);
    if (status) {
      return { message: 'User Disabled!' };
    } else {
      throw new InternalServerErrorException({ message: 'Something Went Wrong!' });
    }
  }

  @Put(':id/restore')
  async restoreUser(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const status = await this.userService.restoreUser(id);
    if (status) {
      return { message: 'User Restored!' };
    } else {
      throw new InternalServerErrorException({ message: 'Something Went Wrong!' });
    }
  }
}
