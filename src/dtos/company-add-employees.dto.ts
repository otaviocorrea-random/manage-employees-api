import { IsArray } from "class-validator";

export class CompanyAddEmployeesDTO{
  @IsArray()
  employees: {id: string}[]
}
