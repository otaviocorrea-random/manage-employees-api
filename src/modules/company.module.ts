import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Employee from "src/database/models/employee.entity";
import { CompanyController } from "../controllers/company.controller";
import { Company } from "../database/models/company.entity";
import { CompanyService } from "../services/company.service";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), TypeOrmModule.forFeature([Employee])],
  controllers: [CompanyController],
  providers: [CompanyService]
})

export class CompanyModule {}