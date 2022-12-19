import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/ (GET)', () => {
    it('should return 200 when called without parameters', () => {
      return request(app.getHttpServer()).get('/').expect(200);
    });

    it('should return the correct MIME-type', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect('Content-Type', 'image/png');
    });
  });
});
