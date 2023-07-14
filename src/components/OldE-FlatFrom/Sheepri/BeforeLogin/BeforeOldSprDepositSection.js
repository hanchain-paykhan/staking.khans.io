import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HanLogo } from "../../../../assets/_index";
import { networksAction } from "../../../../redux/actions/networksAction";
import { oldSprStakingViewAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldSprStakingViewAction";
import { MdHelpIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/OldSprDepositSection.scss";

const BeforeOldSprDepositSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

  const { getOldSprAmountStaked, getOldSprMyTokenIds } = useSelector((state) => state.oldSprStakingView);

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x0c90C57aaf95A3A87eadda6ec3974c99D786511F";
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

  const changeEthereumNetWork = () => {
    dispatch(networksAction.changeEthereumNetWorkAct());
  };

  useEffect(() => {
    dispatch(oldSprStakingViewAction.oldSprStakingViewAct(account));
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
    <div>
      <div className="oldSprstakingAmountTitle">
        <div className="stakingSprAmountTitle">
          <div className="stakingSprAmountTxt">
            <a>0.000001157407407407 HAN</a>
          </div>

          <div className="tooltip-container">
            <i className="info-icon material-icons">
              <MdHelpIcon />
            </i>
            <div className="tooltip-content">
              <span>
                The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                characters from Sewoori Union for AdKhan: Advertising Platform
              </span>
              <span className="align-right">
                <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                  Read More
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="stakingSprAmountNum">
          <a>for each NFT per second</a>
        </div>
      </div>
      <div className="stakedSprCanAmountSection">
        <p>STAKED : {getOldSprAmountStaked} </p>
      </div>
      <div className="sprStakingDepositContainer">
        <div className="sprStakingCantChoiceImgContainer">
          <div className="sprStakingCantChoiceImgSection">
            <a className="cantStakingSprBtn" disabled={true}>
              INSUFFICIENT BALANCE
            </a>
          </div>
        </div>
        {/* <div className="sprStakingSelectBtnSection">
                  <button onClick={sprMint}>Test Minting</button>
                  <button onClick={test}>Test Token</button>
                </div> */}
      </div>

      <div className="logoContainer">
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

export default BeforeOldSprDepositSection;
