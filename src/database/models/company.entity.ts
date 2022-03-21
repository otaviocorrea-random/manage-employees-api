import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ type: 'bigint' , unique: true, nullable: false })
  cnpj: number

  @Column({ nullable: false })
  address: string
}
