import axios from "axios";

function L1TokenListToBackAct() {
  return async (dispatch) => {
    try {
      const toListToListToBackApi = await axios.get(`https://back.khans.io/block/l1TokenList`);
      const tokenListL1ToBackApi = toListToListToBackApi.data.tokenList;
      dispatch({
        type: "L1_TOKEN_LIST_TOBACK",
        payload: {
          L1TokenList: tokenListL1ToBackApi,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const L1TokenListToBackAction = { L1TokenListToBackAct };
