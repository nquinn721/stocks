from core.Bank import Bank
from core.Stock import Stock
from core.tickers import tickers
ticker = 'goog'
class HFT:
    stock: Stock = None
    stocks: list[Stock] = []
    soldStocks: list[Stock] = []
    bank: Bank = Bank()

    def __init__(self, wb):
        print('HFT initialized')
        # for ticker in tickers:
        #     self.stocks.append(Stock(ticker, wb))
        # print(f'Created stocks for {len(self.stocks)} tickers')


    def tick(self, wb):
        for stock in self.stocks:
            stock.tick(wb, self.bank)

            if stock.sellPrice:
                self.bank.add(stock)
                stock.reset()
                continue
