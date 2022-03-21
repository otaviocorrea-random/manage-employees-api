import { IsInt, IsString, Length } from "class-validator";

export class CreateCompanyDTO{
  @IsString()
  @Length(1, 255)
  name: string;

  @IsInt()
  cnpj: number;

  @IsString()
  @Length(1, 255)
  address: string;
}
