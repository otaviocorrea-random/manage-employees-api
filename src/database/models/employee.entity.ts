import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm";

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({type: 'bigint' , width: 11, unique: true, nullable: false})
  cpf: number

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  address: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at '})
  updatedAt: string
}