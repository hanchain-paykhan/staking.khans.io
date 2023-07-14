import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksAction } from "../../redux/actions/networksAction";
import "./SprRewardSection.scss";
import { SPRV2ClaimAction } from "../../redux/actions/SPRV2StakingActions/SPRV2ClaimAction";
import { SPRV2ResultViewAction } from "../../redux/actions/SPRV2StakingActions/SPRV2ResultViewAction";
import { SPRV2StakingViewAction } from "../../redux/actions/SPRV2StakingActions/SPRV2StakingViewAction";
import { FiRefreshCcwIcon } from "../Icons/reactIcons";

const SprRewardSection = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);

  const { SPRV2AmountStaked } = useSelector((state) => state.SPRV2StakingView);

  const { SPRV2ResultValue, getSPRV2UnClaimedRewards, getSPRV2TotalReward } = useSelector((state) => state.SPRV2StakingResult);

  const changeEthereumNetWork = () => {
    dispatch(networksAction.changeEthereumNetWorkAct());
  };
  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070";
    const tokenSymbol = "HANeP";
    const tokenDecimals = 18;
    // const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

    try {
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            // image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sprClaim = () => {
    dispatch(SPRV2ClaimAction.SPRV2ClaimAct(account));
  };

  const changeSprState = () => {
    dispatch(SPRV2ResultViewAction.SPRV2ResultViewAct(account));
  };

  useEffect(() => {
    dispatch(SPRV2ResultViewAction.SPRV2ResultViewAct(account));
    dispatch(SPRV2StakingViewAction.SPRV2StakingViewAct(account));
  }, [account]);

  return (
    <div>
      <div className="stakedSprCanAmountSection">
        <p>STAKED : {SPRV2AmountStaked} </p>
      </div>
      <div className="allRewardsSPRV2CumulativeSection">
        <p>
          Estimated Interest : {SPRV2ResultValue} <FiRefreshCcwIcon className="allRefreshSprClaimIcon" onClick={changeSprState} /> HANeP
        </p>
      </div>
      <div className="amountTokenSprRewardAccSection">
        <p>Accumulated Interest : {getSPRV2UnClaimedRewards} HANeP</p>
      </div>
      <div className="amountTokenRewardSprTxtSection">
        <p>Rewarded Interest : {getSPRV2TotalReward} HANeP </p>
      </div>
      <div className="rewardsClaimSprBtnSection">
        {SPRV2ResultValue + getSPRV2UnClaimedRewards <= 0 ? (
          <button className="cant-spr-learn-more" disabled={true}>
            NOTHING TO CLAIM
          </button>
        ) : (
          <button className="spr-learn-more" onClick={sprClaim}>
            CLAIM
          </button>
        )}
      </div>
      <div className="logoRewardContainer">
        <img
          src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
          onClick={changeEthereumNetWork}
          className="opIcon"
          alt="EthereumIcon"
        />
        <div className="HanEpTxtContinaer">
          <span className="HanEpTxt" onClick={addRewardToken}>
            HANeP
          </span>
        </div>
      </div>
    </div>
  );
};

export default SprRewardSection;
