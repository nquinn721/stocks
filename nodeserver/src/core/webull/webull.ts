import { URLS } from './endpoints';
import { v4 as uuid4 } from 'uuid';
import axios from 'axios';
import * as md5 from 'md5';

class WEBULL {
  _headers: any = '';
  _get_did: any = '';
  _urls: any = '';
  _account_id: any = '';
  _trade_token: any = '';
  _access_token: any = '';
  _refresh_token: any = '';
  _token_expire: any = '';
  _uuid: any = '';
  _did: any = '';
  _region_code: any = '';
  zone_var: any = '';
  timeout: any = '';

  constructor() {
    this._headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/json',
      platform: 'web',
      hl: 'en',
      os: 'web',
      osv: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0',
      app: 'global',
      appid: 'webull-webapp',
      ver: '3.39.18',
      lzone: 'dc_core_r001',
      ph: 'MacOS Firefox',
      locale: 'eng',
      'device-type': 'Web',
      did: '',
    };

    //endpoints

    //sessions
    this._account_id = '';
    this._trade_token = '';
    this._access_token = '';
    this._refresh_token = '';
    this._token_expire = '';
    this._uuid = '';

    //miscellaenous
    this._did = '';
    this._region_code = 6;
    this.zone_var = 'dc_core_r001';
    this.timeout = 15;
  }

  build_req_headers(
    include_trade_token = false,
    include_time = false,
    include_zone_var = true,
  ) {
    `
        Build default set of header params
        `;
    let req_id = uuid4();
    let headers = {
      headers: {
        ...this._headers,
        reqid: req_id,
        did: this._did,
        access_token: this._access_token,
      },
    };
    if (include_trade_token) headers['t_token'] = this._trade_token;
    if (include_time)
      headers['t_time'] = Math.round(Date.now() * 1000).toString();
    if (include_zone_var) headers['lzone'] = this.zone_var;
    return headers;
  }

  async login(username: string, password: string, device_name = '', did = '') {
    this._did = did;
    `
        Login with email or phone number

        phone numbers must be a str in the following form
        US '+1-XXXXXXX'
        CH '+86-XXXXXXXXXXX'
        `;

    // with webull md5 hash salted
    let md5_hash = md5('wl_app-a&b@!423^' + password);

    const data = {
      account: username,
      accountType: 2,
      deviceId: this._did,
      deviceName: device_name,
      grade: 1,
      pwd: md5_hash,
      regionId: this._region_code,
    };

    const headers = this.build_req_headers();

    console.log('LOGIN', URLS.login(), data, headers);

    let response;
    try {
      response = await axios.post(URLS.login(), data, headers);
    } catch (e) {
      console.log('LOGIN ERROR', e);
    }
    console.log('LOGIN', response);
    const result = response.data;

    if ('accessToken' in result) {
      this._access_token = result['accessToken'];
      this._refresh_token = result['refreshToken'];
      this._token_expire = result['tokenExpireTime'];
      this._uuid = result['uuid'];
      this._account_id = this.get_account_id();
    }
    return result;
  }

  async get_mfa(username = '') {
    const data = { account: username, accountType: 2, codeType: 5 };

    const response = await axios.post(URLS.get_mfa(), data, this._headers);

    if (response.data.status_code == 200) return true;
    else return false;
  }

  async check_mfa(username = '', mfa = '') {
    const data = { account: username, accountType: 2, code: mfa, codeType: 5 };

    const response = await axios.post(URLS.check_mfa(), data, this._headers);
    return response.data;
  }

  api_login(
    access_token = '',
    refresh_token = '',
    token_expire = '',
    uuid = '',
  ) {
    this._access_token = access_token;
    this._refresh_token = refresh_token;
    this._token_expire = token_expire;
    this._uuid = uuid;
    this._account_id = this.get_account_id();
  }

  async get_account() {
    `
        get important details of account, positions, portfolio stance...etc
        `;
    const headers = this.build_req_headers();
    const response = await axios.get(URLS.account(this._account_id), headers);
    const result = response.data;
    return result;
  }

  async get_trade_token(password = '') {
    `
        Trading related
        authorize trade, must be done before trade action
        `;
    const headers = this.build_req_headers();

    // with webull md5 hash salted
    const md5_hash = md5('wl_app-a&b@!423^' + password);
    const data = { pwd: md5_hash };

    const response = await axios.post(URLS.trade_token(), data, headers);
    const result = response.data;
    if ('tradeToken' in result) {
      this._trade_token = result['tradeToken'];
      return true;
    } else return false;
  }

  async get_all_tickers() {
    const headers = this.build_req_headers();
    const response = await axios.get(URLS.get_all_tickers(6, 6), headers);
    return response.data;
  }

  async get_quote(stock) {
    `
        get price quote
        tId: ticker ID str
        `;
    const headers = this.build_req_headers();

    const tId = await this.get_ticker(stock);
    try {
      const response = await axios.get(URLS.quotes(tId), headers);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async get_ticker(stock) {
    stock = stock.toUpperCase();
    const headers = this.build_req_headers();
    const response = await axios.get(
      URLS.stock_id(stock, this._region_code),
      headers,
    );
    const result = response.data?.data;
    return (
      result?.find((v) => v.symbol === stock)?.tickerId || 'No ticker found'
    );
  }

  async place_order(
    stock,
    tId,
    price = 0,
    action = 'BUY',
    orderType = 'LMT',
    enforce = 'GTC',
    quant = 0,
    outsideRegularTradingHour = true,
    stpPrice,
    trial_value = 0,
    trial_type = 'DOLLAR',
  ) {
    `
        Place an order

        price: float (LMT / STP LMT Only)
        action: BUY / SELL / SHORT
        ordertype : LMT / MKT / STP / STP LMT / STP TRAIL
        timeinforce:  GTC / DAY / IOC
        outsideRegularTradingHour: true / false
        stpPrice: float (STP / STP LMT Only)
        trial_value: float (STP TRIAL Only)
        trial_type: DOLLAR / PERCENTAGE (STP TRIAL Only)
        `;
    tId = this.get_ticker(stock);

    const headers = this.build_req_headers(true, true);
    const data = {
      action: action,
      comboType: 'NORMAL',
      orderType: orderType,
      outsideRegularTradingHour: outsideRegularTradingHour,
      quantity: quant,
      serialId: uuid4(),
      tickerId: tId,
      timeInForce: enforce,
    };

    //Market orders do not support extended hours trading.
    if (orderType == 'MKT') data['outsideRegularTradingHour'] = false;
    else if (orderType == 'LMT') data['lmtPrice'] = price;
    else if (orderType == 'STP') data['auxPrice'] = stpPrice;
    else if (orderType == 'STP LMT') {
      data['lmtPrice'] = price;
      data['auxPrice'] = stpPrice;
    } else if (orderType == 'STP TRAIL') data['trailingStopStep'] = trial_value;
    data['trailingType'] = trial_type;

    const response = await axios.post(
      URLS.place_orders(this._account_id),
      data,
      headers,
    );
    return response.data;
  }

  async cancel_order(order_id = '') {
    `
        Cancel an order
        `;
    const headers = this.build_req_headers(true, true);
    const data = {};
    const response = await axios.post(
      URLS.cancel_order(this._account_id) + order_id + '/' + uuid4(),
      data,
      headers,
    );
    const result = response.data;
    return result['success'];
  }

  async place_order_crypto(
    stock,
    tId,
    price = 0,
    action = 'BUY',
    orderType = 'LMT',
    enforce = 'DAY',
    entrust_type = 'QTY',
    quant = 0,
    outsideRegularTradingHour = false,
  ) {
    `
        Place Crypto order
        price: Limit order entry price
        quant: dollar amount to buy/sell when entrust_type is CASH else the decimal or fractional amount of shares to buy
        action: BUY / SELL
        entrust_type: CASH / QTY
        ordertype : LMT / MKT
        timeinforce:  DAY
        outsideRegularTradingHour: true / false
        `;
    tId = this.get_ticker(stock);

    const headers = this.build_req_headers(true, true);
    const data = {
      action: action,
      assetType: 'crypto',
      comboType: 'NORMAL',
      entrustType: entrust_type,
      lmtPrice: price,
      orderType: orderType,
      outsideRegularTradingHour: outsideRegularTradingHour,
      quantity: quant,
      serialId: uuid4(),
      tickerId: tId,
      timeInForce: enforce,
    };

    const response = await axios.post(
      URLS.place_orders(this._account_id),
      data,
      headers,
    );
    return response.data;
  }

  async get_account_id(id = 0) {
    `
        get account id
        call account id before trade actions
        `;
    const headers = this.build_req_headers();

    const response = await axios.get(this._urls.account_id(), headers);
    const result = response.data;
    if (result.success && result.data.lenth > 0) {
      this.zone_var = result.data.id.rzone;
      this._account_id = result.data.id.secAccountId;
      return this._account_id;
    } else return;
  }
}
export const Webull = new WEBULL();
