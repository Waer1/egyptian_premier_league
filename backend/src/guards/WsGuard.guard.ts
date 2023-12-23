import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private logger: Logger = new Logger(WsJwtGuard.name);

  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let client: Socket;
    try {
      client = context.switchToWs().getClient<Socket>();
      const authToken: string = client.handshake.headers.authorization;
      const user: any = await this.authService.validateToken(authToken);
      context.switchToHttp().getRequest().user = user;
      return Boolean(user);
    } catch (err) {
      throw new WsException('Invalid credentials.');
    }
  }
}
