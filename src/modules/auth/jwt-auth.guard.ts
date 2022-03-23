import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { Authentication, Refresh } = request.cookies;

    try {
      if (!Authentication) {
        throw new UnauthorizedException({
          message: 'Вы не авторизованы',
        });
      }
      const user = this.jwtService.verify(Authentication);
      request.user = user;
      return true;
    } catch (error) {
      // проверяем refresh
      try {
        if (!Refresh) {
          throw new UnauthorizedException({
            message: 'Вы не авторизованы',
          });
        }
        const tokenUser = await this.jwtService.verify(Refresh);
        const user = await this.authService.getAccauntIsLogin(tokenUser.login);
        const token = await this.authService.genJWT(user);
        const authCookies = await this.authService.getCookieWithJwtToken(token);

        request.user = user;

        response.setHeader('Set-Cookie', [
          authCookies.access_cookie,
          authCookies.refresh_cookie,
        ]);

        return true;
      } catch (error) {
        throw new UnauthorizedException({
          message: 'Вы не авторизованы',
        });
      }
    }
  }
}
