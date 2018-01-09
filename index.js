const ccxt = require ('ccxt');
const _ = require ('lodash');

(async function () {

  let btcmarkets         = new ccxt.btcmarkets ()
  let acx                = new ccxt.acx ()
  let independentreserve = new ccxt.independentreserve ()

  setInterval(async function () {

    let btcmarkets_ticker         = await btcmarkets.fetch_ticker('BTC/AUD');
    let acx_ticker                = await acx.fetch_ticker('BTC/AUD'  );
    let independentreserve_ticker = await independentreserve.fetch_ticker('BTC/AUD');

    let data = {
      bid: [
        btcmarkets_ticker.bid,
        acx_ticker.bid,
        independentreserve_ticker.bid
      ],
      ask: [
        btcmarkets_ticker.ask,
        acx_ticker.ask,
        independentreserve_ticker.ask
      ]
    }
    // console.log(data);
    // console.log('max bid', _.max(data.bid));
    // console.log('min ask', _.min(data.ask));
    let trade = (_.max(data.bid) - _.min(data.ask))/ _.min(data.ask) * 100
    console.log(`trade ${trade}%`);
  }, 500);

}) ();
