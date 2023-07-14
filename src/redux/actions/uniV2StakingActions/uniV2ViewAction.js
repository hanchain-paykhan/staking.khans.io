import { StakingTokenContract, StakingUniV2Contract, web3 } from "../../../config/new/StakingUniV2Config";
// import { StakingTokenContract, StakingRakis6Contract } from "../../../config/new/StakingRakis6ConfigTest";

function uniV2ViewAct(account) {
  return async (dispatch) => {
    try {
      if (account) {
        const uniV2StakingTokenBalanceApi = await StakingTokenContract.methods.balanceOf(account).call();

        const uniV2StakingTokenBalance = web3.utils.fromWei(String(uniV2StakingTokenBalanceApi), "ether");

        const uniV2StakerApi = await StakingUniV2Contract.methods.stakers(account).call();

        const uniV2StakedAmount = web3.utils.fromWei(String(uniV2StakerApi.amount), "ether");
        const uniV2StakedrewardReleased = web3.utils.fromWei(String(uniV2StakerApi.rewardReleased), "ether");
        const uniV2StakedunclaimedReward = web3.utils.fromWei(String(uniV2StakerApi.unclaimedReward), "ether");

        // 컨트랙트에 유저들이 스테이킹한 토큰 양
        const uniV2TotalSupplyApi = await StakingUniV2Contract.methods.totalSupply().call();

        const uniV2TotalSupply = web3.utils.fromWei(String(uniV2TotalSupplyApi), "ether");

        dispatch({
          type: "UNIV2_STAKING_VIEW_SUCCESS",
          payload: {
            uniV2StakingTokenBalance: uniV2StakingTokenBalance,
            uniV2StakedAmount: uniV2StakedAmount,
            uniV2StakedrewardReleased: uniV2StakedrewardReleased,
            uniV2StakedunclaimedReward: uniV2StakedunclaimedReward,
            uniV2TotalSupply: uniV2TotalSupply,
          },
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const uniV2ViewAction = { uniV2ViewAct };
