import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsString, Length, IsOptional } from "class-validator";

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
