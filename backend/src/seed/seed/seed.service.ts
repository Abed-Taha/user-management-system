import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  public static usersCount = 0;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run() {
    const hashedPass = await bcrypt.hash('1234567', 10);

    const users: Partial<User>[] = [];

    const start = SeedService.usersCount + 1;
    const end = SeedService.usersCount + 30;

    for (let i = start; i <= end; i++) {
      const email = `User${i}@test.com`;

      const userExist = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!userExist) {
        users.push({
          fullName: `User ${i}`,
          email,
          password: hashedPass,
        });
      }
    }

    if (users.length > 0) {
      await this.userRepository.save(users);
    }

    SeedService.usersCount = end;
  }

  get usersCount() {
    return SeedService.usersCount;
  }
}
