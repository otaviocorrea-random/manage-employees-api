import { IsEmail, IsInt, IsString, Length} from "class-validator";

export class CreateEmployeeDTO{
  @IsString()
  @Length(1, 255)
  name: string;

  @IsInt()
  cpf: number;

  @IsEmail()
  email: number;

  @IsString()
  @Length(1, 255)
  address: string;

  companies: {id: string}[]
}
