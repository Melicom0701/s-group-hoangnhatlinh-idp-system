import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isEditable?: boolean;
}
