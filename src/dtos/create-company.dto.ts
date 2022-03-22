import { IsNumberString, IsString, Length, IsOptional } from "class-validator";

export class CreateCompanyDTO{
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNumberString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @Length(1, 255)
  address: string;

  @IsOptional()
  employees?: {id: string}[]
}
