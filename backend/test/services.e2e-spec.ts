import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { METHODS } from '../src/services/methods.enum';

describe('ServicesController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule,
				MongooseModule.forRootAsync({
					imports: [ConfigModule],
					useFactory: async (configService: ConfigService) => ({
						uri: configService.get<string>('MONGO_URL'),
					}),
					inject: [ConfigService],
				}),
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('should process input correctly', () => {
		const input = 'جملة';
		const method = METHODS.toOldArabic;
		return request(app.getHttpServer())
			.post('/services')
			.query({ method: method })
			.send({ input: input })
			.expect(HttpStatus.OK)
			.then((response) => {
				expect(response.text).toBeDefined();
				expect(response.text).toEqual('حمله');
			});
	});

	it('should handle missing method parameter', () => {
		return request(app.getHttpServer())
			.post('/services')
			.send({ input: 'test input' })
			.expect(HttpStatus.BAD_REQUEST)
			.then((response) => {
				expect(response.body.message).toContain('method should not be undefined');
			});
	});

	it('should handle missing input parameter', () => {
		return request(app.getHttpServer())
			.post('/services')
			.query({ method: 'translate' })
			.expect(HttpStatus.BAD_REQUEST)
			.then((response) => {
				expect(response.body.message).toContain('input should not be undefined');
			});
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await app.close();
	});
});
