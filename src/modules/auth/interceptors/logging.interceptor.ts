import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const timeoutRequest = `${Date.now() - now} ms`;
        switch (request.method) {
          case 'GET':
            console.log(request.path, request.method, timeoutRequest);
            break;
          case 'POST':
            console.log(request.path, request.method, timeoutRequest);
            break;
          default:
            console.log(request.path, request.method, timeoutRequest);
            break;
        }
      }),
    );
  }
}
