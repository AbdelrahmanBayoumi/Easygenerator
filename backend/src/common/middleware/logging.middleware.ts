import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	private readonly logger = new Logger('RequestLogger');

	use(req: Request, res: Response, next: NextFunction): void {
		const { method, originalUrl } = req;

		const start = Date.now();

		res.on('finish', () => {
			const duration = Date.now() - start;
			let ip = '';
			if (req.headers['x-forwarded-for']) {
				ip = (req.headers['x-forwarded-for'] as string).split(',')[0];
			} else {
				ip = req.ips.length ? req.ips[0] : req.ip;
			}
			this.logger.log(`${ip} - ${method} ${originalUrl} ${res.statusCode} ${duration}ms`);
		});

		next();
	}
}
