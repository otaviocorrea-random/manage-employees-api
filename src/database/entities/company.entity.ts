import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Employee } from "./employee.entity";

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ length: 14, unique: true, nullable: false })
  cnpj: string

  @Column({ nullable: false })
  address: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at '})
  updatedAt: string

  @ManyToMany(() => Employee, (employee: Employee) => employee.companies)
  @JoinTable({ name: 'companies_employees', joinColumn: { name: 'company_id' }, inverseJoinColumn: { name: 'employee_id '} })
  employees: Employee[];

  constructor(company?: Partial<Company>){
    this.id = company?.id;
    this.name = company?.name;
    this.cnpj = company?.cnpj;
    this.createdAt = company?.createdAt;
    this.updatedAt = company?.updatedAt;
    this.employees = company?.employees;
  }
}

export default Company;
