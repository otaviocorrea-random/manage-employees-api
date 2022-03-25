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
import { ParamsValidator } from '../dtos/params.dto';

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
  public show(@Param() params: ParamsValidator): any {
    return this.companyService.getOne(params);
  }

  @Post()
  @ApiOperation({ summary: 'Create new company' })
  public create(@Body() body: CreateCompanyDTO): any {
    return this.companyService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company data' })
  public update(
    @Param() params: ParamsValidator,
    @Body() body: UpdateCompanyDTO,
  ): any {
    return this.companyService.update(params, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company data' })
  public delete(@Param() params: ParamsValidator): any {
    return this.companyService.delete(params);
  }

  @Post(':id/employee/add')
  @ApiOperation({ summary: 'Add employees to the company' })
  public addEmployee(
    @Param() params: ParamsValidator,
    @Body() body: CompanyAddEmployeesDTO,
  ): any {
    return this.companyService.addEmployees(params, body);
  }

  @Delete(':id/employee/remove')
  @ApiOperation({ summary: 'Remove employees to the company' })
  public removeEmployee(
    @Param() params: ParamsValidator,
    @Body() body: CompanyAddEmployeesDTO,
  ): any {
    return this.companyService.removeEmployees(params, body);
  }
}
