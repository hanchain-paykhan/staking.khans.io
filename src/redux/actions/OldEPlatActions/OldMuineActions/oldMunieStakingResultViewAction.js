import { MunieStakingContract, web3 } from "../../../../config/MunieConfig";
import axios from "axios";

function oldMunieStakingResultViewAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 내가 스테이킹한 정보 출력 함수 (스테이킹한 토큰 아이디 배열, 총 보상 받은 양, 클래임 받지 않은 보상 양, 스테이킹한 토큰 개수, 마지막 업데이트 시간)
        const getOldMunieStakerData = await axios.post(`https://back.khans.io/block/oldMunieStakerData`, {
          account,
        });
        const getOldMunieTotalRewardApi = web3.utils.fromWei(String(getOldMunieStakerData.data[1]), "ether");

        const getOldMunieUnClaimedRewardsApi = web3.utils.fromWei(String(getOldMunieStakerData.data[2]), "ether");

        const getOldMunieResultValue = await axios.post(`https://back.khans.io/block/oldMunieResultValue`, {
          account,
        });

        const oldMunieResultValueApi = getOldMunieResultValue.data;

        let [oldMunieResultValue, getOldMunieUnClaimedRewards, getOldMunieTotalReward] = await Promise.all([
          oldMunieResultValueApi,
          getOldMunieUnClaimedRewardsApi,
          getOldMunieTotalRewardApi,
        ]);
        dispatch({
          type: "OLD_MUNIE_RESULT_VIEW",
          payload: {
            oldMunieResultValue: oldMunieResultValue,
            getOldMunieUnClaimedRewards: getOldMunieUnClaimedRewards,
            getOldMunieTotalReward: getOldMunieTotalReward,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const oldMunieStakingResultViewAction = { oldMunieStakingResultViewAct };
