

import time

from core.HFT import HFT
from core.Stock import Stock
from core.WebullBot import WebullBot


def StartApp():
    wb = WebullBot()
    wb.ticker('AAPL')
    # logged_in = wb.login()
    # print("Logged in: ", logged_in)
    # hft = HFT(wb)

    # print('starting loop')
    # while True:
    #     hft.tick(wb)
    #     time.sleep(1)


if __name__ == '__main__':
    StartApp()





