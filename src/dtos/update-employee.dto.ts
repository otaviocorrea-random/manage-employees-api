import { IsEmail,IsNumberString, IsOptional, IsString, Length} from "class-validator";

export class UpdateEmployeeDTO{
  @IsString()
  @Length(1, 255)
  @IsOptional()
  name?: string;

  @IsNumberString()
  @Length(11, 11)
  @IsOptional()
  cpf?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  address?: string;
}
