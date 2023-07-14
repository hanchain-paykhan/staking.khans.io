import { SPRV2StakingContract, SheepooriTokenAddress } from "../../../config/new/StakingSPRV2Config";
import axios from "axios";

function SPRV2WithdrawListAct(account) {
  return async (dispatch) => {
    try {
      if (account !== "") {
        // 스테이킹한 총 토큰 아이디 배열 출력 함수
        // const getTotalMunieTokenIdsApi = await MunieStakingContract.methods.getTotalTokenIds().call();
        // console.log(getTotalMunieTokenIdsApi);
        // 내가 스테이킹한 정보 출력 함수 (스테이킹한 토큰 아이디 배열, 총 보상 받은 양, 클래임 받지 않은 보상 양, 스테이킹한 토큰 개수, 마지막 업데이트 시간)
        const getSPRV2StakerData = await SPRV2StakingContract.methods.getStakerData(account).call();
        // console.log("munieStaker", getMunieStakerData.tokenIds);
        // staking된 nft 정보 가져오기
        const stakingTokenIdImgBack = await axios.get(
          `https://alchemyapi.khans.io/alchemy/getNFTImages?contractAddress=${SheepooriTokenAddress}&tokenIds=${getSPRV2StakerData.tokenIds}`
        );
        // const stakingTokenIdImgBack = await axios.get(
        //     `https://alchemyapi.khans.io/alchemy/getNFTImages?network=eth&contractAddress=${MunieTokenAddress}&tokenIds=${getMunieStakerData.tokenIds}`
        // );

        // console.log("MunieWithdrawList", stakingTokenIdImgBack);

        const stakedSPRV2TokenIdApi = stakingTokenIdImgBack.data.data;

        const withdrawSPRV2StakedAmountApi = getSPRV2StakerData.countStaked;

        let [stakedSPRV2TokenId, withdrawSPRV2StakedAmount] = await Promise.all([stakedSPRV2TokenIdApi, withdrawSPRV2StakedAmountApi]);

        dispatch({
          type: "SPRV2_WITHDRAW_LIST",
          payload: {
            stakedSPRV2TokenId: stakedSPRV2TokenId,
            withdrawSPRV2StakedAmount: withdrawSPRV2StakedAmount,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const SPRV2WithdrawListAction = { SPRV2WithdrawListAct };
