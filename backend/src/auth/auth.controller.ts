import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  REFRESH_JWT_EXPIRES_IN,
  REFRESH_JWT_SECRET,
} from './constants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    console.log('signin');

    const accessToken = await this.authService.generateJwt(req.user, {
      secret: JWT_SECRET,
      expireIn: JWT_EXPIRES_IN,
    });
    const refreshToken = await this.authService.generateJwt(req.user, {
      secret: REFRESH_JWT_SECRET,
      expireIn: REFRESH_JWT_EXPIRES_IN,
    });

    // Set JWT on Cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    res.cookie('refresh_access_token', refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return { accessToken, refreshToken };
  }

  @Post('signup')
  async signUp(@Body() signupDto: SignupDto): Promise<void> {
    console.log('signup');
    const { email } = signupDto;
    const user = await this.userService.findUserByUsername(email);

    if (user)
      throw new ConflictException('This email address is already registered.');

    await this.authService.signup(signupDto);

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access

    // Regenerate
    return req.user;
  }
}
