import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/entities/user.entity';

@Injectable()
export class SITE_ADMINGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    if (user.role !== UserRole.SITE_ADMIN) {
      return false;
    }
    return true;
  }
}
