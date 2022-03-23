import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString, Length } from "class-validator";

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
