import {
  OnGatewayConnection,
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
export class SocketGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    TradeManager.socket = client;
  }
  interval: any;
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connect')
  async handleStart(client: any, data: any) {
    console.log('connection');
  }

  @SubscribeMessage('stopHFT')
  handleStop(client: any, data: any) {
    TradeManager.stop();
  }
}
