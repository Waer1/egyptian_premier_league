import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class FANGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== UserRole.FAN) {
      return false;
    }
    return true;
  }
}
