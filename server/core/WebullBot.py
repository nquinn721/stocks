from webull import webull
from pprint import pprint
from core.credentials import WEBULL_DEVICE_ID, WEBULL_LOGIN_EMAIL, WEBULL_LOGIN_PWD, WEBULL_TRADING_PIN, WEBULL_DEVICE_NAME



class WebullBot:
    def __init__(self) -> None:
        self._webull = webull()
        self._loggedin = False

    
    def login(self, use_workaround: bool = False) -> bool:
        wb = self._webull
        wb._did = WEBULL_DEVICE_ID
        print(WEBULL_DEVICE_ID)
        login = wb.login(username=WEBULL_LOGIN_EMAIL, password=WEBULL_LOGIN_PWD)
        print(login)

        self._loggedin = wb.get_trade_token(WEBULL_TRADING_PIN)
        self._webull = wb

        return self._loggedin

    def positions(self):
        wb = self._webull
        return wb.get_positions()
    
    def ticker(self, ticker: str):
        wb = self._webull
        tick = wb.get_quote(ticker)
        self.print(tick['close'])
        # return {
        #     'price': float(tick['askList'][0]['price']),
        # }

    def print(self, list):
        pprint(list)