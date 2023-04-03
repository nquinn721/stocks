import { Bank } from "./Bank";
import { Stock } from "./Stock";
import { tickers } from "./tickers";
export class HFT {
  stocks = [];
  soldStocks = [];
  bank = new Bank();

  constructor(wb) {
    console.log("HFT initialized");
    for (let ticker in tickers) this.stocks.push(new Stock(ticker, wb));
    // print(f'Created stocks for {len(self.stocks)} tickers')
  }

  tick(wb) {
    this.stocks.forEach((stock) => {
      stock.tick(wb, this.bank);

      if (stock.sellPrice) {
      }
      this.bank.add(stock);
      stock.reset();
    });
  }
}
