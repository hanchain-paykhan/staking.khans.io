import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanRewardSection.scss";
import { OptimismRedLogo, HanLogo } from "../../assets/_index";
import Swal from "sweetalert2";
import { hanStakingRewardViewAction } from "../../redux/actions/hanStakingActions/hanStakingRewardViewAction";
import { hanStakingClaimAction } from "../../redux/actions/hanStakingActions/hanStakingClaimAction";
import { FiRefreshCcwIcon } from "../Icons/reactIcons";
import Loading from "../SprStakingPage/Loading";

const HanRewardSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

  const { totalHanStakedAmount, totalSupply, hanRewardPerSecondView, hanTotalRewardReleased } = useSelector(
    (state) => state.hanStakingView
  );

  //---------------- Optimism Network Switching ---------------- //
  const changeOpNetwork = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          Swal.fire({
            title: "Switch Network",
            html: "Project requires that you switch your wallet to the Optimism network to continue.",
            showConfirmButton: false,
          });
        } catch (addError) {
          console.log(addError);
        }
      }
    }
  };

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x50Bce64397C75488465253c0A034b8097FeA6578";
    const tokenSymbol = "HAN";
    const tokenDecimals = 18;
    const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

    try {
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
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

  const changeHanStakingRewardState = () => {
    dispatch(hanStakingRewardViewAction.hanStakingRewardViewAct(account));
  };

  const setHanChainClaim = () => {
    dispatch(hanStakingClaimAction.hanStakingClaimAct(account));
  };

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("0xa");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    if (account) {
      dispatch(hanStakingRewardViewAction.hanStakingRewardViewAct(account));
    }
  }, [account]);
  return (
    <>
      {checkChainId === "0xa" ? (
        <div>
          <>
            <div className="han-Staking-Reward-Quaota-Section">
              <p>TOTAL STAKED : {totalSupply} </p>
            </div>
            <div className="han-Staking-Reward-StakeAmount-Section">
              <p>STAKED : {totalHanStakedAmount} </p>
            </div>
            <div className="han-Staking-Reward-EstSection">
              <p>
                Estimated Interest : {hanRewardPerSecondView}
                <FiRefreshCcwIcon className="han-Staking-Reward-RefreshIcon" onClick={changeHanStakingRewardState} />
                HAN
              </p>
            </div>
            {/* <div className="han-Staking-Reward-AccSection">
                     <p>Accumulated Interest : {hanRewardPerSecondView} HAN</p>
                 </div> */}
            <div className="han-Staking-Reward-InterSection">
              <p>Rewarded Interest : {hanTotalRewardReleased} HAN </p>
            </div>

            {/* 리워드 안될때 상태 추가 */}
            {hanRewardPerSecondView === "0" ? (
              <div className="han-Staking-Rewards-ClaimBtnSection">
                <button className="han-Staking-Reward-CantBtn" disabled={true}>
                  NOTHING TO CLAIM
                </button>
              </div>
            ) : (
              <div className="han-Staking-Rewards-ClaimBtnSection">
                <button className="han-Staking-Reward-CanBtn" onClick={setHanChainClaim}>
                  CLAIM
                </button>
              </div>
            )}
          </>
          <div className="logoContainer">
            <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
            <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
          </div>
        </div>
      ) : (
        <>
          <div className="han-Staking-Deposit-LoadingContainer">
            <Loading />
          </div>
          <div className="logoContainer">
            <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
            <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
          </div>
        </>
      )}
    </>
  );
};

export default HanRewardSection;
