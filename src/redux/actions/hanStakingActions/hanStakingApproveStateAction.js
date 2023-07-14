import axios from "axios";
import { HanBonusStakingAddress } from "../../../config/StakingHanChain";

function hanStakingApproveStateAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const getHanChainAllowanceApi = await axios.post(`https://back.khans.io/block/hanBonusAllowance`, {
          account,
          HanBonusStakingAddress,
        });
        const hanChainAllowanceApi = parseFloat(getHanChainAllowanceApi.data);
        // console.log(hanChainAllowanceApi);

        let [hanChainAllowance] = await Promise.all([hanChainAllowanceApi]);

        dispatch({
          type: "HAN_CHAIN_APPROVE_STATE",
          payload: { hanChainAllowance: hanChainAllowance },
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const hanStakingApproveStateAction = { hanStakingApproveStateAct };
