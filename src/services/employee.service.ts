import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../dtos/employee.dto';
import { Repository } from 'typeorm';
import { Employee } from '../database/entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private model: Repository<Employee>,
  ) {}

  async listAll(): Promise<{ data: Employee[] }> {
    const list = await this.model.find();
    return { data: list };
  }

  async getOne(id: string): Promise<{ data: Employee }> {
    const employee = await this.model.findOne({
      where: { id },
      relations: ['companies'],
    });
    if (!employee) throw new NotFoundException(`Employee not found`);
    return { data: employee };
  }

  async create(params: CreateEmployeeDTO): Promise<{ data: Employee }> {
    const { email, cpf } = params;
    const employeeExists = await this.model.findOne({
      where: [{ email }, { cpf }],
    });
    if (employeeExists)
      throw new ConflictException(
        'There is already an employee with the "name" or "cpf" provided',
      );
    const employee = await this.model.save(params);
    return { data: employee };
  }

  async update(
    id: string,
    params: UpdateEmployeeDTO,
  ): Promise<{ data: Employee }> {
    const employee = await this.model.findOne({ where: { id } });
    if (!employee) throw new NotFoundException(`Employee not found`);
    await this.model.update({ id }, params);
    return this.getOne(id);
  }

  async delete(id: string): Promise<{ data: string }> {
    const employee = await this.model.findOne({ where: { id } });
    if (!employee) throw new NotFoundException(`Employee not found`);
    await this.model.delete({ id });
    return { data: `${employee.name} successfully removed!!!` };
  }
}
