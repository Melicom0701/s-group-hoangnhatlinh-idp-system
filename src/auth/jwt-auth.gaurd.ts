import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
// import { decode } from 'punycode';

// import * as Redis from 'ioredis';
// const redisClient = new Redis();
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    //const response = context.switchToHttp().getResponse();
    if (!request.headers.authorization) {
      return false;
    }
    const token = request.headers.authorization.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, 'huhuhuhu');
      request.user = decodedToken;

      return true;
    } catch (error) {
      return false;
    }
  }
}
