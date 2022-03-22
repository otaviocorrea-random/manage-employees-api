import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { CreateEmployeeDTO } from "../dtos/create-employee.dto";
import { UpdateEmployeeDTO } from "../dtos/update-employee.dto";
import { EmployeeService } from "../services/employee.service";

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  public index(): any {
    return this.employeeService.listAll();
  }

  @Get(':id')
  public show(@Param('id') id: string): any {
    return this.employeeService.getOne(id);
  }

  @Post()
  public create(@Body() body: CreateEmployeeDTO): any {
    return this.employeeService.create(body);
  }
  
  @Put(':id')
  public update(@Param('id') id:string, @Body() body: UpdateEmployeeDTO): any {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  public delete(@Param('id') id:string): any {
    return this.employeeService.delete(id);
  }
}