import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInf } from './loginInf.entity';

@Injectable()
export class LoginInfService {
  constructor(
    @InjectRepository(LoginInf)
    private loginInfRepository: Repository<LoginInf>,
  ) {}

  async create(keyVersion: string): Promise<LoginInf> {
    const permission = this.loginInfRepository.create({ keyVersion });
    return await this.loginInfRepository.save(permission);
  }
  async update(id: string) {
    const loginInf = await this.loginInfRepository.findOne({
      where: { id: parseInt(id) },
    });
    loginInf.keyVersion = new Date().getTime().toString();
    this.loginInfRepository.save(loginInf);
  }
  async getInf(id: string): Promise<LoginInf> {
    const loginInf = this.loginInfRepository.findOne({
      where: { id: parseInt(id) },
    });

    return loginInf;
  }
}
