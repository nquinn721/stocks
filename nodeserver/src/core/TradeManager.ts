import { HFT } from './HFT';
import { WebullBot } from './WebullBot';

export class TradeManager {
  static hftInterval: any;
  static strategy: any;
  static webull: any;

  static createHFt() {
    const wb = new WebullBot();
    const hft = new HFT(wb);
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
