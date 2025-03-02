import { Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
	private readonly logger: Logger = new Logger(ThrottlerBehindProxyGuard.name);

	constructor(options: ThrottlerModuleOptions, storageService: ThrottlerStorage, reflector: Reflector) {
		super(options, storageService, reflector);
	}

	protected getTracker = async (req: Record<string, any>): Promise<string> => {
		let ip = '';
		if (req.headers['x-forwarded-for']) {
			ip = req.headers['x-forwarded-for'].split(',')[0];
		} else {
			ip = req.ips.length ? req.ips[0] : req.ip;
		}
		this.logger.debug(`Extracted IP: ${ip}`);
		return ip;
	};
}
