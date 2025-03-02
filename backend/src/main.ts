import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AddressInfo } from 'net';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

function setupSwagger(app: NestExpressApplication) {
	const swaggerOptions = new DocumentBuilder()
		.setTitle('Easygenerator API')
		.setDescription('REST API for Easygenerator App')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
	const app: NestExpressApplication = await NestFactory.create(AppModule);

	app.use(helmet());
	app.enableCors();

	// Initialize Error Handler
	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalPipes(new ValidationPipe());

	setupSwagger(app);

	const PORT = process.env.PORT || 4000;
	await app.listen(PORT);

	// Log current url of app
	let baseUrl = (app.getHttpServer().address() as AddressInfo).address;
	if (baseUrl === '0.0.0.0' || baseUrl === '::') {
		baseUrl = 'localhost';
	}
	const logger = new Logger('Main');
	logger.log(`Listening to http://${baseUrl}:${PORT}`);
	logger.log(`Swagger UI: http://${baseUrl}:${PORT}/docs`);
}

bootstrap();
