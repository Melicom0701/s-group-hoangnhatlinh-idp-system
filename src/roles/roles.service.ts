// src/roles/roles.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from 'src/permissions/permission.entity';

@Injectable()
export class RolesService {
  permissionRepository: any;
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
  async updatePermissions(id: number, permissionIds: string[]) {
    const role = await this.findOne(id);
    if (!role) {
      throw new Error('Role not found');
    }
    for (const permissionId of permissionIds) {
      const permission = await this.permissionRepository.findOne(permissionId);
      this.assignPermission(role, permission);
    }
    return;
  }
  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id } });
  }
  async assignPermission(role: Role, permission: Permission) {
    role.permissions.push(permission);
    return this.roleRepository.save(role);
  }
  async removePermission(role: Role, permission: Permission) {
    role.permissions = role.permissions.filter((p) => p.id !== permission.id);
    return this.roleRepository.save(role);
  }
}
