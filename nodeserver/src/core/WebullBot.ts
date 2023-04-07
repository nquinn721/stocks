import {
  WEBULL_DEVICE_ID,
  WEBULL_DEVICE_NAME,
  WEBULL_LOGIN_EMAIL,
  WEBULL_LOGIN_PWD,
  WEBULL_TRADING_PIN,
} from './credentials';
import { Webull } from './webull/webull';

export class WebullBot {
  async login() {
    const login = await Webull.login(
      WEBULL_LOGIN_EMAIL,
      WEBULL_LOGIN_PWD,
      WEBULL_DEVICE_NAME,
      WEBULL_DEVICE_ID,
    );
    // await python`${wb}.login(username=${WEBULL_LOGIN_EMAIL}, password=${WEBULL_LOGIN_PWD}, device_name=${WEBULL_DEVICE_ID})`;

    // this._loggedin = await python`wb.get_trade_token(WEBULL_TRADING_PIN)`;
    // this._webull = wb;
  }

  async positions() {
    // const wb = this._webull;
    // return await python`wb.get_positions()`;
  }

  async ticker(ticker) {
    const tick = await Webull.get_quote(ticker);
    return { price: Number(tick?.pPrice || tick?.close), change: tick?.change };
  }
}
