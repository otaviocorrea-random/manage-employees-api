import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail,IsNumberString, IsOptional, IsString, Length} from "class-validator";

export class CreateEmployeeDTO{
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  name: string;

  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  cpf: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(1, 255)
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiPropertyOptional({example: [{id: "string"}]})
  companies?: {id: string}[]
}

export class UpdateEmployeeDTO{
  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsNumberString()
  @Length(11, 11)
  @IsOptional()
  @ApiPropertyOptional()
  cpf?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiPropertyOptional()
  address?: string;
}

