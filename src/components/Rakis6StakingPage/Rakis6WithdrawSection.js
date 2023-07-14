import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6WithdrawSection.scss";
import Web3 from "web3";
import { stakingViewAction } from "../../redux/actions/rakis6StakingActions/stakingViewAction";
import { stakingCancelAction } from "../../redux/actions/rakis6StakingActions/stakingCancelAction";

const Rakis6WithdrawSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { account } = useSelector((state) => state.account);
  const { getAmount } = useSelector((state) => state.stakingView);

  const changeWithdrawAmount = (e) => {
    const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
    if (pattern.test(e.target.value)) {
      setWithdrawAmount(e.target.value);
    }
  };

  const changeMaxWithdrawAmount = () => {
    setWithdrawAmount(getAmount);
  };

  const unStaking = () => {
    let unstakingAmountSet = document.getElementById("maxUnstakeAmount").value;
    // const unstakingnum = AmountBN.multipliedBy(
    //   new BigNumber(unstakingAmountSet)
    // );
    const unstakingnum = Web3.utils.toWei(String(unstakingAmountSet), "ether");
    dispatch(stakingCancelAction.stakingCancelAct(account, unstakingnum));
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
      <div className="withdrawAmountSection">
        <input
          type="number"
          step="0.00000000000001"
          id="maxUnstakeAmount"
          placeholder="0"
          onChange={changeWithdrawAmount}
          value={withdrawAmount}
        ></input>
        <p className="amountTxt">RAKIS-6</p>
        <button className="amountMaxBtn" onClick={changeMaxWithdrawAmount}>
          Max
        </button>
      </div>
      <div className="withdrawUnstakeBtnSection">
        {withdrawAmount === "" ? (
          <div className="unStakeBtnSection">
            <button className="enter-learn-more">ENTER AMOUNT</button>
          </div>
        ) : getAmount === 0 || withdrawAmount > getAmount ? (
          <div className="unStakeCantBtnSection">
            <button className="cant-learn-more" disabled={true}>
              INSUFFICIENT RAKIS-6 BALANCE
            </button>
          </div>
        ) : (
          <div className="unStakeBtnSection">
            <button className="learn-more" onClick={unStaking}>
              UNSTAKE
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Rakis6WithdrawSection);
