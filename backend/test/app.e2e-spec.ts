import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(200);
	});
	it('/ (GET) Health', () => {
		return request(app.getHttpServer()).get('/health').expect(200);
	});

	it('should return 429 when limit is exceeded', async () => {
		const server = app.getHttpServer();

		// Make the maximum allowed number of requests
		for (let i = 0; i < 10; i++) {
			await request(server).get('/').expect(200);
		}

		// This request should fail with a 429 status
		return request(server).get('/').expect(429);
	});

	afterAll(async () => {
		await app.close();
	});
});
