import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UniV2WithdrawSection.scss";
import { networksAction } from "../../redux/actions/networksAction";
import { uniV2UnStakeAction } from "../../redux/actions/uniV2StakingActions/uniV2UnStakeAction";
import Web3 from "web3";

const UniV2WithdrawSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [uniV2WithdrawAmount, setUniV2WithdrawAmount] = useState("");

  const { account } = useSelector((state) => state.account);
  const { uniV2StakedAmount, uniV2TotalSupply } = useSelector((state) => state.uniV2View);

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

  const changeUsdcMaxWithdrawAmount = () => {
    setUniV2WithdrawAmount(uniV2StakedAmount);
  };

  const changeUsdcRakis6Amount = (e) => {
    const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
    if (pattern.test(e.target.value)) {
      setUniV2WithdrawAmount(e.target.value);
    }
  };

  const setUsdcRakis6UnStake = () => {
    let hanRakis6UnStakeAmount = document.getElementById("maxUniV2UnStakeAmount").value;
    const hanRakis6UnStakeNum = Web3.utils.toWei(String(hanRakis6UnStakeAmount), "ether");
    dispatch(uniV2UnStakeAction.uniV2UnStakeAct(account, hanRakis6UnStakeNum));
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
        <div className="uniV2-Staking-Withdraw-Quaota-Section">
          <p>TOTAL STAKED : {uniV2TotalSupply}</p>
        </div>
        <div className="uniV2-Staking-Withdraw-StakeAmount-Section">
          <p>STAKED : {uniV2StakedAmount} </p>
        </div>
      </>

      <div className="uniV2-Staking-Withdraw-AmountSection">
        <input
          type="number"
          step="0.000000000000000001"
          id="maxUniV2UnStakeAmount"
          placeholder="0"
          onChange={changeUsdcRakis6Amount}
          value={uniV2WithdrawAmount}
        ></input>
        <p>UNI-V2</p>
        <button className="uniV2-Staking-Withdraw-AmountMaxBtn" onClick={changeUsdcMaxWithdrawAmount}>
          Max
        </button>
        {/* <button className="uniV2-Staking-Withdraw-AmountMaxBtn" onClick={changeMaxHanWithdrawAmount}>
            Max
        </button> */}
      </div>

      <div className="uniV2-Staking-WithDraw-BtnContainer">
        <div className="uniV2-Staking-Withdraw-Can-BtnSection">
          {uniV2WithdrawAmount === "" ? (
            <button className="uniV2-Staking-Withdraw-SelectBtn">ENTER AMOUNT</button>
          ) : uniV2StakedAmount === "0" || uniV2WithdrawAmount > uniV2StakedAmount ? (
            <button className="uniV2-Staking-Withdraw-SelectBtn" disabled={true}>
              INSUFFICIENT RAKIS-6 BALANCE
            </button>
          ) : (
            <button className="uniV2-Staking-Withdraw-CanBtn" onClick={setUsdcRakis6UnStake}>
              UNSTAKE
            </button>
          )}
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
        {/* <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" /> */}
      </div>
    </div>
  );
};

export default React.memo(UniV2WithdrawSection);
