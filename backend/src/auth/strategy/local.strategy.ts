// Guard runs before pipes
// So Class Validation will not run

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('validate');
    console.log(username);
    console.log(password);

    const user = await this.authService.validateUser(username, password);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Please check credential');
    }
    return user;
  }
}
