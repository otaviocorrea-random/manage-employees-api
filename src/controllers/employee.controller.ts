import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../dtos/employee.dto";
import { EmployeeService } from "../services/employee.service";

@Controller('/employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({summary: 'List all employees'})
  public index(): any {
    return this.employeeService.listAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'View data for a specific employee'})
  public show(@Param('id') id: string): any {
    return this.employeeService.getOne(id);
  }

  @Post()
  @ApiOperation({summary: 'Create new employee'})
  public create(@Body() body: CreateEmployeeDTO): any {
    return this.employeeService.create(body);
  }
  
  @Put(':id')
  @ApiOperation({summary: 'Update employee data'})
  public update(@Param('id') id:string, @Body() body: UpdateEmployeeDTO): any {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete employee data'})
  public delete(@Param('id') id:string): any {
    return this.employeeService.delete(id);
  }
}