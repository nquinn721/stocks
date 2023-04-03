from webull import webull
from pprint import pprint
from core.credentials import WEBULL_DEVICE_ID, WEBULL_LOGIN_EMAIL, WEBULL_LOGIN_PWD, WEBULL_TRADING_PIN



class WebullBot:
    def __init__(self) -> None:
        self._webull = webull()
        self._loggedin = False

    
    def login(self, use_workaround: bool = False) -> bool:
        wb = self._webull

        wb.login(username=WEBULL_LOGIN_EMAIL, password=WEBULL_LOGIN_PWD, device_name=WEBULL_DEVICE_ID)

        self._loggedin = wb.get_trade_token(WEBULL_TRADING_PIN)
        self._webull = wb

        return self._loggedin

    def positions(self):
        wb = self._webull
        return wb.get_positions()
    
    def ticker(self, ticker: str):
        wb = self._webull
        tick = wb.get_quote(ticker)
        return {
            'price': float(tick['askList'][0]['price']),
        }

    def print(self, list):
        pprint(list)