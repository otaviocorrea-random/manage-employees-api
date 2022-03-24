import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "../database/entities/company.entity";
import { CompanyController } from "../controllers/company.controller";
import { CompanyService } from "../services/company.service";
import { Employee } from "../database/entities/employee.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([Employee])],
  controllers: [CompanyController],
  providers: [CompanyService]
})

export class CompanyModule {}