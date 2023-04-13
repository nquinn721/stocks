import { Bank } from './Bank';
import { Stock } from './Stock';
import { tickers } from './tickers';

export class HFT {
  stocks = [];
  soldStocks = [];
  bank = new Bank();

  constructor(wb) {
    console.log('HFT initialized');
    // this.stocks.push(new Stock('amc', wb));
    for (const ticker of tickers) this.stocks.push(new Stock(ticker));
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
}
