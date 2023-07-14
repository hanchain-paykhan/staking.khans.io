import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MunieRewardSection.scss";
import { HanLogo, RefreshIcon } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import { munieStakingRewardAction } from "../../../../redux/actions/munieStakingActions/munieStakingRewardAction";
import { munieStakingResultViewAction } from "../../../../redux/actions/munieStakingActions/munieStakingResultViewAction";
import { munieStakingViewAction } from "../../../../redux/actions/munieStakingActions/munieStakingViewAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const MunieRewardSection = () => {
  const dispatch = useDispatch();

  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

  const { munieAmountStaked } = useSelector((state) => state.munieStakingView);

  const { munieResultValue, getMunieUnClaimedRewards, getMunieTotalReward } = useSelector((state) => state.munieStakingResultView);

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

  const munieClaim = () => {
    dispatch(munieStakingRewardAction.munieStakingRewardAct(account));
  };

  const changeMunieV2ResultState = () => {
    dispatch(munieStakingResultViewAction.munieStakingResultViewAct(account));
    console.log("바끼나?");
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

  // useEffect(() => {
  //     if (account) {
  //         dispatch(munieStakingViewAction.munieStakingViewAct(account));
  //         dispatch(munieStakingResultViewAction.munieStakingResultViewAct(account));
  //     }
  // }, []);
  useEffect(() => {
    dispatch(munieStakingViewAction.munieStakingViewAct(account));
  }, [account]);

  return (
    <div>
      <div className="stakingMunieAmountContainer">
        <div className="stakingMunieAmountTitle">
          <div className="stakingMunieAmountTxt">
            <a>0.000001157407407407 HANeP</a>
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
        <p>STAKED : {munieAmountStaked} </p>
      </div>
      <div className="allRewardsMunieCumulativeSection">
        <p>
          Estimated Interest : {munieResultValue}
          <img src={RefreshIcon} width="20px" height="20px" className="allRefreshMunieClaimIcon" onClick={changeMunieV2ResultState}></img>
          HANeP
        </p>
      </div>
      <div className="amountTokenMunieRewardAccSection">
        <p>Accumulated Interest : {getMunieUnClaimedRewards} HANeP</p>
      </div>
      <div className="amountTokenRewardMunieTxtSection">
        <p>Rewarded Interest : {getMunieTotalReward} HANeP </p>
      </div>
      <div className="rewardsClaimMunieBtnSection">
        {munieResultValue + getMunieUnClaimedRewards <= 0 ? (
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
        <div className="HanEpTxtContinaer">
          <span className="HanEpTxt" onClick={addRewardToken}>
            HANeP
          </span>
        </div>
      </div>
    </div>
  );
};

export default MunieRewardSection;
