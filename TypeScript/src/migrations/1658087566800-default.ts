/* eslint-disable class-methods-use-this */ // Migration gerada automaticamente;
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class default1658087566800 implements MigrationInterface {
  name = 'default1658087566800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `clients` (`id` int NOT NULL AUTO_INCREMENT, `name` text NOT NULL, `email` text NOT NULL, `balance` decimal(20, 6) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `assets` (`id` int NOT NULL AUTO_INCREMENT, `name` text NOT NULL, `quantity` int NOT NULL, `value` decimal(20, 6) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `assets_in_custody` (`client_id` int NOT NULL, `asset_id` int NOT NULL, INDEX `IDX_8d1b5f3fb1605d79a8eb7a2b24` (`client_id`), INDEX `IDX_abf59a8b080b8b2a9c1f5f7911` (`asset_id`), PRIMARY KEY (`client_id`, `asset_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `assets_in_custody` ADD CONSTRAINT `FK_8d1b5f3fb1605d79a8eb7a2b247` FOREIGN KEY (`client_id`) REFERENCES `assets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE');
    await queryRunner.query('ALTER TABLE `assets_in_custody` ADD CONSTRAINT `FK_abf59a8b080b8b2a9c1f5f79118` FOREIGN KEY (`asset_id`) REFERENCES `clients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `assets_in_custody` DROP FOREIGN KEY `FK_abf59a8b080b8b2a9c1f5f79118`');
    await queryRunner.query('ALTER TABLE `assets_in_custody` DROP FOREIGN KEY `FK_8d1b5f3fb1605d79a8eb7a2b247`');
    await queryRunner.query('DROP INDEX `IDX_abf59a8b080b8b2a9c1f5f7911` ON `assets_in_custody`');
    await queryRunner.query('DROP INDEX `IDX_8d1b5f3fb1605d79a8eb7a2b24` ON `assets_in_custody`');
    await queryRunner.query('DROP TABLE `assets_in_custody`');
    await queryRunner.query('DROP TABLE `assets`');
    await queryRunner.query('DROP TABLE `clients`');
  }
}
