import { green, red, yellow } from 'console-log-colors';
function round(num) {
  return num;
  // return Math.round(num * 100) / 100;
}
export class Bank {
  initialBalance = 10000;
  balance = 10000;
  totalMoneys = 10000;
  totalProfit = 0;
  start = Date.now();
  totalStocksLend = 4;
  stocksLended = {};
  totalSales = 0;
  profitSales = 0;
  lossSales = 0;
  history = [];
  dumpHistory = [];

  add(stock) {
    this.totalProfit += stock.profit;
    stock.profit < 0 && this.lossSales++;
    stock.profit > 0 && this.profitSales++;
    this.totalMoneys = this.initialBalance + this.totalProfit;
    this.balance += stock.avaialableFunds;
    delete this.stocksLended[stock.ticker];
    // this.logAddToBank(stock);
    this.history.unshift(Object.assign({}, stock));
    this.totalSales++;
  }

  get_money(stock) {
    const totalStocksLend = Object.values(this.stocksLended).length;
    if (
      totalStocksLend <= this.totalStocksLend &&
      this.balance > stock.currentPrice
    ) {
      const fundsLended =
        this.balance / (this.totalStocksLend - totalStocksLend);
      this.balance -= fundsLended;
      this.stocksLended[stock.ticker] = { stock, fundsLended };
      return fundsLended;
    }
    return 0;
  }

  logAddToBank(stock) {
    const totalMoneys = this.totalMoneys;
    console.clear();
    console.log(
      'Profit:',
      stock.profit > 0 ? green(round(stock.profit)) : red(round(stock.profit)),
    );
    console.log(`Stock Sold: ${yellow(stock.ticker)}`);
    console.log(`Stock Purchase Price: ${yellow(stock.buyPrice)}`);
    console.log(
      `Stock Sale Price: ${
        stock.sellPrice > stock.buyPrice
          ? green(stock.sellPrice)
          : yellow(stock.sellPrice)
      }`,
    );
    console.log(`Stock Amount: ${yellow(stock.amount)}`);
    console.log(
      'Total Money:',
      totalMoneys > this.initialBalance
        ? green(round(totalMoneys))
        : red(round(totalMoneys)),
    );
    console.log(`Total Sales: ${this.totalSales}`);
    console.log(green(`Profit Sales: ${Math.round(this.profitSales)}%`));
    console.log(`Negative Profit Sales: ${this.lossSales}`);

    console.log(
      `Time running ${Math.round(
        (Date.now() - this.start) / 1000 / 60,
      )}:${Math.round((Date.now() - this.start) / 1000)} \n\n`,
    );
  }
}
