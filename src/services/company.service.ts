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
    if(!company){console.log("entrou"); throw new NotFoundException(`Company not found`);};
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

  // async update(id: string, { companies, ...params }): Promise<{ data: Employee }> {
  //   let newEmployee = this.model.create(params);
  //   newEmployee.companies = companies.map((id) => ({ id } as Company));
  //   newEmployee.id = id;
   
  //   let employee = await this.model.save(newEmployee)

  //   return { data: employee };
  // }

  async delete(id: string): Promise<{ data: string }>{
    let company = await this.model.findOne({ where: { id } });
    if(!company){console.log("entrou"); throw new NotFoundException(`Company not found`);};
    await this.model.delete({ id });
    return { data: `${company.name} successfully removed!!!`}
  }

  async addEmployee(companyId:string, employeeId:string): Promise<{ message: string }>{
    let company = await this.model.findOne({ where: { id: companyId }, relations: ['employees'] });
    let employee = await this.employee.findOne({ where: { id: employeeId }})
    company.employees = [...company.employees, employee]
    console.log(company.employees)
    this.model.save(company)
    
    return { message: "ok"}
  }
}
