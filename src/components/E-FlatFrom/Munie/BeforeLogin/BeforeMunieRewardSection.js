import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HanLogo } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/MunieRewardSection.scss";

const BeforeMunieRewardSection = () => {
  const dispatch = useDispatch();

  const [checkChainId, setCheckChainId] = useState("");

  const { munieAmountStaked } = useSelector((state) => state.munieStakingView);

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

  return (
    <div>
      <div className="stakedMunieCanAmountSection">
        <p>STAKED : {munieAmountStaked} </p>
      </div>
      <div className="allRewardsMunieCumulativeSection">
        <p>
          Estimated Interest : 0
          <FiRefreshCcwIcon className="allRefreshMunieClaimIcon" />
          HANeP
        </p>
      </div>
      <div className="amountTokenMunieRewardAccSection">
        <p>Accumulated Interest : 0 HANeP</p>
      </div>
      <div className="amountTokenRewardMunieTxtSection">
        <p>Rewarded Interest : 0 HANeP </p>
      </div>
      <div className="rewardsClaimMunieBtnSection">
        <button className="cant-spr-learn-more" disabled={true}>
          NOTHING TO CLAIM
        </button>
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

export default BeforeMunieRewardSection;
