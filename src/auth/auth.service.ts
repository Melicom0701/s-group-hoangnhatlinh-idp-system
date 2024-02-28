import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
// import { User } from '../users/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.Login(loginUserDto);
    if (!user) {
      return null;
    }

    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}

//   async validateUser(payload: JwtPayload): Promise<User> {
//    // return await this.usersService.findByPayload(payload);
//   }
