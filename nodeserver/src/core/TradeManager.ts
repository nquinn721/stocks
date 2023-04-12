import { HFT } from './HFT';
import { WebullBot } from './WebullBot';

export class TradeManager {
  static hftInterval: any;
  static strategy: any;
  static webull: any;

  static async createHFt(socket) {
    socket.emit('start', 'Starting HFT');
    const wb = new WebullBot();
    const hft = new HFT();
    await hft.init(wb);
    socket.emit('start', 'HFT initialized');
    this.strategy = hft;
    this.webull = wb;
  }
  static tickStrategy() {
    if (!this.strategy) return;
    this.strategy.tick(this.webull);
  }

  static stopTick() {
    this.strategy = null;
    this.webull = null;
  }
}
