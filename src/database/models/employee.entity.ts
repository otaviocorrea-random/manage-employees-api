import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}