class urls {
  base_info_url = '';
  base_options_url = '';
  base_options_gw_url = '';
  base_paper_url = '';
  base_quote_url = '';
  base_securities_url = '';
  base_trade_url = '';
  base_user_url = '';
  base_userbroker_url = '';
  base_ustrade_url = '';
  base_paperfintech_url = '';
  base_fintech_gw_url = '';
  base_userfintech_url = '';
  base_new_trade_url = '';
  base_ustradebroker_url = '';
  base_securitiesfintech_url = '';
  constructor() {
    this.base_info_url = 'https://infoapi.webull.com/api';
    this.base_options_url = 'https://quoteapi.webullbroker.com/api';
    this.base_options_gw_url = 'https://quotes-gw.webullbroker.com/api';
    this.base_paper_url =
      'https://act.webullbroker.com/webull-paper-center/api';
    this.base_quote_url = 'https://quoteapi.webullbroker.com/api';
    this.base_securities_url = 'https://securitiesapi.webullbroker.com/api';
    this.base_trade_url = 'https://tradeapi.webullbroker.com/api/trade';
    this.base_user_url = 'https://userapi.webull.com/api';
    this.base_userbroker_url = 'https://userapi.webullbroker.com/api';
    this.base_ustrade_url = 'https://ustrade.webullfinance.com/api';
    this.base_paperfintech_url =
      'https://act.webullfintech.com/webull-paper-center/api';
    this.base_fintech_gw_url = 'https://quotes-gw.webullfintech.com/api';
    this.base_userfintech_url = 'https://u1suser.webullfintech.com/api';
    this.base_new_trade_url = 'https://trade.webullfintech.com/api';
    this.base_ustradebroker_url = 'https://ustrade.webullbroker.com/api';
    this.base_securitiesfintech_url =
      'https://securitiesapi.webullfintech.com/api';
  }

  account(account_id) {
    return `${this.base_trade_url}/v3/home/${account_id}`;
  }

  account_id() {
    return `${this.base_trade_url}/account/getSecAccountList/v5`;
  }

  account_activities(account_id) {
    return `${this.base_ustrade_url}/trade/v2/funds/${account_id}/activities`;
  }

  add_alert() {
    return `${this.base_userbroker_url}/user/warning/v2/manage/overlap`;
  }

  analysis(stock) {
    return `${this.base_securities_url}/securities/ticker/v5/analysis/${stock}`;
  }

  analysis_shortinterest(stock) {
    return `${this.base_securities_url}/securities/stock/${stock}/shortInterest`;
  }

  analysis_institutional_holding(stock) {
    return `${this.base_securities_url}/securities/stock/v5/${stock}/institutionalHolding`;
  }

  analysis_etf_holding(stock, has_num, page_size) {
    return `${this.base_securities_url}/securities/stock/v5/${stock}/belongEtf?hasNum=${has_num}&pageSize=${page_size}`;
  }

  analysis_capital_flow(stock, show_hist) {
    return `${this.base_securities_url}/wlas/capitalflow/ticker?tickerId=${stock}&showHis=${show_hist}`;
  }

  bars(stock, interval = 'd1', count = 1200, timestamp) {
    return `${this.base_fintech_gw_url}/quote/charts/query?tickerIds=${stock}&type=${interval}&count=${count}&timestamp=${timestamp}`;
  }

  bars_crypto(stock) {
    return `${this.base_fintech_gw_url}/crypto/charts/query?tickerIds=${stock}`;
  }

  cancel_order(account_id) {
    return `${this.base_ustrade_url}/trade/order/${account_id}/cancelStockOrder/`;
  }

  modify_otoco_orders(account_id) {
    return `${this.base_ustrade_url}/trade/v2/corder/stock/modify/${account_id}`;
  }

  cancel_otoco_orders(account_id, combo_id) {
    return `${this.base_ustrade_url}/trade/v2/corder/stock/cancel/${account_id}/${combo_id}`;
  }

  check_otoco_orders(account_id) {
    return `${this.base_ustrade_url}/trade/v2/corder/stock/check/${account_id}`;
  }

  place_otoco_orders(account_id) {
    return `${this.base_ustrade_url}/trade/v2/corder/stock/place/${account_id}`;
  }

  dividends(account_id) {
    return `${this.base_trade_url}/v2/account/${account_id}/dividends?direct=in`;
  }

  fundamentals(stock) {
    return `${this.base_securities_url}/securities/financial/index/${stock}`;
  }

  is_tradable(stock) {
    return `${this.base_trade_url}/ticker/broker/permissionV2?tickerId=${stock}`;
  }

  list_alerts() {
    return `${this.base_userbroker_url}/user/warning/v2/query/tickers`;
  }

  login() {
    return `${this.base_userfintech_url}/user/v1/login/account/v2`;
  }

  get_mfa() {
    return `${this.base_user_url}/user/v1/verificationCode/send/v2`;
  }

  check_mfa() {
    return `${this.base_userfintech_url}/user/v1/verificationCode/checkCode`;
  }

  get_security(username, account_type, region_code, event, time, url = 0) {
    let mainUrl;
    if (url == 1) mainUrl = 'getPrivacyQuestion';
    else mainUrl = 'getSecurityQuestion';

    return `${this.base_user_url}/user/risk/${mainUrl}?account=${username}&accountType=${account_type}&regionId=${region_code}&event=${event}&v=${time}`;
  }

