import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class CompanyAddEmployeesDTO{
  @IsArray()
  @ApiProperty({example: [{id: "string"}]})
  employees: {id: string}[]
}
