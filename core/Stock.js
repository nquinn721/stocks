import { WebullBot } from "./WebullBot";
import colors from "colors";

export class Stock {
  ticker = "";
  amount = 0;
  currentPrice = 1;
  prevPrice = 1;
  change = 0;
  buyPrice = 0;
  sellPrice = 0;
  profit = 0;
  tickNum = 0;
  direction = "same";
  avaialableFunds = 0;
  percentChangeSellPositive = 0.02;
  percentChangeSellNegative = -0.02;

  constructor(ticker, wb) {
    this.ticker = ticker;
    this.getPrice(wb);
  }

  getPrice(wb) {
    const tick = wb.ticker(this.ticker);
    this.prevPrice = this.currentPrice;
    this.currentPrice = tick["price"];
  }

  tick(wb, bank) {
    this.tickNum = this.tickNum + 1;
    this.getPrice(wb);
    this.change = Math.round(this.currentPrice - this.prevPrice);
    if (this.change >= this.percentChangeSellPositive) this.direction = "up";
    else if (this.change < this.percentChangeSellNegative)
      this.direction = "down";
    else this.direction = "same";

    //console.log(`P: ${this.prevPrice} C: ${this.currentPrice} Ch: ${this.change} D: ${this.direction}`)
    this.considerBuy(bank);
    this.considerSell();
  }

  considerBuy(bank) {
    if (this.buyPrice == 0 && this.direction == "up") {
      this.avaialableFunds = bank.get_money(this.ticker, this.currentPrice);
      if (this.avaialableFunds > this.currentPrice) {
        this.buy(this.avaialableFunds / this.currentPrice);
        this.direction = "same";
      }
    }
  }

  considerSell() {
    if (this.buyPrice != 0 && this.sellPrice == 0)
      if (
        this.currentPrice <= this.buyPrice + this.percentChangeSellNegative ||
        this.currentPrice >= this.buyPrice + this.percentChangeSellPositive
      )
        this.sell();
  }

  buy(amount) {
    console.log(
      `Buying {amount} shares of {this.ticker} at {this.currentPrice} each`.cyan
    );
    this.buyPrice = this.currentPrice;
    this.avaialableFunds -= amount * this.buyPrice;
    this.amount = amount;
  }

  sell() {
    this.sellPrice = this.currentPrice;
    this.avaialableFunds += this.amount * this.sellPrice;
    this.profit = Math.round((this.sellPrice - this.buyPrice) * this.amount);
    if (this.profit < 0)
      console.log(
        `Selling ${this.amount} shares of ${this.ticker} at ${this.currentPrice} each Buy Price: ${this.buyPrice} Profit: ${this.profit}`
          .red
      );
    else
      console.log(
        `Selling ${this.amount} shares of ${this.ticker} at ${this.currentPrice} each Buy Price: ${this.buyPrice} Profit: ${this.profit}`
          .green
      );
  }

  reset() {
    this.amount = 0;
    this.currentPrice = 1;
    this.prevPrice = 1;
    this.change = 0;
    this.buyPrice = 0;
    this.sellPrice = 0;
    this.profit = 0;
    this.tickNum = 0;
    this.direction = "same";
    this.avaialableFunds = 0;
  }
}
