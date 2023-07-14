import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6RewardSection.scss";
import { stakingRewardAction } from "../../redux/actions/rakis6StakingActions/stakingRewardAction";
import { stakingResultViewAction } from "../../redux/actions/rakis6StakingActions/stakingResultViewAction";
import { FiRefreshCcwIcon } from "../Icons/reactIcons";

const Rakis6RewardSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);
  const { resultValue, getBalance, getRewardReleased } = useSelector((state) => state.rakis6StakingResultView);

  const rewardClaim = () => {
    dispatch(stakingRewardAction.stakingRewardAct(account));
  };

  const changeState = () => {
    dispatch(stakingResultViewAction.stakingResultViewAct(account));
    // dispatch(stakingViewAction.stakingViewAct(account));
  };

  useEffect(() => {
    dispatch(stakingResultViewAction.stakingResultViewAct(account));
  }, [account]);

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  return (
    <>
      <div className="allRewardsCumulativeSection">
        <p>
          Estimated Interest : {resultValue}
          <FiRefreshCcwIcon className="allRefreshClaimIcon" onClick={changeState} />
          HAN
        </p>
      </div>
      <div className="amountTokenRewardAccSection">
        <p>Accumulated Interest : {getBalance} HAN</p>
      </div>
      <div className="amountTokenRewardTxtSection">
        <p>Rewarded Interest : {getRewardReleased} HAN </p>
      </div>
      <div className="rewardsClaimBtnSection">
        {resultValue + getBalance <= 0 ? (
          <button className="cant-learn-more" disabled={true}>
            NOTHING TO CLAIM
          </button>
        ) : (
          <button className="learn-more" onClick={rewardClaim}>
            CLAIM
          </button>
        )}
      </div>
    </>
  );
};

export default Rakis6RewardSection;
