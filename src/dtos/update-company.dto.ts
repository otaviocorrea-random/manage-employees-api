import { IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class UpdateCompanyDTO{
  @IsString()
  @Length(1, 255)
  @IsOptional()
  name?: string;

  @IsNumberString()
  @Length(14, 14)
  @IsOptional()
  cnpj?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  address?: string;
}
