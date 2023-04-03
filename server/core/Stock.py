from core.WebullBot import WebullBot
from termcolor import colored

class Stock:
    ticker: str = ''
    amount: int = 0
    currentPrice: float = 1
    prevPrice: float = 1
    change: float = 0
    buyPrice: float = 0
    sellPrice: float = 0
    profit: float = 0
    tickNum: int = 0
    direction: str = 'same'
    avaialableFunds: int = 0
    percentChangeSellPositive: float = 0.02
    percentChangeSellNegative: float = -0.02

    def __init__(self, ticker: str,  wb: WebullBot):
        self.ticker = ticker
        self.getPrice(wb)
    
    def getPrice(self, wb: WebullBot):
        tick = wb.ticker(self.ticker)
        self.prevPrice = self.currentPrice 
        self.currentPrice = tick['price']
    
    def tick(self, wb: WebullBot, bank):
        self.tickNum = self.tickNum + 1
        self.getPrice(wb)       
        self.change = round(self.currentPrice - self.prevPrice , 2)
        if self.change >= self.percentChangeSellPositive:
            self.direction = 'up'
        elif self.change < self.percentChangeSellNegative:
            self.direction = 'down'
        else:   
            self.direction = 'same'
        
        print(f'P: {self.prevPrice} C: {self.currentPrice} Ch: {self.change} D: {self.direction}') if self.tickNum % 30 == 0 else None
        self.considerBuy(bank)
        self.considerSell()

        
    def considerBuy(self, bank):
        if self.buyPrice == 0 and self.direction == 'up':
            self.avaialableFunds = bank.get_money(self.ticker, self.currentPrice)
            if self.avaialableFunds > self.currentPrice:
                self.buy(self.avaialableFunds // self.currentPrice)
                self.direction = 'same'
    
    def considerSell(self):
        if self.buyPrice != 0 and self.sellPrice == 0:
            if self.currentPrice <= self.buyPrice + self.percentChangeSellNegative or self.currentPrice >= self.buyPrice + self.percentChangeSellPositive:
                self.sell()
    
    def buy(self, amount: int):
        print(colored(f'Buying {amount} shares of {self.ticker} at {self.currentPrice} each', 'cyan'))
        self.buyPrice = self.currentPrice
        self.avaialableFunds -= amount * self.buyPrice
        self.amount = amount


    def sell(self):
        self.sellPrice = self.currentPrice
        self.avaialableFunds += self.amount * self.sellPrice
        self.profit = round((self.sellPrice - self.buyPrice) * self.amount, 2)
        print(colored(f'Selling {self.amount} shares of {self.ticker} at {self.currentPrice} each Buy Price: {self.buyPrice} Profit: {self.profit}',  'red' if self.profit < 0 else 'green'))
       
    def reset(self):
        self.amount = 0
        self.currentPrice = 1
        self.prevPrice = 1
        self.change = 0
        self.buyPrice = 0
        self.sellPrice = 0
        self.profit = 0
        self.tickNum = 0
        self.direction = 'same'
        self.avaialableFunds = 0