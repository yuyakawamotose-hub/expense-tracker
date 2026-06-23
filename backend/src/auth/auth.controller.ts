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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  // @UseGuards(LocalAuthGuard)
  async signin(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    console.log('signin');
    const { email, password } = signupDto;
    const user = await this.userService.findUserByUsername(email);

    if (!user) throw new UnauthorizedException('Please check credential');

    const matchPassword = await this.authService.matchPassword(
      password,
      user.password,
    );

    if (!matchPassword)
      throw new UnauthorizedException('Please check credential');
    console.log('token');

    const accessToken = await this.authService.generateJwt(user);

    console.log('jwt');
    console.log(accessToken);

    // Set JWT on Cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return 'Login Successfully';
  }

  @Post('signup')
  async signUp(@Body() signupDto: SignupDto): Promise<void> {
    const { email } = signupDto;
    const user = await this.userService.findUserByUsername(email);

    if (user)
      throw new ConflictException('This email address is already registered.');

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    // const user = req.user as {
    //   userId: number;
    //   username: string;
    // };

    // console.log(req);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }
}
