import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @Post('login')
  async login(
    @Body()
    { username, password }: { username: string; password: string },
  ) {
    return await this.usersService.Login({ username, password });
  }

  @Get()
  async getUsers(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 0,
  ) {
    const users = await this.usersService.findAll();
    offset = parseInt(offset.toString());
    limit = parseInt(limit.toString());
    if (offset <= 0 || limit <= 0) {
      return users;
    }
    return users.slice(offset * limit, offset * limit + limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }
}
