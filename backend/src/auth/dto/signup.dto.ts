import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1, // 大文字は不要
      minNumbers: 1,
      minSymbols: 1, // 記号は不要
    },
    {
      message:
        'Password must be at least 8 characters and include uppercase and lowercase letters, a number, and a symbol.',
    },
  )
  password: string;
}
