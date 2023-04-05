import { green, red, yellow } from 'console-log-colors';
function round(num) {
  return Math.round(num * 100) / 100;
}
export class Bank {
  initialBalance = 10000;
  balance = 10000;
  totalProfit = 0;
  start = Date.now();
  totalStocksLend = 4;
  stocksLended = {};
  totalSales = 0;
  profitSales = 0;

  add(stock) {
    this.balance += stock.avaialableFunds;
    this.totalProfit += stock.profit;
    this.totalSales++;
    stock.profit > 0 && this.profitSales++;

    const totalMoneys = this.initialBalance + this.totalProfit;
    delete this.stocksLended[stock.ticker];
    console.log(
      'Profit:',
      stock.profit > 0 ? green(round(stock.profit)) : red(round(stock.profit)),
    );
    console.log(
      'Total Money:',
      totalMoneys > this.initialBalance
        ? green(round(totalMoneys))
        : red(round(totalMoneys)),
    );
    console.log(`Total Sales: ${this.totalSales}`);
    console.log(
      green(
        `Profit Sales: ${Math.round(
          (this.profitSales / this.totalSales) * 100,
        )}%`,
      ),
    );

    console.log(
      `Time running ${Math.round(
        (Date.now() - this.start) / 1000 / 60,
      )}:${Math.round((Date.now() - this.start) / 1000)} \n\n`,
    );
  }

  get_money(stockName, stock_price) {
    const totalStocksLend = Object.values(this.stocksLended).length;
    if (totalStocksLend <= this.totalStocksLend && this.balance > stock_price) {
      const fundsLended =
        this.balance / (this.totalStocksLend - totalStocksLend);
      this.balance -= fundsLended;
      this.stocksLended[stockName] = fundsLended;
      // console.log(
      //   yellow(
      //     `Bank lending ${fundsLended} to ${stockName} Balanace: ${this.balance}`,
      //   ),
      // );
      // console.log(
      //   yellow(
      //     `Stocks Lended: ${JSON.stringify(this.stocksLended)} Total ${
      //       this.initialBalance - this.balance
      //     }`,
      //   ),
      // );
      return fundsLended;
    }
    return 0;
  }
}
