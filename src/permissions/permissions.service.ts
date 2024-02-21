import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(name: string, description?: string): Promise<Permission> {
    const permission = this.permissionsRepository.create({ name, description });
    return await this.permissionsRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionsRepository.find();
  }
}
