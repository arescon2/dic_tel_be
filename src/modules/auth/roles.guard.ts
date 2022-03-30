import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { AuthService } from './services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const DEVELOPER = user.roles.some((role: any) =>
      ['DEVELOP'].includes(role.name),
    );
    // доступы будем проверять из redis
    // console.log(request.path);

    if (DEVELOPER) {
      request.user.developer = true;
      return true;
    }

    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) return true;

      request.user = user;
      return user.roles.some((role: any) => requiredRoles.includes(role.name));
    } catch (error) {
      throw new HttpException(
        {
          message: 'Доступ запрещен',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
