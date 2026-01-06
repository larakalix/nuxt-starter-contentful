import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<AuthUser>(err: Error, user: AuthUser, info: unknown): AuthUser {
    if (err || !user) {
      console.error('❌ JWT Guard Error:', {
        error: err,
        info,
        message: 'Unauthorized access',
      });
      throw err || new UnauthorizedException('Invalid or expired token');
    }

    return user; // this gets injected into @User() decorator
  }
}
