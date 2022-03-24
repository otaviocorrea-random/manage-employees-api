import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Company } from './company.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ length: 11, unique: true, nullable: false})
  cpf: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  address: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at '})
  updatedAt: string

  @ManyToMany(() => Company, (company: Company) => company.employees, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  companies: Company[];

  constructor(employee?: Partial<Employee>) {
    this.id = employee?.id;
    this.name = employee?.name;
    this.cpf = employee?.cpf;
    this.email = employee?.email;
    this.createdAt = employee?.createdAt;
    this.updatedAt = employee?.updatedAt;
    this.companies = employee?.companies;
  }
}

export default Employee;