import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HanLogo } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import { oldMunieStakingRewardAction } from "../../../../redux/actions/OldEPlatActions/OldMuineActions/oldMunieStakingRewardAction";
import { oldMunieStakingResultViewAction } from "../../../../redux/actions/OldEPlatActions/OldMuineActions/oldMunieStakingResultViewAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";
import { oldMunieWithdrawListAction } from "../../../../redux/actions/OldEPlatActions/OldMuineActions/oldMunieWithdrawListAction";
import { oldMunieViewAction } from "../../../../redux/actions/OldEPlatActions/OldMuineActions/oldMunieViewAction";

const OldMunieRewardSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);
  const { oldMunieStakedAmount } = useSelector((state) => state.oldMunieStakingView);
  const { oldMunieResultValue, getOldMunieUnClaimedRewards, getOldMunieTotalReward } = useSelector((state) => state.oldMunieStakingResult);
  const changeEthereumNetWork = () => {
    dispatch(networksAction.changeEthereumNetWorkAct());
  };

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0xC7483FbDB5c03E785617a638E0f22a08da10084B";
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

  const munieClaim = () => {
    dispatch(oldMunieStakingRewardAction.oldMunieStakingRewardAct(account));
  };

  const changeMunieResultState = () => {
    dispatch(oldMunieStakingResultViewAction.oldMunieStakingResultViewAct(account));
  };

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
    if (window.ethereum?.chainId === "0x5") {
      setCheckChainId("0x5");
    }
    if (window.ethereum?.chainId === "0x1a4") {
      setCheckChainId("0x1a4");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    dispatch(oldMunieWithdrawListAction.oldMunieWithdrawListAct(account));
    dispatch(oldMunieStakingResultViewAction.oldMunieStakingResultViewAct(account));
    dispatch(oldMunieViewAction.oldMunieViewAct(account));
  }, [account]);
  return (
    <div>
      <div className="stakingMunieAmountContainer">
        <div className="stakingMunieAmountTitle">
          <div className="stakingMunieAmountTxt">
            <a>0.000001157407407407 HAN</a>
          </div>

          {/* <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <HelpIcon />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                    characters from Sewoori Union for AdKhan: Advertising Platform
                                </span>
                                <span className="align-right">
                                    {" "}
                                    <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div> */}
        </div>
        <div className="stakingMunieAmountNum">
          <a>for each NFT per second</a>
        </div>
      </div>
      <div className="stakedMunieCanAmountSection">
        <p>STAKED : {oldMunieStakedAmount} </p>
      </div>
      <div className="allRewardsMunieCumulativeSection">
        <p>
          Estimated Interest : {oldMunieResultValue}
          <FiRefreshCcwIcon className="allRefreshMunieClaimIcon" onClick={changeMunieResultState} />
          HAN
        </p>
      </div>
      <div className="amountTokenMunieRewardAccSection">
        <p>Accumulated Interest : {getOldMunieUnClaimedRewards} HAN</p>
      </div>
      <div className="amountTokenRewardMunieTxtSection">
        <p>Rewarded Interest : {getOldMunieTotalReward} HAN </p>
      </div>
      <div className="rewardsClaimMunieBtnSection">
        {oldMunieResultValue + getOldMunieUnClaimedRewards <= 0 ? (
          <button className="cant-munie-learn-more" disabled={true}>
            NOTHING TO CLAIM
          </button>
        ) : (
          <button className="munie-learn-more" onClickCapture={munieClaim}>
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
        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
      </div>
    </div>
  );
};

export default OldMunieRewardSection;
