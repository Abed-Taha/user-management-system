import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { paginate, PaginateConfig, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateUser } from 'src/dto/update-user.dto';

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

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<User | null>> {
    const config: PaginateConfig<User> = {
      sortableColumns: ['id', 'fullName', 'email', 'createdAt'],
      searchableColumns: ['fullName', 'email'],
      defaultSortBy: [['createdAt', 'ASC']],
      withDeleted: true,
      maxLimit: 30,
    };
    return paginate(query, this.userRepository, config);
  }

  async update(id: number, user: UpdateUser): Promise<User | null> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const status = await this.userRepository.delete(id);
    const affected = status.affected ?? 0;
    return affected > 0;
  }

  async softDelete(id: number): Promise<boolean> {
    const status = await this.userRepository.softDelete(id);
    const affected = status.affected ?? 0;
    return affected > 0;
  }
}
