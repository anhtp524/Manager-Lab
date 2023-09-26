import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1695723939996 implements MigrationInterface {
    name = 'NewMigration1695723939996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "test1"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "test2"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "test3"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "test3" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "test2" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "test1" character varying NOT NULL`);
    }

}
