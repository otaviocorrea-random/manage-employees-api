import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../dtos/employee.dto';
import { Repository } from 'typeorm';
import { Employee } from '../database/entities/employee.entity';
import { ParamsValidator } from '../dtos/params.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private model: Repository<Employee>,
  ) {}

  async listAll(): Promise<{ data: Employee[] }> {
    const list = await this.model.find();
    return { data: list };
  }

  async getOne(params: ParamsValidator): Promise<{ data: Employee }> {
    const { id } = params;
    const employee = await this.model.findOne({
      where: { id },
      relations: ['companies'],
    });
    if (!employee) throw new NotFoundException(`Employee not found`);
    return { data: employee };
  }

  async create(data: CreateEmployeeDTO): Promise<{ data: Employee }> {
    const { email, cpf } = data;
    const employeeExists = await this.model.findOne({
      where: [{ email }, { cpf }],
    });
    if (employeeExists)
      throw new ConflictException(
        'There is already an employee with the "name" or "cpf" provided',
      );
    const employee = await this.model.save(data);
    return { data: employee };
  }

  async update(
    params: ParamsValidator,
    data: UpdateEmployeeDTO,
  ): Promise<{ data: Employee }> {
    const { id } = params;
    const employee = await this.model.findOne({ where: { id } });
    if (!employee) throw new NotFoundException(`Employee not found`);
    await this.model.update({ id }, data);
    return this.getOne({ id });
  }

  async delete(params: ParamsValidator): Promise<{ data: string }> {
    const { id } = params;
    const employee = await this.model.findOne({ where: { id } });
    if (!employee) throw new NotFoundException(`Employee not found`);
    await this.model.delete({ id });
    return { data: `${employee.name} successfully removed!!!` };
  }
}
