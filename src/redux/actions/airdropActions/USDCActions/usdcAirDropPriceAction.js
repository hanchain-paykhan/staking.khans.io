import { USDCAirDropContract } from "../../../../config/new/USDCAirDropConfig";

function usdcAirDropPriceAct() {
  return async (dispatch) => {
    try {
      const getUsdcLatestPriceApi = await USDCAirDropContract.methods.getLatestPrice().call();

      dispatch({
        type: "GET_USDC_AIRDROP_PRICE_SUCCESS",
        payload: {
          getUsdcLatestPrice: ((getUsdcLatestPriceApi / 10 ** 18) * 10000000000).toFixed(2),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const usdcAirDropPriceAction = { usdcAirDropPriceAct };
