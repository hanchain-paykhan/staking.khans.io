import axios from "axios";

function oldSprStakingViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 주소 별 스테이킹 한 토큰 개수 STAKED :
        const getOldSprAmountStakedToBack = await axios.post(`https://back.khans.io/block/oldSprStakedAmount`, {
          account,
        });

        const getOldSprAmountStakedApi = getOldSprAmountStakedToBack.data;
        // 스테이킹 한 총 토큰 양

        // 주소 별 스테이킹한 토큰 아이디 반환 getstakedTokenId 주소별 토큰 아이디 반환
        const getOldStakedTokenIdsToBack = await axios.post(`https://back.khans.io/block/oldSprStakedTokenIds`, {
          account,
        });
        const getStakedTokenIdsApi = getOldStakedTokenIdsToBack.data;

        const getMyTokenToBack = await axios.post(`https://back.khans.io/block/oldSprMyTokenIds`, {
          account,
        });

        const getMyTokenIdsApi = getMyTokenToBack.data;

        const stakingTokenIdImgBack = await axios.post(`https://back.khans.io/block/oldSprStakedNft`, {
          account,
        });

        const stakingTokenIdImgApi = stakingTokenIdImgBack.data;

        let [getOldSprAmountStaked, getStakedTokenIds, getMyTokenIds, stakingTokenIdImg] = await Promise.all([
          getOldSprAmountStakedApi,
          getStakedTokenIdsApi,
          getMyTokenIdsApi,
          stakingTokenIdImgApi,
        ]);

        dispatch({
          type: "GET_OLD_SPR_STAKING_VIEW_SUCCESS",
          payload: {
            getOldSprAmountStaked: getOldSprAmountStaked,
            getOldSprStakedTokenIds: getStakedTokenIds,
            getOldSprMyTokenIds: getMyTokenIds,
            oldSprStakingTokenIdImg: stakingTokenIdImg,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldSprStakingViewAction = { oldSprStakingViewAct };
