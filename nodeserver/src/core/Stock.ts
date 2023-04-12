import { color } from 'console-log-colors';

export class Stock {
  ticker = '';
  amount = 0;
  currentPrice = 0;
  prevPrice = 0;
  change = 0;
  buyPrice = 0;
  sellPrice = 0;
  allBuyPrices = [];
  isSold = false;
  profit = 0;
  tickNum = 0;
  purchaseTick = 0;
  direction = 'same';
  stockChange = 0;
  avaialableFunds = 0;
  considerBuyPositive = 1;
  changeSellPositive = 1;
  changeSellNegative = 10;
  timeToHoldStock = 9999; // seconds
  decimals = 2;

  constructor(ticker) {
    this.ticker = ticker.ticker;
    this.changeSellPositive /= Math.pow(10, ticker.decimals);
    this.changeSellNegative /= Math.pow(10, ticker.decimals);
    this.considerBuyPositive /= Math.pow(10, ticker.decimals);
    this.decimals = ticker.decimals;
    // console.log(
    //   this.ticker,
    //   this.considerBuyPositive,
    //   this.changeSellNegative,
    //   this.changeSellPositive,
    // );
  }

  async getPrice(wb) {
    let { price, change } = await wb.ticker(this.ticker);
    price = parseFloat(price.toFixed(this.decimals));
    this.prevPrice = this.prevPrice ? this.currentPrice : price;
    this.stockChange = change;
    this.currentPrice = price;
    if (price > 50) console.log(this.ticker, price);
  }

  async tick(wb, bank) {
    await this.getPrice(wb);
    if (!this.prevPrice) return;

    this.tickNum++;
    this.buyPrice && this.allBuyPrices.push(this.currentPrice);
    this.buyPrice && this.purchaseTick++;
    this.change = parseFloat(
      (this.currentPrice - this.prevPrice).toFixed(this.decimals),
    );

    if (this.change >= this.considerBuyPositive) {
      this.direction = 'up';
    } else if (this.change < this.changeSellNegative) this.direction = 'down';
    else if (this.direction !== 'same' && this.currentPrice === this.prevPrice)
      this.direction = 'same';

    this.log();
    this.considerBuy(bank);
    this.considerSell();
  }

  considerBuy(bank) {
    if (this.buyPrice == 0 && this.direction == 'up') {
      this.avaialableFunds = bank.get_money(this);
      if (this.avaialableFunds > this.currentPrice) {
        // console.log('buying', this.ticker, this.prevPrice, this.currentPrice);
        this.buy(Math.floor(this.avaialableFunds / this.currentPrice));
        this.direction = 'same';
      }
    }
  }

  considerSell() {
    if (this.buyPrice != 0 && this.sellPrice == 0) {
      const considerSellHigh = parseFloat(
        (this.buyPrice + this.changeSellPositive).toFixed(this.decimals),
      );
      const considerSellLow = parseFloat(
        (this.buyPrice - this.changeSellNegative).toFixed(this.decimals),
      );
      if (
        this.currentPrice <= considerSellLow ||
        this.currentPrice >= considerSellHigh ||
        this.purchaseTick >= this.timeToHoldStock
      )
        this.sell();
    }
  }

  buy(amount) {
    this.buyPrice = this.currentPrice;
    // this.avaialableFunds -= amount * this.buyPrice;
    this.amount = amount;
  }

  sell() {
    this.sellPrice = this.currentPrice;
    this.isSold = true;
    this.profit = (this.sellPrice - this.buyPrice) * this.amount;
    this.avaialableFunds += this.profit;
  }

  reset() {
    this.amount = 0;
    this.buyPrice = 0;
    this.sellPrice = 0;
    this.profit = 0;
    this.tickNum = 0;
    this.avaialableFunds = 0;
    this.isSold = false;
    this.purchaseTick = 0;
    this.direction = 'same';
  }
  log() {
    if (this.tickNum % 20 == 0 && this.buyPrice)
      console.log(
        `${this.ticker}:: P: ${this.prevPrice} C: ${this.currentPrice} Ch: ${this.change} D: ${this.direction}`,
      );
  }
}
