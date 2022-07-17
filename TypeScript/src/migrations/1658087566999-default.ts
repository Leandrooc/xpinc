/* eslint-disable class-methods-use-this */ // Migration gerada automaticamente;
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class default1658087566999 implements MigrationInterface {
  name = 'default1658087566999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `assets_in_custody` ADD quantity INT NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `assets_in_custody` DROP COLUMN quantity`');
  }
}
