import { Bank } from './Bank';
import { Stock } from './Stock';
import { tickers } from './tickers';

export class HFT {
  stocks = [];
  soldStocks = [];
  bank = new Bank();
  hftInterval: any;
  interval: number = 1000;

  constructor(wb) {
    console.log('HFT initialized');
    // this.stocks.push(new Stock('amc', wb));
    tickers.forEach((ticker) => this.stocks.push(new Stock(ticker, wb)));
    console.log('Created stocks for ' + this.stocks.length + ' tickers');
  }

  tick(wb) {
    this.stocks.forEach((stock) => {
      stock.tick(wb, this.bank);

      if (stock.sellPrice) {
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
