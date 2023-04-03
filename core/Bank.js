import { Stock } from "./Stock";
import colors from "colors";

export class Bank {
  initialBalance = 10000;
  balance = 10000;
  totalProfit = 0;
  start = Date.now();
  totalStocksLend = 4;
  stocksLended = {};
  add(stock) {
    console.log("Bank adding ${stock.avaialableFunds} to balance".grey);
    this.balance += stock.avaialableFunds;
    this.totalProfit += stock.profit;
    const totalMoneys = this.initialBalance + this.totalProfit;
    delete this.stocksLended[stock.ticker];
    console.log("\nBank balance:", `${this.balance}`.grey);
    console.log(
      "Total Money:",
      totalMoneys > this.initialBalance
        ? `${totalMoneys}`.green
        : `${totalMoneys}`.red
    );
    console.log(
      "Time running ${round(time.time() - this.start) / 60} minues\n\n"
    );
  }

  get_money(this, stockName, stock_price) {
    const totalStocksLend = this.stocksLended.values().length;
    if (totalStocksLend <= this.totalStocksLend && this.balance > stock_price) {
      const fundsLended = this.balance; // (this.totalStocksLend - totalStocksLend)
      this.balance -= fundsLended;
      this.stocksLended[stockName] = fundsLended;
      console.log(
        `Bank lending {fundsLended} to {stockName} Balanace: {round(this.balance, 2)}`
          .yellow
      );
      console.log(
        `Stockes Lended: {this.stocksLended} Total {sum(this.stocksLended.values())}`
          .yellow
      );
      return fundsLended;
    }
    return 0;
  }
}
