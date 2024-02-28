import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
// import { User } from '../users/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { RedisClientType } from 'redis';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.Login(loginUserDto);
    if (!user) {
      return null;
    }
    const time = new Date().getTime();
    const loginInf = {
      id: time.toString(),
      loginTime: time,
      logoutTime: null,
      role: '...',
    };
    const payload = {
      username: user.username,
      sub: user.id,
      loginInfId: loginInf.id,
    };
    try {
      const accessToken = this.jwtService.sign(payload);
      this.redisClient.set(String(user.id), JSON.stringify(loginInf));
      return {
        accessToken,
      };
    } catch {
      return { accessToken: null };
    }
  }
}
