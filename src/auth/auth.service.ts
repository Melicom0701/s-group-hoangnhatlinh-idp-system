import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
// import { User } from '../users/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { RedisClientType } from 'redis';
import { LoginInfService } from '../loginInf/loginInf.service';
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
    //key version take parameter from date time to generate
    const keyVersion: string = new Date().getTime().toString();
    const payload = {
      username: user.username,
      sub: user.id,
      keyVersion: keyVersion,
    };
    try {
      const accessToken = this.jwtService.sign(payload);
      const loginInfService = new LoginInfService(); // Create an instance of LoginInfService
      const loginInf = await loginInfService.create(keyVersion); // Call the create method on the instance
      console.log(loginInf);
      return {
        accessToken,
      };
    } catch {
      return { accessToken: null };
    }
  }
}

//   async validateUser(payload: JwtPayload): Promise<User> {
//    // return await this.usersService.findByPayload(payload);
//   }
