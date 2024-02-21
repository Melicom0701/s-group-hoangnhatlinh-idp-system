import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
