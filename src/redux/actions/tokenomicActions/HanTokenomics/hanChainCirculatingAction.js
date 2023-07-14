import axios from "axios";

export function hanChainCirculatingAct() {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://back.khans.io/block/hanCirculatingSupply");
      const hanCirculating = response.data;

      dispatch({
        type: "GET_HAN_CIRCULATING",
        payload: {
          hanCirculating: hanCirculating,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const hanChainCirculatingAction = {
  hanChainCirculatingAct,
};
