import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HanLogo } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import "../AfterLogin/MunieWithdrawSection.scss";

const BeforeMunieWithdrawSection = () => {
  const dispatch = useDispatch();

  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);
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

  // useEffect(() => {
  //     dispatch(munieWithdrawListAction.munieWithdrawListAct(account));
  // }, [account]);

  return (
    <div>
      <div className="stakedMunieCanAmountSection">
        <p>STAKED : {munieAmountStaked}</p>
      </div>
      <div className="munieStakingWithdrawContainer">
        <div className="munieStakingCantChoiceContainer">
          <div className="munieStakingCantChoiceSection">
            <a className="cantStakingMunieBtn" disabled={true}>
              INSUFFICIENT BALANCE
            </a>
          </div>
        </div>
      </div>

      <div className="logoContainer">
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

export default BeforeMunieWithdrawSection;
