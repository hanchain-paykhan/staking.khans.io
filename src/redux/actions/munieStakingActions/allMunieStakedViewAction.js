import axios from "axios";
function allMunieStakedViewAct() {
  return async (dispatch) => {
    try {
      const getMunieStakingTokenImgVideoUrlToBack = await axios.get(`https://back.khans.io/block/munieV2AllStakedView`);

      dispatch({
        type: "GET_MUNIE_ALL_TOKEN_VIEW",
        payload: {
          getMunieStakingTokenIdImgVideoUrl: getMunieStakingTokenImgVideoUrlToBack.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const allMunieStakedViewAction = { allMunieStakedViewAct };
