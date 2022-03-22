import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { CompanyAddEmployeesDTO } from "../dtos/company-add-employees.dto";
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

  @Post(':id/employee/add')
  public addEmployee(@Param('id') id:string, @Body() body: CompanyAddEmployeesDTO): any {
    return this.companyService.addEmployees(id, body)
  }

  @Delete(':id/employee/remove')
  public removeEmployee(@Param('id') id:string, @Body() body: CompanyAddEmployeesDTO): any {
    return this.companyService.removeEmployees(id, body)
  }
}