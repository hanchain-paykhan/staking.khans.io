import axios from "axios";

function airDropPriceAct() {
  return async (dispatch) => {
    try {
      // 컨트랙트에 유저가 총 스테이킹 할 수 있는 토큰 양 출력 함수
      const getLatestPriceApiToBack = await axios.get(`https://back.khans.io/block/wethAirdropPrice`);

      dispatch({
        type: "GET_AIRDROP_PRICE_SUCCESS",
        payload: {
          getLatestPrice: getLatestPriceApiToBack.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const airDropPriceAction = { airDropPriceAct };
