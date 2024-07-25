import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1701381416135 implements MigrationInterface {
    name = 'CreateUserTable1701381416135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" 
        ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, 
        "email" character varying NOT NULL, 
        "handle" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
