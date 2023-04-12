import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { TradeManager } from '../core/TradeManager';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  interval: any;
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startHFT')
  async handleStart(client: any, data: any) {
    await TradeManager.createHFt(client);
    TradeManager.tickStrategy();
    this.interval = setInterval(() => {
      TradeManager.tickStrategy();
      client.emit('strategy', TradeManager.strategy);
    }, 1000);
  }

  @SubscribeMessage('stopHFT')
  handleStop(client: any, data: any) {
    TradeManager.stopTick();
    clearInterval(this.interval);
  }
}
