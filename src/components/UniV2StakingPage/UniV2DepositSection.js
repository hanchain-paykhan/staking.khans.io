import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UniV2DepositSection.scss";
import { networksAction } from "../../redux/actions/networksAction";
import { uniV2ViewAction } from "../../redux/actions/uniV2StakingActions/uniV2ViewAction";
import Web3 from "web3";
import Loading from "../SprStakingPage/Loading";
import { uniV2ApproveStateAction } from "../../redux/actions/uniV2StakingActions/uniV2ApproveStateAction";
import { uniV2StakeAction } from "../../redux/actions/uniV2StakingActions/uniV2StakeAction";
import { uniV2ApproveAction } from "../../redux/actions/uniV2StakingActions/uniV2ApproveAction";

const UniV2DepositSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [uniV2StakingAmount, setUniV2StakingAmount] = useState(0);
  const { account } = useSelector((state) => state.account);

  const { uniV2StakingTokenBalance, successUniV2Approve, uniV2ApproveState, uniV2StakedAmount, uniV2TotalSupply } = useSelector(
    (state) => state.uniV2View
  );

  const isZeroAmount =
    uniV2StakingAmount === "0" || uniV2StakingAmount === "00" || uniV2StakingAmount === "000" || uniV2StakingAmount === "0000";

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

  const changeUniV2DepositAmount = (e) => {
    const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
    if (pattern.test(e.target.value)) {
      setUniV2StakingAmount(e.target.value);
    }
  };

  const changeUniV2MaxDepositAmount = () => {
    setUniV2StakingAmount(uniV2StakingTokenBalance);
  };

  const setUniV2Approve = () => {
    let uniV2StakingAmount = document.getElementById("maxUniV2StakeAmount").value;
    const uniV2StakingNum = Web3.utils.toWei(String(uniV2StakingAmount), "ether");
    dispatch(uniV2ApproveAction.uniV2ApproveAct(account, uniV2StakingNum));
  };

  const setUniV2Stake = () => {
    let uniV2StakingAmount = document.getElementById("maxUniV2StakeAmount").value;
    const uniV2StakingNum = Web3.utils.toWei(String(uniV2StakingAmount), "ether");
    dispatch(uniV2StakeAction.uniV2StakeAct(account, uniV2StakingNum));
  };

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    dispatch(uniV2ViewAction.uniV2ViewAct(account));
    dispatch(uniV2ApproveStateAction.uniV2ApproveStateAct(account));
  }, [account]);

  return (
    <div>
      <>
        <div className="uniV2-Staking-Deposit-Quaota-Section">
          <p>TOTAL STAKED : {uniV2TotalSupply} </p>
        </div>
        <div className="uniV2-Staking-Deposit-StakeAmount-Section">
          <p>STAKED : {uniV2StakedAmount} </p>
        </div>
      </>
      <>
        {uniV2TotalSupply ? (
          uniV2StakingAmount === 0 || uniV2StakingAmount === "" ? (
            <>
              <div className="uniV2-Staking-Deposit-TokenBalanceSection">
                <p>Available : {uniV2StakingTokenBalance} </p>
              </div>
              <div className="uniV2-Staking-Deposit-Approve-AmountSection">
                <input
                  type="number"
                  step="0.000000000000000001"
                  id="maxUniV2StakeAmount"
                  placeholder="0"
                  onChange={changeUniV2DepositAmount}
                  value={uniV2StakingAmount}
                ></input>
                <p>UNI-V2</p>
                <button className="uniV2-Staking-Deposit-AmountMaxBtn" onClick={changeUniV2MaxDepositAmount}>
                  Max
                </button>
              </div>

              <div className="uniV2-Staking-DepositStakeBtnSection">
                <button className="uniV2-Staking-Deposit-CanBtn">ENTER AMOUNT</button>
              </div>
            </>
          ) : isZeroAmount || uniV2StakingTokenBalance === 0 || uniV2StakingAmount > uniV2StakingTokenBalance ? (
            <>
              <div className="uniV2-Staking-Deposit-TokenBalanceSection">
                <p>Available : {uniV2StakingTokenBalance} </p>
              </div>
              <div className="uniV2-Staking-Deposit-Approve-AmountSection">
                <input
                  type="number"
                  step="0.000000000000000001"
                  id="maxUniV2StakeAmount"
                  placeholder="0"
                  onChange={changeUniV2DepositAmount}
                  value={uniV2StakingAmount}
                ></input>
                <p>UNI-V2</p>
                <button className="uniV2-Staking-Deposit-AmountMaxBtn" onClick={changeUniV2MaxDepositAmount}>
                  Max
                </button>
              </div>

              <div className="uniV2-Staking-DepositStakeBtnSection">
                <button className="uniV2-Staking-Deposit-CantBtn" disabled={true}>
                  INSUFFICIENT HAN BALANCE
                </button>
              </div>
            </>
          ) : uniV2ApproveState < uniV2StakingTokenBalance ? (
            <>
              <div className="uniV2-Staking-Deposit-TokenBalanceSection">
                <p>Available : {uniV2StakingTokenBalance} </p>
              </div>
              <div className="uniV2-Staking-Deposit-Approve-AmountSection">
                <input
                  type="number"
                  step="0.000000000000000001"
                  id="maxUniV2StakeAmount"
                  placeholder="0"
                  onChange={changeUniV2DepositAmount}
                  value={uniV2StakingAmount}
                ></input>
                <p>UNI-V2</p>
                <button className="uniV2-Staking-Deposit-AmountMaxBtn" onClick={changeUniV2MaxDepositAmount}>
                  Max
                </button>
              </div>

              <div className="uniV2-Staking-DepositStakeBtnSection">
                <button className="uniV2-Staking-Deposit-CanBtn" onClick={setUniV2Approve}>
                  APPROVE
                </button>
              </div>
            </>
          ) : uniV2ApproveState >= uniV2StakingTokenBalance ? (
            <>
              <div className="uniV2-Staking-Deposit-TokenBalanceSection">
                <p>Available : {uniV2StakingTokenBalance} </p>
              </div>
              <div className="uniV2-Staking-Deposit-Approve-AmountSection">
                <input
                  type="number"
                  step="0.000000000000000001"
                  id="maxUniV2StakeAmount"
                  placeholder="0"
                  onChange={changeUniV2DepositAmount}
                  value={uniV2ApproveState}
                ></input>
                <p>UNI-V2</p>
                <button className="uniV2-Staking-Deposit-AmountMaxBtn" onClick={changeUniV2MaxDepositAmount}>
                  Max
                </button>
              </div>

              <div className="uniV2-Staking-DepositStakeBtnSection">
                <button className="uniV2-Staking-Deposit-CanBtn" onClick={setUniV2Stake}>
                  STAKE
                </button>
              </div>
            </>
          ) : successUniV2Approve === false ? (
            <>
              <div className="uniV2-Staking-Deposit-TokenBalanceSection">
                <p>Available : {uniV2StakingTokenBalance} </p>
              </div>
              <div className="uniV2-Staking-Deposit-Approve-AmountSection">
                <input
                  type="number"
                  step="0.000000000000000001"
                  id="maxUniV2StakeAmount"
                  placeholder="0"
                  onChange={changeUniV2DepositAmount}
                  value={uniV2StakingAmount}
                ></input>
                <p>UNI-V2</p>
                <button className="uniV2-Staking-Deposit-AmountMaxBtn" onClick={changeUniV2MaxDepositAmount}>
                  Max
                </button>
              </div>

              <div className="uniV2-Staking-DepositStakeBtnSection">
                <button className="uniV2-Staking-Deposit-CanBtn" onClick={setUniV2Approve}>
                  APPROVE
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="uniV2-Staking-Deposit-TokenBalanceSection">
                <p>Available : {uniV2StakingTokenBalance} </p>
              </div>
              <div className="uniV2-Staking-Deposit-Approve-AmountSection">
                <input
                  type="number"
                  step="0.000000000000000001"
                  id="maxUniV2StakeAmount"
                  placeholder="0"
                  onChange={changeUniV2DepositAmount}
                  value={uniV2StakingAmount}
                ></input>
                <p>UNI-V2</p>
                <button className="uniV2-Staking-Deposit-AmountMaxBtn" onClick={changeUniV2MaxDepositAmount}>
                  Max
                </button>
              </div>

              <div className="uniV2-Staking-DepositStakeBtnSection">
                <button className="uniV2-Staking-Deposit-CanBtn" onClick={setUniV2Stake}>
                  STAKE
                </button>
              </div>
            </>
          )
        ) : (
          <div className="uniV2-Staking-Deposit-LoadingContainer">
            <Loading />
          </div>
        )}
      </>

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
        {/* <img src={HanLogo}  className="hanIcon" alt="HanIcon" /> */}
      </div>
    </div>
  );
};

export default React.memo(UniV2DepositSection);
