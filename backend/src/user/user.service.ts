import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const hashed = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({ ...user, password: hashed });
    return await this.userRepository.save(newUser);
  }
}
