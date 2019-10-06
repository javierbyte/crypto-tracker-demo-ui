require("dotenv").config();

const Express = require("express");
const Cors = require("cors");
const Axios = require("axios");

const URL = "https://pro-api.coinmarketcap.com";
const API_KEY = process.env.TOKEN;

const app = Express();

app.use(Cors());

const CACHE_TIME = 5 * 60 * 1000;

let lastRequestDate = 0;
let cachedResult = null;

app.get("/v1/cryptocurrency/listings/latest", async (req, res) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastRequestDate < lastRequestDate) {
    res.send(cachedResult);
    return;
  }

  try {
    const result = await Axios.get(`${URL}/v1/cryptocurrency/listings/latest`, {
      params: req.query,
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY
      }
    });
    lastRequestDate = currentTime;
    cachedResult = result.data;
    res.send(result.data);
  } catch (e) {
    res.send(e);
  }
});

app.get("/", (req, res) =>
  res.send(`Server running! "${API_KEY.slice(0, 5)}"`)
);

app.listen(80, () => {
  console.log("Proxy server listening on port 80");
});
