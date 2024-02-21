// src/users/dto/create-user.dto.ts

import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deletedAt?: Date;
}
