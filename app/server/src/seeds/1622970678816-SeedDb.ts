import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1622970678816 implements MigrationInterface {
  name = 'SeedDb1622970678816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    // password pass123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('marley', 'marley@example.com', '$2b$10$XmahzW3bLyboKuzGjLoO1ef1JKkqVoJvJkKd66/i6SP5q.kWNHcZG')`,
    );

    // password pass123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('webmakaka', 'webmakaka@example.com', '$2b$10$UdOxrsa7pgr8GvdeMJBnseJjnAYk20k0RqQGelSHe.mjY35mxnGcO')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description,body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee, dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description,body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 'coffee, dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
