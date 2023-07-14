import axios from "axios";

function musiAirDropTokenListAct() {
  return async (dispatch) => {
    try {
      const musiAirDropTokenListArrayApi = await axios.get(`https://back.khans.io/block/musikhanAirdropTokenList`);

      dispatch({
        type: "MUSI_AIRDROP_TOKENLIST",
        payload: {
          musiAirDropTokenList: musiAirDropTokenListArrayApi.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const musiAirDropTokenListAction = { musiAirDropTokenListAct };
