import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCompaniesAndEmployeesTables1647995733476 implements MigrationInterface {
    name = 'AddCompaniesAndEmployeesTables1647995733476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at " TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0ac9216832e4dda06946c37cb73" UNIQUE ("cpf"), CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cnpj" character varying(14) NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at " TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_employees" ("company_id" uuid NOT NULL, "employee_id " uuid NOT NULL, CONSTRAINT "PK_4e0f06d30d583016be7c6a13a66" PRIMARY KEY ("company_id", "employee_id "))`);
        await queryRunner.query(`CREATE INDEX "IDX_9cf79b9e32a3722e698374b942" ON "companies_employees" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7f4731be4bfb3b7265db7073b1" ON "companies_employees" ("employee_id ") `);
        await queryRunner.query(`ALTER TABLE "companies_employees" ADD CONSTRAINT "FK_9cf79b9e32a3722e698374b9427" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_employees" ADD CONSTRAINT "FK_7f4731be4bfb3b7265db7073b1e" FOREIGN KEY ("employee_id ") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_employees" DROP CONSTRAINT "FK_7f4731be4bfb3b7265db7073b1e"`);
        await queryRunner.query(`ALTER TABLE "companies_employees" DROP CONSTRAINT "FK_9cf79b9e32a3722e698374b9427"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f4731be4bfb3b7265db7073b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cf79b9e32a3722e698374b942"`);
        await queryRunner.query(`DROP TABLE "companies_employees"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
