// src/users/dto/create-user.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
