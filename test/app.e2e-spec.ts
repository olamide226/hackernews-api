/* eslint-disable prettier/prettier */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { NewsModuleModule } from './../src/news-module/news-module.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [NewsModuleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/news/from-last-25-stories')
      .expect(200);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/news/from-last-600-stories')
      .expect(200);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
    .get('/news/from-last-week')
    .expect(200);
  });
});
