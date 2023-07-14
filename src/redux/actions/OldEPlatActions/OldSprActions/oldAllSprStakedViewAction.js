import axios from "axios";

function oldAllSprStakedViewAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const getStakingTokenImgVideoUrlToBack = await axios.get(`https://back.khans.io/block/oldSprAllStakedNft`);
        const getOldSprStakingTokenIdImgVideoUrlApi = getStakingTokenImgVideoUrlToBack.data;

        // console.log(getStakingTokenIdImgVideoUrlApi);

        let [getOldSprStakingTokenIdImgVideoUrl] = await Promise.all([getOldSprStakingTokenIdImgVideoUrlApi]);

        dispatch({
          type: "GET_OLD_SPR_ALL_TOKEN_VIEW_SUCCESS",
          payload: {
            getOldSprStakingTokenIdImgVideoUrl: getOldSprStakingTokenIdImgVideoUrl,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldAllSprStakedViewAction = { oldAllSprStakedViewAct };
