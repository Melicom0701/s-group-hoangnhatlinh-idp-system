import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async Login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username, password },
    });
  }
}
