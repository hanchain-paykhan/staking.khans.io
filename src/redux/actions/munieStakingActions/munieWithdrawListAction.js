import { MunieV2StakingContract, MunieTokenAddress } from "../../../config/new/StakingMunieV2Config";

import axios from "axios";

function munieWithdrawListAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        const stakingTokenIdImgBack = await axios.post(`https://back.khans.io/block/munieV2WithdrawList`, {
          account,
        });

        dispatch({
          type: "MUNIE_WITHDRAW_LIST",
          payload: {
            stakedMunieTokenId: stakingTokenIdImgBack.data,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const munieWithdrawListAction = { munieWithdrawListAct };
