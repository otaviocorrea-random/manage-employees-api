import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../database/entities/company.entity';
import Employee from '../database/entities/employee.entity';
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  CompanyAddEmployeesDTO,
} from '../dtos/company.dto';
import { ParamsValidator } from '../dtos/params.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private model: Repository<Company>,

    @InjectRepository(Employee)
    private employee: Repository<Employee>,
  ) {}

  async listAll(): Promise<{ data: Company[] }> {
    const list = await this.model.find();
    return { data: list };
  }

  async getOne(params: ParamsValidator): Promise<{ data: Company }> {
    const { id } = params;
    const company = await this.model.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!company) throw new NotFoundException(`Company not found`);
    return { data: company };
  }

  async create(data: CreateCompanyDTO): Promise<{ data: Company }> {
    const { cnpj } = data;
    const companyExists = await this.model.findOne({ where: { cnpj } });
    if (companyExists)
      throw new ConflictException(
        'There is already an company with the "cnpj" provided',
      );
    const company = await this.model.save(data);
    return { data: company };
  }

  async update(
    params: ParamsValidator,
    data: UpdateCompanyDTO,
  ): Promise<{ data: Company }> {
    const { id } = params;
    const company = await this.model.findOne({ where: { id } });
    if (!company) throw new NotFoundException(`Company not found`);
    await this.model.update({ id }, data);
    return this.getOne({ id });
  }

  async delete(params: ParamsValidator): Promise<{ data: string }> {
    const { id } = params;
    const company = await this.model.findOne({ where: { id } });
    if (!company) throw new NotFoundException(`Company not found`);
    await this.model.delete({ id });
    return { data: `${company.name} successfully removed!!!` };
  }

  async addEmployees(
    params: ParamsValidator,
    { employees },
  ): Promise<{ message: string }> {
    const companyId = params.id;
    let employee = null;
    const company = await this.model.findOne({
      where: { id: companyId },
      relations: ['employees'],
    });
    if (!company) throw new NotFoundException(`Company not found`);

    await employees.forEach(async (emp: { id: string }) => {
      employee = await this.employee.findOne({ where: { id: emp.id } });
      if (employee) company.employees = [...company.employees, employee];
    });

    await this.model.save(company);

    return { message: 'Employees added successfully!!!' };
  }

  async removeEmployees(
    params: ParamsValidator,
    { employees }: CompanyAddEmployeesDTO,
  ): Promise<{ message: string }> {
    const companyId = params.id;
    const company = await this.model.findOne({
      where: { id: companyId },
      relations: ['employees'],
    });
    if (!company) throw new NotFoundException(`Company not found`);
    const employeesToRemove: string[] = employees.map(
      (e: { id: string }) => e.id,
    );
    company.employees = company.employees.filter(
      (e) => !employeesToRemove.includes(e.id),
    );
    await this.model.save(company);
    return { message: 'Employees removed successfully!!!' };
  }
}
