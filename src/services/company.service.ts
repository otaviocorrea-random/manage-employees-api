import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/database/models/company.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private model: Repository<Company>){}

  async listAll(): Promise<{ data: Company[] }> {
    let list = await this.model.find();
    return { data: list };
  }

  async getOne(id: string): Promise<{ data: Company }> {
    let company = await this.model.findOne({ where: { id } });
    if(!company){console.log("entrou"); throw new NotFoundException(`Company not found`);};
    return { data: company } ;
  }

  async create(params): Promise<{ data: Company }> {
    let company = await this.model.save(params);    
    return { data: company };
  }

  async update(id: string, params: object): Promise<{ data: Company }> {
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
}
