import axios from "axios";
import { SPRV2StakingContract, SheepooriTokenAddress } from "../../../config/new/StakingSPRV2Config";
function allSPRV2StakedViewAct() {
  return async (dispatch) => {
    try {
      const getTotalSPRV2TokenIdsApi = await SPRV2StakingContract.methods.getTotalTokenIds().call();

      const getSPRV2StakingTokenImgVideoUrlToBack = await axios.get(
        `https://alchemyapi.khans.io/alchemy/getNFTImages?contractAddress=${SheepooriTokenAddress}&tokenIds=${getTotalSPRV2TokenIdsApi}`
      );

      // console.log(getMunieStakingTokenImgVideoUrlToBack);

      const getSPRV2StakingTokenIdImgVideoUrlApi = getSPRV2StakingTokenImgVideoUrlToBack.data.data;

      // console.log(getMunieStakingTokenImgVideoUrlToBack);

      let [getSPRV2StakingTokenIdImgVideoUrl] = await Promise.all([getSPRV2StakingTokenIdImgVideoUrlApi]);

      dispatch({
        type: "GET_SPRV2_ALL_TOKEN_VIEW",
        payload: {
          getSPRV2StakingTokenIdImgVideoUrl: getSPRV2StakingTokenIdImgVideoUrl,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const allSPRV2StakedViewAction = { allSPRV2StakedViewAct };
