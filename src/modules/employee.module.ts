import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeController } from "../controllers/employee.controller";
import { Employee } from "../database/entities/employee.entity";
import { EmployeeService } from "../services/employee.service";

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})

export class EmployeeModule {}