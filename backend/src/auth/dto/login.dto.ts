import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({
		example: 'user@example.com',
		description: 'User email address',
	})
	@IsEmail({}, { message: 'Please provide a valid email address' })
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		example: 'Pass123!@#',
		description: 'User password',
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}
