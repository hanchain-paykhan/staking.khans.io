import axios from "axios";

export function hanEpCirculatingAct() {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://back.khans.io/block/hanEpCirculatingSupply");
      const hanEpCirculating = response.data;

      dispatch({
        type: "GET_HANEP_CIRCULATING",
        payload: {
          hanEpCirculating: hanEpCirculating,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const hanEpCirculatingAction = {
  hanEpCirculatingAct,
};
