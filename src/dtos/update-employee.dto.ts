import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail,IsNumberString, IsOptional, IsString, Length} from "class-validator";

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
