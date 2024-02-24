import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByLogin(loginUserDto);

    const token = this._createToken(user);
    return {
      accessToken: token,
    };
  }

  private _createToken({ username }: User): string {
    const user: JwtPayload = { username };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.usersService.findByPayload(payload);
  }
}


