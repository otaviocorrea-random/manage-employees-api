import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsString, Length, IsOptional, IsArray } from "class-validator";

export class CreateCompanyDTO{
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  name: string;

  @IsNumberString()
  @Length(14, 14)
  @ApiProperty()
  cnpj: string;

  @IsString()
  @Length(1, 255)
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiPropertyOptional({example: [{id: "string"}]})
  employees?: {id: string}[]
}

export class CompanyAddEmployeesDTO{
  @IsArray()
  @ApiProperty({example: [{id: "string"}]})
  employees: {id: string}[]
}

export class UpdateCompanyDTO{
  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsNumberString()
  @Length(14, 14)
  @IsOptional()
  @ApiPropertyOptional()
  cnpj?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;
}
