import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LoginInf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyVersion: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}
