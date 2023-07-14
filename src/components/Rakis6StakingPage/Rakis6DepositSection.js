import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6DepositSection.scss";
import Web3 from "web3";
import { stakingApproveAction } from "../../redux/actions/rakis6StakingActions/stakingApproveAction";
import { stakingAction } from "../../redux/actions/rakis6StakingActions/stakingAction";
import { stakingViewAction } from "../../redux/actions/rakis6StakingActions/stakingViewAction";
import Loading from "../SprStakingPage/Loading";

const Rakis6DepositSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);
  const { stakingTokenBalance, successApprove, HanQuantityLpQuantityPerYear1HanValue, allowanceAmount } = useSelector(
    (state) => state.stakingView
  );
  const [stakingAmount, setStakingAmount] = useState(0);
  const isZeroAmount = stakingAmount === "0" || stakingAmount === "00" || stakingAmount === "000" || stakingAmount === "0000";

  const changeStakingAmount = (e) => {
    const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
    if (pattern.test(e.target.value)) {
      setStakingAmount(e.target.value);
    }
  };

  const changeMaxDepositAmount = () => {
    setStakingAmount(stakingTokenBalance);
  };

  const Approve = () => {
    let stakingAmountSet = document.getElementById("maxStakeAmount").value;
    // const stakingnum = AmountBN.multipliedBy(new BigNumber(stakingAmountSet));
    const stakingnum = Web3.utils.toWei(String(stakingAmountSet), "ether");
    dispatch(stakingApproveAction.stakingApproveAct(account, stakingnum));
  };

  const staking = () => {
    let stakingAmountSet = document.getElementById("maxStakeAmount").value;
    // const stakingnum = AmountBN.multipliedBy(new BigNumber(stakingAmountSet));
    const stakingnum = Web3.utils.toWei(String(stakingAmountSet), "ether");
    dispatch(stakingAction.stakingAct(account, stakingnum));
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
    dispatch(stakingViewAction.stakingViewAct(account));
  }, [account]);

  return (
    <>
      {HanQuantityLpQuantityPerYear1HanValue ? (
        stakingAmount === 0 || stakingAmount === "" ? (
          <>
            <div className="stakingTokenBalanceSection">
              <p>Available : {stakingTokenBalance}</p>
            </div>
            <div className="depositAmountSection">
              <input
                type="number"
                step="0.000000000000001"
                id="maxStakeAmount"
                placeholder="0"
                onChange={changeStakingAmount}
                value={stakingAmount}
              ></input>
              <p className="amountTxt">RAKIS-6</p>
              <button className="amountMaxBtn" onClick={changeMaxDepositAmount}>
                Max
              </button>
            </div>
            <div className="depositStakeBtnSection">
              <button className="enter-learn-more">ENTER AMOUNT</button>
            </div>
          </>
        ) : isZeroAmount || stakingTokenBalance === 0 || stakingAmount > stakingTokenBalance ? (
          <>
            <div className="stakingTokenBalanceSection">
              <p>Available : {stakingTokenBalance}</p>
            </div>
            <div className="depositAmountSection">
              <input
                type="number"
                step="0.00000000000001"
                id="maxStakeAmount"
                placeholder="0"
                onChange={changeStakingAmount}
                value={stakingAmount}
              ></input>
              <p className="amountTxt">RAKIS-6</p>
              <button className="amountMaxBtn" onClick={changeMaxDepositAmount}>
                Max
              </button>
            </div>
            <div className="depositStakeBtnSection">
              <button className="cant-learn-more" disabled={true}>
                INSUFFICIENT RAKIS-6 BALANCE
              </button>
            </div>
          </>
        ) : allowanceAmount < stakingTokenBalance ? (
          <>
            <div className="stakingTokenBalanceSection">
              <p>Available : {stakingTokenBalance}</p>
            </div>
            <div className="depositAmountSection">
              <input
                type="number"
                step="0.00000000000001"
                id="maxStakeAmount"
                placeholder="0"
                onChange={changeStakingAmount}
                value={stakingAmount}
              ></input>
              <p className="amountTxt">RAKIS-6</p>
              <button className="amountMaxBtn" onClick={changeMaxDepositAmount}>
                Max
              </button>
            </div>
            <div className="depositStakeBtnSection">
              <button className="learn-more" onClick={Approve}>
                APPROVE
              </button>
            </div>
          </>
        ) : allowanceAmount >= stakingTokenBalance ? (
          <>
            <div className="stakingTokenBalanceSection">
              <p>Available : {stakingTokenBalance}</p>
            </div>
            <div className="depositAmountSection">
              <input
                type="number"
                step="0.00000000000001"
                id="maxStakeAmount"
                placeholder="0"
                onChange={changeStakingAmount}
                value={stakingAmount}
              ></input>
              <p className="amountTxt">RAKIS-6</p>
              <button className="amountMaxBtn" onClick={changeMaxDepositAmount}>
                Max
              </button>
            </div>
            <div className="depositStakeBtnSection">
              <button className="learn-more" onClick={staking}>
                STAKE
              </button>
            </div>
          </>
        ) : successApprove === false ? (
          <>
            <div className="stakingTokenBalanceSection">
              <p>Available : {stakingTokenBalance}</p>
            </div>
            <div className="depositAmountSection">
              <input
                type="number"
                step="0.00000000000001"
                id="maxStakeAmount"
                placeholder="0"
                onChange={changeStakingAmount}
                value={stakingAmount}
              ></input>
              <p className="amountTxt">RAKIS-6</p>
              <button className="amountMaxBtn" onClick={changeMaxDepositAmount}>
                Max
              </button>
            </div>
            <div className="depositStakeBtnSection">
              <button className="learn-more" onClick={Approve}>
                APPROVE
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="stakingTokenBalanceSection">
              <p>Available : {stakingTokenBalance}</p>
            </div>
            <div className="depositAmountSection">
              <input
                type="number"
                step="0.00000000000001"
                id="maxStakeAmount"
                placeholder="0"
                // onChange={changeStakingAmount}
                value={stakingAmount}
              ></input>
              <p className="amountTxt">RAKIS-6</p>
              <button className="amountMaxBtn" onClick={changeMaxDepositAmount}>
                Max
              </button>
            </div>
            <div className="depositStakeBtnSection">
              <button className="learn-more" onClick={staking}>
                STAKE
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <div className="depositLoadingAmountSection">
            <Loading />
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(Rakis6DepositSection);
