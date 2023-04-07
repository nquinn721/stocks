import { color } from 'console-log-colors';

export class Stock {
  ticker = '';
  amount = 0;
  currentPrice = 0;
  prevPrice = 0;
  change = 0;
  buyPrice = 0;
  sellPrice = 0;
  profit = 0;
  tickNum = 0;
  direction = 'same';
  stockChange = 0;
  avaialableFunds = 0;
  considerBuyPositive = 0.01;
  percentChangeSellPositive = 0.01;
  percentChangeSellNegative = -0.01;

  constructor(ticker, wb) {
    this.ticker = ticker;
    this.start(wb);
  }
  async start(wb) {
    await this.getPrice(wb);
    if (`${this.currentPrice}`.split('.')[1]?.length > 2) {
      this.percentChangeSellPositive /= 10;
      this.percentChangeSellNegative /= 10;
      this.considerBuyPositive /= 10;
      console.log(
        this.ticker,
        this.percentChangeSellNegative,
        this.percentChangeSellPositive,
      );
    }
  }
  async getPrice(wb) {
    const { price, change } = await wb.ticker(this.ticker);

    this.prevPrice = this.prevPrice ? this.currentPrice : price;
    this.stockChange = change;
    this.currentPrice = price;
  }

  async tick(wb, bank) {
    if (!this.prevPrice) return;

    this.tickNum++;
    await this.getPrice(wb);
    this.change = (this.currentPrice * 1000 - this.prevPrice * 1000) / 1000;

    if (this.change >= this.considerBuyPositive) {
      this.direction = 'up';
    } else if (this.change < this.percentChangeSellNegative)
      this.direction = 'down';
    else if (this.direction !== 'same' && this.currentPrice === this.prevPrice)
      this.direction = 'same';

    // console.log(
    //   `P: ${this.prevPrice} C: ${this.currentPrice} Ch: ${this.change} D: ${this.direction}`,
    // );
    this.considerBuy(bank);
    this.considerSell();

    if (this.buyPrice && this.tickNum >= 10 && this.direction === 'same')
      this.sell();
  }

  considerBuy(bank) {
    if (this.buyPrice == 0 && this.direction == 'up') {
      this.avaialableFunds = bank.get_money(this.ticker, this.currentPrice);
      if (this.avaialableFunds > this.currentPrice) {
        this.buy(Math.floor(this.avaialableFunds / this.currentPrice));
        this.direction = 'same';
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
    // console.log(
    //   color.cyan(
    //     `Buying ${amount} shares of ${this.ticker} at ${this.currentPrice} each`,
    //   ),
    // );
    this.buyPrice = this.currentPrice;
    this.avaialableFunds -= amount * this.buyPrice;
    this.amount = amount;
  }

  sell() {
    this.sellPrice = this.currentPrice;
    this.avaialableFunds += this.amount * this.sellPrice;
    this.profit = (this.sellPrice - this.buyPrice) * this.amount;
    // if (this.profit < 0)
    //   console.log(
    //     color.red(
    //       `Selling ${this.amount} shares of ${this.ticker} at ${this.currentPrice} each Buy Price: ${this.buyPrice} Profit: ${this.profit}`,
    //     ),
    //   );
    // else
    //   console.log(
    //     color.green(
    //       `Selling ${this.amount} shares of ${this.ticker} at ${this.currentPrice} each Buy Price: ${this.buyPrice} Profit: ${this.profit}`,
    //     ),
    //   );
  }

  reset() {
    this.amount = 0;
    this.buyPrice = 0;
    this.sellPrice = 0;
    this.profit = 0;
    this.tickNum = 0;
    this.avaialableFunds = 0;
  }
}
