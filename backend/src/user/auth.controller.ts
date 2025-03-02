import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../common/interfaces/request.interface';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly userService: AuthService) {}

	@ApiOperation({ summary: 'User login' })
	@ApiResponse({
		status: 200,
		description: 'Login successful',
		schema: {
			properties: {
				token: { type: 'string' },
			},
		},
	})
	@ApiResponse({
		status: 401,
		description: 'Invalid email or password',
	})
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.userService.login(loginDto);
	}

	@ApiOperation({ summary: 'Register new user' })
	@ApiResponse({
		status: 201,
		description: 'User successfully registered',
		schema: {
			properties: {
				message: { type: 'string' },
			},
		},
	})
	@ApiResponse({
		status: 401,
		description: 'Username already exists',
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request - Invalid input data',
	})
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return this.userService.register(registerDto);
	}

	@ApiOperation({ summary: 'Verify JWT token' })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: 'Token is valid',
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized',
	})
	@HttpCode(HttpStatus.OK)
	@Post('verify')
	@UseGuards(JwtAuthGuard)
	async verify(@Req() req: AuthenticatedRequest) {
		return req.user;
	}
}
