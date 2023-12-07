import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ReservationService } from './reservation.service';
import {
  OnModuleDestroy,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JoinReservationDto } from './dto/join-reservation.dto';
import { WsJwtGuard } from 'src/guards/WsGuard.guard';
import { MatchsService } from '../matchs/matchs.service';
import { Socket } from 'socket.io';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { WSValidationPipe } from 'src/pipes/WSValidation.pipe';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { Reservation } from 'src/entities/reservation.entity';

// @UseFilters(new WebsocketExceptionsFilter())
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UsePipes(new WSValidationPipe())
export class ReservationGateway implements OnModuleDestroy {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly reservationService: ReservationService,
    private readonly matchsService: MatchsService,
  ) {}

  onModuleDestroy() {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  async join(
    @ConnectedSocket() client: Socket,
    @MessageBody() joinReservationDto: JoinReservationDto,
  ) {
    const matchExists = await this.matchsService.doesMatchExist(
      joinReservationDto.matchId,
    );
    if (!matchExists) {
      throw new WsException('match does not exist');
    }
    client.join(joinReservationDto.matchId.toString());
    client.emit(
      'message',
      `You have joined match ${joinReservationDto.matchId}`,
    );
  }

  @SubscribeMessage('out')
  async out(
    @ConnectedSocket() client: Socket,
    @MessageBody() outReservationDto: JoinReservationDto,
  ) {
    const matchExists = await this.matchsService.doesMatchExist(
      outReservationDto.matchId,
    );
    if (!matchExists) {
      throw new WsException('match does not exist');
    }

    client.leave(outReservationDto.matchId.toString());
    client.emit(
      'message',
      `You have Leadved match ${outReservationDto.matchId}`,
    );
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('reserve')
  async reserve(
    @ConnectedSocket() client: Socket,
    @MessageBody() createReservationDto: CreateReservationDto,
    @Request() req,
  ) {
    const { matchId } = createReservationDto;
    const { rooms } = client;

    if (!rooms.has(matchId.toString())) {
      throw new WsException(`You have not joined match ${matchId}`);
    }

    try {
      const reservation = await this.reservationService.create(
        createReservationDto,
        req.user.id,
      );

      this.server.to(matchId.toString()).emit('reserve', reservation);
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('cancel')
  async cancel(
    @ConnectedSocket() client: Socket,
    @MessageBody() cancelReservation: CancelReservationDto,
    @Request() req,
  ) {
    try {
      const { reservationId } = cancelReservation;
      const reservation: Reservation =
        await this.reservationService.findOne(reservationId);

      console.log(reservation);

      const { id, match } = reservation;
      const { rooms } = client;

      const Removedreservation = await this.reservationService.remove(
        reservationId,
        req.user.id,
      );

      this.server.to(match.id.toString()).emit('cancel', Removedreservation);
    } catch (e) {
      throw new WsException(e.message);
    }
  }
}
