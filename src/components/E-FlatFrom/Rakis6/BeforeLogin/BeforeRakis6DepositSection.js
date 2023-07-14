import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ArrakisBlackIcon, HanLogo, OptimismRedLogo } from "../../../../assets/_index";
import "../AfterLogin/Rakis6DepositSection.scss";

const BeforeRakis6DepositSection = () => {
  const [checkChainId, setCheckChainId] = useState("");

  const { rakis6StakingBalanceOf, canStakedQuatoAmount, HanQuantityLpQuantityPerYear1HanValue } = useSelector(
    (state) => state.rakis6AirDropView
  );

  const { rakis6TotalRewardAmount } = useSelector((state) => state.rakis6AirDropReward);

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

  // add to LP token
  const addStakingToken = async () => {
    const tokenAddress = "0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f";
    const tokenSymbol = "LP";
    const tokenDecimals = 18;
    const tokenImage = "https://github.com/sieun95/develop_note/blob/main/Arrakis%20Icon%20(monochrome).png?raw=true";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
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
      <>
        <div className="rakis6-AirDrop-Deposit-Quaota-Section">
          <p>STAKED : {rakis6TotalRewardAmount}</p>
        </div>
        <div className="rakis6-AirDrop-Deposit-StakeAmount-Section">
          <p>Available Quota : {canStakedQuatoAmount}</p>
        </div>
      </>
      <div className="stakingMunieAmountContainer">
        <div className="stakingMunieAmountTitle">
          <div className="stakingMunieAmountTxt">
            <a>0.000000048445704606 HAN</a>
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
          <a>for each 1Rakis6 per second</a>
        </div>
      </div>
      {/* <div className="rakis6-AirDrop-Deposit-APR-Container">
                <div className="rakis6-AirDrop-Deposit-APR-Title">
                    <a>APR</a>
                </div>
                <div className="rakis6-AirDrop-Deposit-APR-Info">
                    <a>{HanQuantityLpQuantityPerYear1HanValue}%</a>
                </div>
            </div> */}
      <>
        <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
          <p>Available : {rakis6StakingBalanceOf} </p>
        </div>
        <div className="rakis6-AirDrop-Deposit-AmountSection">
          <input type="number" step="0.00000000000001" id="maxRakis6StakeAmount" placeholder="0"></input>
          <p>RAKIS-6</p>
          <button className="rakis6-AirDrop-Deposit-AmountMaxBtn">Max</button>
        </div>
        <div className="rakis6-AirDrop-DepositStakeBtnSection">
          <button className="rakis6-AirDrop-Deposit-EnterBtn">ENTER AMOUNT</button>
        </div>
      </>
      <div className="logoContainer">
        <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
        {/* <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" /> */}
        <img src={ArrakisBlackIcon} onClick={addStakingToken} className="arrakisIcon" alt="ArrakisIcon" />
        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
      </div>
    </div>
  );
};

export default BeforeRakis6DepositSection;
