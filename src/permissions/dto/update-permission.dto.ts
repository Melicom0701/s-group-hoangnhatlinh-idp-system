import { IsString, IsOptional, IsBoolean } from 'class-validator';
export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isEditable?: boolean;
}
