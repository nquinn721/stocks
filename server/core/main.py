

import time

from core.HFT import HFT
from core.Stock import Stock
from core.WebullBot import WebullBot


def StartApp():
    wb = WebullBot()
    wb.login()
    # wb.print(wb.ticker('AAPL'))
    hft = HFT(wb)

    print('starting loop')
    # while True:
    #     hft.bank.balance -= 100
    # #     hft.tick(wb)
    #     time.sleep(1)
    return hft





