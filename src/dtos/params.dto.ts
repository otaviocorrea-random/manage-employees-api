import { ApiExcludeController } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

@ApiExcludeController()
export class ParamsValidator {
  @IsUUID('4')
  @IsOptional()
  id?: string;
}
