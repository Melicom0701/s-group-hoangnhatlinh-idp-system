import { Body, Controller, Patch, Param, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  async getRoles() {
    return this.rolesService.findAll();
  }

  @Patch(':id/permissions')
  async updatePermissions(
    @Body('permissionIds') permissions: string[],
    @Param('id') id: number,
  ) {
    return this.rolesService.updatePermissions(id, permissions);
  }
}
