import { Bank } from './Bank';
import { Stock } from './Stock';
import { tickers } from './tickers';

export class HFT {
  stocks = [];
  soldStocks = [];
  bank = new Bank();
  hftInterval: any;
  interval: number = 1000;

  async init(wb) {
    console.log('HFT initialized');
    // this.stocks.push(new Stock('amc', wb));
    for (const ticker of tickers) {
      const stock = new Stock(ticker);
      this.stocks.push(stock);
    }
    console.log('Created stocks for ' + this.stocks.length + ' tickers');
  }

  tick(wb) {
    this.stocks.forEach((stock) => {
      stock.tick(wb, this.bank);

      if (stock.isSold) {
        this.bank.add(stock);
        stock.reset();
      }
    });
  }

  start(wb) {
    this.hftInterval = setInterval(() => {
      this.tick(wb);
    }, this.interval);
  }

  stop() {
    clearInterval(this.hftInterval);
  }
}
