import axios from "axios";
function oldAllMunieStakedViewAct() {
  return async (dispatch) => {
    try {
      const getMunieStakingTokenImgVideoUrlToBack = await axios.get(`https://back.khans.io/block/oldMunieAllStakedNft`);

      const getOldMunieStakingTokenIdImgVideoUrlApi = getMunieStakingTokenImgVideoUrlToBack.data;

      let [getOldMunieStakingTokenIdImgVideoUrl] = await Promise.all([getOldMunieStakingTokenIdImgVideoUrlApi]);

      dispatch({
        type: "GET_OLD_MUNIE_ALL_TOKEN_VIEW",
        payload: {
          getOldMunieStakingTokenIdImgVideoUrl: getOldMunieStakingTokenIdImgVideoUrl,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldAllMunieStakedViewAction = { oldAllMunieStakedViewAct };
