import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEmployeeDTO } from 'src/dtos/update-employee.dto';
import { Repository } from 'typeorm';
import { Employee } from '../database/models/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private model: Repository<Employee>){}

  async listAll(): Promise<{ data: Employee[] }> {
    let list = await this.model.find();
    return { data: list };
  }

  async getOne(id: string): Promise<{ data: Employee }> {
    let employee = await this.model.findOne({ where: { id }, relations: ['companies'] });
    if(!employee){console.log("entrou"); throw new NotFoundException(`Employee not found`);};
    return { data: employee } ;
  }

  async create(params): Promise<{ data: Employee }> {
    let employee = await this.model.save(params);    
    return { data: employee };
  }

  async update(id: string, params: UpdateEmployeeDTO): Promise<{ data: Employee }> {
    let employee = await this.model.findOne({ where: { id } });
    if(!employee){console.log("entrou"); throw new NotFoundException(`Employee not found`);};
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
    let employee = await this.model.findOne({ where: { id } });
    if(!employee){console.log("entrou"); throw new NotFoundException(`Employee not found`);};
    await this.model.delete({ id });
    return { data: `${employee.name} successfully removed!!!`}
  }
}