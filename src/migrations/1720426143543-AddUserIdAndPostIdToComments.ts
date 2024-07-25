import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdAndPostIdToComments1720426143543 implements MigrationInterface {
    name = 'AddUserIdAndPostIdToComments1720426143543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "likes" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "likes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "userId"`);
    }

}
