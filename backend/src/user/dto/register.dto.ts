import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
	@ApiProperty({
		example: 'user@example.com',
		description: 'User email address',
	})
	@IsEmail({}, { message: 'Please provide a valid email address' })
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		example: 'John Doe',
		description: 'User full name',
		minimum: 3,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	name: string;

	@ApiProperty({
		example: 'Pass123!@#',
		description: 'User password - must contain at least one letter, one number, and one special character',
		minimum: 8,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
		message: 'Password must contain at least one letter, one number, and one special character',
	})
	password: string;
}
