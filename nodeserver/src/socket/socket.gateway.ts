import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { TradeManager } from '../core/TradeManager';

TradeManager.createHFt();
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: any) {
    TradeManager.socket = null;
  }
  handleConnection(client: any, ...args: any[]) {
    TradeManager.socket = client;
  }
  interval: any;
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('stopHFT')
  handleStop(client: any, data: any) {
    TradeManager.stop();
  }
}