  next_security(username, account_type, region_code, event, time, url = 0) {
    let mainUrl;
    if (url == 1) mainUrl = 'nextPrivacyQuestion';
    else mainUrl = 'nextSecurityQuestion';

    return `${this.base_user_url}/user/risk/${mainUrl}?account=${username}&accountType=${account_type}&regionId=${region_code}&event=${event}&v=${time}`;
  }

  check_security() {
    return `${this.base_user_url}/user/risk/checkAnswer`;
  }

  logout() {
    return `${this.base_userfintech_url}/user/v1/logout`;
  }

  news(stock, Id, items) {
    return `${this.base_fintech_gw_url}/information/news/tickerNews?tickerId=${stock}&currentNewsId=${Id}&pageSize=${items}`;
  }

  option_quotes() {
    return `${this.base_options_gw_url}/quote/option/query/list`;
  }

  options(stock) {
    return `${this.base_options_url}/quote/option/${stock}/list`;
  }

  options_exp_date(stock) {
    return `${this.base_options_url}/quote/option/${stock}/list`;
  }

  options_exp_dat_new() {
    return `${this.base_fintech_gw_url}/quote/option/strategy/list`;
  }

  options_bars(derivativeId) {
    return `${this.base_options_gw_url}/quote/option/chart/query?derivativeId=${derivativeId}`;
  }

  orders(account_id, page_size) {
    return `${this.base_ustradebroker_url}/trade/v2/option/list?secAccountId=${account_id}&startTime=1970-0-1&dateType=ORDER&pageSize=${page_size}&status=`;
  }

  history(account_id) {
    return `${this.base_ustrade_url}/trading/v1/webull/order/list?secAccountId=${account_id}`;
  }

  paper_orders(paper_account_id, page_size) {
    return `${this.base_paper_url}/paper/1/acc/${paper_account_id}/order?&startTime=1970-0-1&dateType=ORDER&pageSize=${page_size}&status=`;
  }

  paper_account(paper_account_id) {
    return `${this.base_paperfintech_url}/paper/1/acc/${paper_account_id}`;
  }

  paper_account_id() {
    return `${this.base_paperfintech_url}/myaccounts/true`;
  }

  paper_cancel_order(paper_account_id, order_id) {
    return `${this.base_paper_url}/paper/1/acc/${paper_account_id}/orderop/cancel/${order_id}`;
  }

  paper_modify_order(paper_account_id, order_id) {
    return `${this.base_paper_url}/paper/1/acc/${paper_account_id}/orderop/modify/${order_id}`;
  }

  paper_place_order(paper_account_id, stock) {
    return `${this.base_paper_url}/paper/1/acc/${paper_account_id}/orderop/place/${stock}`;
  }

  place_option_orders(account_id) {
    return `${this.base_ustrade_url}/trade/v2/option/placeOrder/${account_id}`;
  }

  place_orders(account_id) {
    return `${this.base_ustrade_url}/trade/order/${account_id}/placeStockOrder`;
  }

  modify_order(account_id, order_id) {
    return `${this.base_ustrade_url}/trading/v1/webull/order/stockOrderModify?secAccountId=${account_id}`;
  }

  quotes(stock) {
    return `${this.base_options_gw_url}/quotes/ticker/getTickerRealTime?tickerId=${stock}&includeSecu=1&includeQuote=1`;
  }

  rankings() {
    return `${this.base_securities_url}/securities/market/v5/6/portal`;
  }

  refresh_login(refresh_token) {
    return `${this.base_user_url}/passport/refreshToken?refreshToken=${refresh_token}`;
  }

  remove_alert() {
    return `${this.base_userbroker_url}/user/warning/v2/manage/overlap`;
  }

  replace_option_orders(account_id) {
    return `${this.base_trade_url}/v2/option/replaceOrder/${account_id}`;
  }

  stock_detail(stock) {
    return `${this.base_fintech_gw_url}/stock/tickerRealTime/getQuote?tickerId=${stock}&includeSecu=1&includeQuote=1&more=1`;
  }

  stock_id(stock, region_code) {
    return `${this.base_options_gw_url}/search/pc/tickers?keyword=${stock}&pageIndex=1&pageSize=20&regionId=${region_code}`;
  }

  trade_token() {
    return `${this.base_new_trade_url}/trading/v1/global/trade/login`;
  }

  user() {
    return `${this.base_user_url}/user`;
  }

  screener() {
    return `${this.base_userbroker_url}/wlas/screener/ng/query`;
  }

  social_posts(topic, num = 100) {
    return `${this.base_user_url}/social/feed/topic/${topic}/posts?size=${num}`;
  }

  social_home(topic, num = 100) {
    return `${this.base_user_url}/social/feed/topic/${topic}/home?size=${num}`;
  }

  portfolio_lists() {
    return `${this.base_options_gw_url}/personal/portfolio/v2/check`;
  }

  press_releases(stock, typeIds, num = 50) {
    let typeIdsString = '';
    if (typeIds) typeIdsString = '&typeIds=' + typeIds;
    return `${this.base_securitiesfintech_url}/securities/announcement/${stock}/list?lastAnnouncementId=0&limit=${num}{typeIdsString}&options=2`;
  }

  calendar_events(event, region_code, start_date, page = 1, num = 50) {
    return `${this.base_fintech_gw_url}/bgw/explore/calendar/${event}?regionId=${region_code}&pageIndex=${page}&pageSize=${num}&startDate=${start_date}`;
  }

  get_all_tickers(region_code, user_region_code) {
    return `${this.base_securitiesfintech_url}/securities/market/v5/card/stockActivityPc.advanced/list?regionId=${region_code}&userRegionId=${user_region_code}&hasNum=0&pageSize=9999`;
  }
}

export const URLS = new urls();
