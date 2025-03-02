import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

		if (process.env.NODE_ENV !== 'production') {
			console.error(exception);
		}
		this.logger.error(`Http Status: ${status} Error Message: ${JSON.stringify(message)}`);

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			error: typeof message === 'string' ? message : message['message'],
		});
	}
}
