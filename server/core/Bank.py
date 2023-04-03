from core.Stock import Stock
import time
from termcolor import colored

class Bank:
    initialBalance: float = 10000
    balance: float = 10000
    totalProfit: float = 0
    start: float = time.time()
    totalStocksLend: int = 4
    stocksLended: list[str] = {}


    def add(self, stock: Stock):
        print(colored(f'Bank adding {stock.avaialableFunds} to balance', 'grey'))
        self.balance += stock.avaialableFunds
        self.totalProfit += stock.profit
        totalMoneys = self.initialBalance + self.totalProfit
        del self.stocksLended[stock.ticker]
        print('\nBank balance:',colored(self.balance, 'grey')) 
        print('Total Money:', colored(totalMoneys, 'green' if totalMoneys > self.initialBalance else 'red')) 
        print(f'Time running {round(time.time() - self.start) / 60} minues\n\n')
    
    def get_money(self, stockName: str, stock_price: float):
        totalStocksLend =  len(self.stocksLended)
        if totalStocksLend  <= self.totalStocksLend and self.balance > stock_price:
            fundsLended = self.balance // (self.totalStocksLend - totalStocksLend)
            self.balance -= fundsLended
            self.stocksLended[stockName] = fundsLended
            print(colored(f'Bank lending {fundsLended} to {stockName} Balanace: {round(self.balance, 2)}', 'light_yellow'))
            print(colored(f'Stockes Lended: {self.stocksLended} Total {sum(self.stocksLended.values())}', 'light_yellow'))
            return fundsLended
        return 0
    
