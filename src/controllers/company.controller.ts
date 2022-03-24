import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  CompanyAddEmployeesDTO,
} from '../dtos/company.dto';
import { CompanyService } from '../services/company.service';

@Controller('/company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'List all companies' })
  public index(): any {
    return this.companyService.listAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'View data for a specific company' })
  public show(@Param('id') id: string): any {
    return this.companyService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new company' })
  public create(@Body() body: CreateCompanyDTO): any {
    return this.companyService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company data' })
  public update(@Param('id') id: string, @Body() body: UpdateCompanyDTO): any {
    return this.companyService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company data' })
  public delete(@Param('id') id: string): any {
    return this.companyService.delete(id);
  }

  @ApiTags('Company x Employee')
  @Post(':id/employee/add')
  @ApiOperation({ summary: 'Add employees to the company' })
  public addEmployee(
    @Param('id') id: string,
    @Body() body: CompanyAddEmployeesDTO,
  ): any {
    return this.companyService.addEmployees(id, body);
  }

  @Delete(':id/employee/remove')
  @ApiTags('Company x Employee')
  @ApiOperation({ summary: 'Remove employees to the company' })
  public removeEmployee(
    @Param('id') id: string,
    @Body() body: CompanyAddEmployeesDTO,
  ): any {
    return this.companyService.removeEmployees(id, body);
  }
}
