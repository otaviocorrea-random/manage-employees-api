import { IsEmail,IsNumberString, IsOptional, IsString, Length} from "class-validator";

export class CreateEmployeeDTO{
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNumberString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 255)
  address: string;

  @IsOptional()
  companies?: {id: string}[]
}