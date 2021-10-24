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
      .get('/from-last-25-stories')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.this.status(200);
        res.body.should.be.a('object');
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/from-last-600-stories')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.this.status(200);
        res.body.should.be.a('object');
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/from-last-week-stories')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.this.status(200);
        res.body.should.be.a('object');
      });
  });
});
