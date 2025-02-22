const axios = require("axios");

const weatherAxios = axios.create({
  baseURL: "http://api.openweathermap.org/",
});
const currencyAxios = axios.create({
  baseURL: "https://freecurrencyapi.net/",
});
const covidAxios = axios.create({
  baseURL: "https://covid-19-data.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "0ab433840emshfe226486d2580c1p1f7838jsn3704de90486a",
  },
});

let privateKey = `xnd_development_mj2glQV8VKiEayUldu7pFQMHg8nGg2iyKzzSpoMWWR7AroHcrMeN1H067nKR8T:`;
let buffedPrivateKey = Buffer.from(privateKey).toString("base64");

const xenditAxios = axios.create({
  baseURL: "https://api.xendit.co/",
  headers: {
    Authorization: "Basic " + buffedPrivateKey,
  },
});

const callBack = axios.create({
  baseURL: "https://dc28-180-244-128-54.ngrok.io/",
  headers: {
    Authorization: "Basic " + buffedPrivateKey,
    "x-callback-token": "H19aU9FoP9znVKj54fDk2ewYcdTwW1cawizBZutBHms7VNSh",
  },
});
// console.log(xenditAxios);

const xenditBalance = () => {
  return xenditAxios({
    method: "get",
    url: `balance?account_type=CASH`,
  });
};

const xenditPayment = (obj) => {
  return xenditAxios({
    method: "post",
    url: `callback_virtual_accounts/external_id=${obj.external_id}/simulate_payment`,
    data: {
      amount: obj.amount,
    },
  });
};

const xenditCallback = (obj) => {
  return callBack({
    method: "post",
    url: `virtual_account_paid_callback_url`,
    data: obj,
  });
};

const xenditCreateVa = (payload) => {
  return xenditAxios({
    method: "post",
    url: `callback_virtual_accounts`,
    data: payload,
  });
};

const xenditGetVa = (payload) => {
  return xenditAxios({
    method: "get",
    url: `callback_virtual_accounts/${payload.id}`,
  });
};

const weather = (payload) => {
  return weatherAxios({
    method: "post",
    url: `data/2.5/weather?q=${payload}&APPID=aedf44221043977fe7e945893bad3f3b`,
  });
};

const currency = () => {
  return currencyAxios({
    method: "get",
    url: `api/v2/latest?apikey=465f5650-46b2-11ec-86bf-cb243a2d8500`,
  });
};
const covidData = (payload) => {
  return covidAxios({
    method: "get",
    url: `country/code`,
    params: { code: `${payload}` },
  });
};

module.exports = {
  weather,
  currency,
  xenditBalance,
  xenditCreateVa,
  xenditPayment,
  xenditGetVa,
  xenditCallback,
  covidData,
};
