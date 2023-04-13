import { HFT } from './HFT';
import { WebullBot } from './WebullBot';

export class TradeManager {
  static hftInterval: any;
  static strategy: any;
  static webull: any;
  static interval: number = 1000;
  static socket: any;

  static createHFt() {
    this.socket?.emit('start', 'Starting HFT');
    const wb = new WebullBot();
    const hft = new HFT(wb);
    this.socket?.emit('start', 'HFT initialized');
    this.strategy = hft;
    this.webull = wb;
    this.start();
  }
  static start() {
    this.hftInterval = setInterval(() => {
      if (this.isMarketHours()) {
        this.socket?.emit('strategy', this.strategy);
        this.strategy.tick(this.webull);
      }
      this.socket?.emit('marketClosed', !this.isMarketHours());
    }, this.interval);
  }
  static stop() {
    this.strategy = null;
    this.webull = null;
    clearInterval(this.hftInterval);
  }

  static isMarketHours() {
    const d = new Date(); // current time
    const hours = d.getHours();

    return hours >= 9 && hours < 17;
  }
}
