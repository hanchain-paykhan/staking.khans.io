import axios from "axios";

function hanChainPriceAct() {
  return async (disptach) => {
    try {
      const coinCeckgoApi = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=hanchain&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      const hanChainPriceApi = coinCeckgoApi.data[0].current_price;
      const hanChainPercentageApi =
        coinCeckgoApi.data[0].price_change_percentage_24h;
      let [hanChainPrice, hanChainPercentage] = await Promise.all([
        hanChainPriceApi,
        hanChainPercentageApi,
      ]);
      disptach({
        type: "GET_HANCHAIN_PRICE_SUCCESS",
        payload: {
          hanChainPrice: hanChainPrice,
          hanChainPercentage: hanChainPercentage.toFixed(2),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const hanChainPriceActtion = { hanChainPriceAct };
