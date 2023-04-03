import {
  WEBULL_DEVICE_ID,
  WEBULL_LOGIN_EMAIL,
  WEBULL_LOGIN_PWD,
  WEBULL_TRADING_PIN,
} from "./credentials";
import { pythonBridge } from "python-bridge";
const python = pythonBridge();

export class WebullBot {
  _webull;
  _loggedin;

  constructor() {
    // this._webull = python`webull()`;
    this._loggedin = false;
  }

  async login() {
    const wb = this._webull;
    // python.ex'import webull';

    // await python`${wb}.login(username=${WEBULL_LOGIN_EMAIL}, password=${WEBULL_LOGIN_PWD}, device_name=${WEBULL_DEVICE_ID})`;

    // this._loggedin = await python`wb.get_trade_token(WEBULL_TRADING_PIN)`;
    // this._webull = wb;

    return this._loggedin;
  }

  async positions() {
    // const wb = this._webull;
    // return await python`wb.get_positions()`;
  }

  async ticker(ticker) {
    // const wb = this._webull;
    // const tick = python`wb.get_quote(${ticker})`;
    // return {
    //   price: parseFloat(tick["askList"][0]["price"]),
    // };
  }
}
