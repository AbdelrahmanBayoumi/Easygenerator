import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		private readonly jwtService: JwtService
	) {}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = await this.userModel.findOne({ email }).exec();
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException('Invalid email or password');
		}
		const payload = { email: user.email, id: user._id, name: user.name };
		return { token: this.jwtService.sign(payload) };
	}

	async register(registerDto: RegisterDto) {
		const hashedPassword = await bcrypt.hash(registerDto.password, 10);
		const user = new this.userModel({ ...registerDto, password: hashedPassword });
		try {
			console.log('user', user);
			await user.save();
		} catch (error) {
			console.log('error', error);

			if (error.code === 11000) {
				throw new UnauthorizedException('Emails already exists');
			}
			throw error;
		}
		return { message: 'User registered successfully' };
	}
}
