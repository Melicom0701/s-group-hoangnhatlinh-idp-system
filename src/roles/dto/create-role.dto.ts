import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  isEditable: boolean;
}
