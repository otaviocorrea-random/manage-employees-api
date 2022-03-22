import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Employee } from "./employee.entity";

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at '})
  updatedAt: string

  @ManyToMany(() => Employee, (employee: Employee) => employee.companies)
  @JoinTable({name: 'companies_employees', joinColumn: { name: 'company_id' }, inverseJoinColumn: { name: 'employee_id '}})
  employees: Employee[];
}

export default Company;
