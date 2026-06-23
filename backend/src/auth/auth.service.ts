import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/generated/prisma/client';

export type AuthUser = {
  id: number;
  email: string;
  name: string | null;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthUser | null> {
    const user = await this.userService.findUserByUsername(username);

    if (user && (await this.matchPassword(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async matchPassword(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
  }

  async signup(signupDto: SignupDto): Promise<User> {
    const { email, password } = signupDto;
    const hashedPassword = await this.generateHashedPassword(password);

    return await this.userService.createUser(email, hashedPassword);
  }

  async generateHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.email };
    const jwt = await this.jwtService.signAsync(payload);

    return jwt;
  }
}
