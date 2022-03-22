import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../database/models/company.entity';
import Employee from '../database/models/employee.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private model: Repository<Company>,

    @InjectRepository(Employee)
    private employee: Repository<Employee>
  ){}

  async listAll(): Promise<{ data: Company[] }> {
    let list = await this.model.find();
    return { data: list };
  }

  async getOne(id: string): Promise<{ data: Company }> {
    let company = await this.model.findOne({ where: { id }, relations: ['employees'] });
    if(!company){throw new NotFoundException(`Company not found`);};
    return { data: company } ;
  }

  async create(params): Promise<{ data: Company }> {
    let company = await this.model.save(params);    
    return { data: company };
  }

  async update(id: string, params: object): Promise<{ data: Company }> {
    console.log(params)
    let company = await this.model.findOne({ where: { id } });
    if(!company){console.log("entrou"); throw new NotFoundException(`Company not found`);};
    await this.model.update({ id }, params);
    return this.getOne(id);
  }

  async delete(id: string): Promise<{ data: string }>{
    let company = await this.model.findOne({ where: { id } });
    if(!company){console.log("entrou"); throw new NotFoundException(`Company not found`);};
    await this.model.delete({ id });
    return { data: `${company.name} successfully removed!!!`}
  }

  async addEmployees(companyId:string, { employees, ...params }): Promise<{ message: string }>{
    console.log(employees)
    let employee = null;
    let company = await this.model.findOne({ where: { id: companyId }, relations: ['employees'] });

    employees.forEach(async (emp:{id:string}) => {
      employee = await this.employee.findOne({ where: { id: emp.id }})
      if(employee) company.employees = [...company.employees, employee]
    });
   
    this.model.save(company)
    
    return { message: "Employees added successfully!!!"}
  }

  async removeEmployees(companyId:string, { employees, ...params }): Promise<{ message: string }>{
    let company = await this.model.findOne({ where: { id: companyId }, relations: ['employees'] });

    employees.forEach(async (employee:{id:string}) => {
      company.employees = company.employees.filter( e => {return e.id != employee.id })
    });
   
    this.model.save(company)
    
    return { message: "Employees removed successfully!!!"}
  }
}