import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { CreateCompanyDTO } from "../dtos/create-company.dto";
import { CompanyService } from "../services/company.service";

@Controller('/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  public index(): any {
    return this.companyService.listAll();
  }

  @Get(':id')
  public show(@Param('id') id: string): any {
    return this.companyService.getOne(id);
  }

  @Post()
  public create(@Body() body: CreateCompanyDTO): any {
    return this.companyService.create(body);
  }
  
  @Put(':id')
  public update(@Param('id') id:string, @Body() body: CreateCompanyDTO): any {
    return this.companyService.update(id, body);
  }

  @Delete(':id')
  public delete(@Param('id') id:string): any {
    return this.companyService.delete(id);
  }
}