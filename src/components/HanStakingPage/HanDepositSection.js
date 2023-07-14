import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanDepositSection.scss";
import { OptimismRedLogo, HanLogo } from "../../assets/_index";
import Swal from "sweetalert2";
import { hanStakingViewAction } from "../../redux/actions/hanStakingActions/hanStakingViewActions";
import { hanStakingStakeAction } from "../../redux/actions/hanStakingActions/hanStakingStakeAction";
import { hanStakingApproveAction } from "../../redux/actions/hanStakingActions/hanStakingApproveAction";
import Web3 from "web3";
import { hanStakingApproveStateAction } from "../../redux/actions/hanStakingActions/hanStakingApproveStateAction";
import Loading from "../SprStakingPage/Loading";
import { HiOutlineLockClosedIcon } from "../Icons/reactIcons";

const HanDepositSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);
  const [hanStakingAmount, setHanStakingAmount] = useState(0);

  const { totalHanStakedAmount, totalSupply, hanChainBalanceOf, hanChainAllowance, successHanChainApprove } = useSelector(
    (state) => state.hanStakingView
  );
  // console.log(totalSupply);
  const isZeroAmount = hanStakingAmount === "00" || hanStakingAmount === "000" || hanStakingAmount === "0000";

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

  const changeHanDepositAmount = (e) => {
    const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
    if (pattern.test(e.target.value)) {
      setHanStakingAmount(e.target.value);
    }
  };

  const changeMaxHanDepositAmount = () => {
    setHanStakingAmount(hanChainBalanceOf);
  };

  const setHanChainApprove = () => {
    let hanStakingAmount = document.getElementById("maxHanChainStakeAmount").value;
    const hanChainStakingNum = Web3.utils.toWei(String(hanStakingAmount), "ether");
    dispatch(hanStakingApproveAction.hanStakingApproveAct(account, hanChainStakingNum));
  };

  const setHanChainStake = () => {
    let hanStakingAmount = document.getElementById("maxHanChainStakeAmount").value;
    const hanChainStakingNum = Web3.utils.toWei(String(hanStakingAmount), "ether");
    dispatch(hanStakingStakeAction.hanStakingStakeAct(account, hanChainStakingNum));
  };

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("0xa");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    if (account) {
      dispatch(hanStakingViewAction.hanStakingViewAct(account));
      dispatch(hanStakingApproveStateAction.hanStakingApproveStateAct(account));
    }
  }, [account]);

  console.log(hanChainAllowance);
  // console.log(successHanChainApprove === false);

  return (
    <>
      {checkChainId === "0xa" ? (
        <div>
          <>
            <div className="han-Staking-Deposit-Quaota-Section">
              <p>TOTAL STAKED : {totalSupply} </p>
            </div>
            <div className="han-Staking-Deposit-StakeAmount-Section">
              <p>STAKED : {totalHanStakedAmount} </p>
            </div>
          </>
          <>
            {totalSupply ? (
              hanStakingAmount === 0 || hanStakingAmount === "" ? (
                <>
                  <div className="han-Staking-Deposit-TokenBalanceSection">
                    <p>Available : {hanChainBalanceOf} </p>
                  </div>
                  <div className="han-Staking-Deposit-Approve-AmountSection">
                    <input
                      type="number"
                      step="0.000000000000000001"
                      id="maxHanChainStakeAmount"
                      placeholder="0"
                      onChange={changeHanDepositAmount}
                      value={hanStakingAmount}
                    ></input>
                    <p>HAN</p>
                    <button className="han-Staking-Deposit-AmountMaxBtn" onClick={changeMaxHanDepositAmount}>
                      Max
                    </button>
                  </div>
                  <div className="han-Staking-Deposit-Pswd-Container">
                    <div className="han-Staking-Deposit-Pswd-Section">
                      <div className="han-Staking-Deposit-Pswd-Lock">
                        <HiOutlineLockClosedIcon />
                      </div>
                      <input name="stakingPassword" placeholder="365 Days Locked" readOnly />
                    </div>
                  </div>

                  <div className="han-Staking-DepositStakeBtnSection">
                    <button className="han-Staking-Deposit-CantBtn">ENTER AMOUNT</button>
                  </div>
                </>
              ) : isZeroAmount || hanChainBalanceOf === 0 || hanStakingAmount > hanChainBalanceOf ? (
                <>
                  <div className="han-Staking-Deposit-TokenBalanceSection">
                    <p>Available : {hanChainBalanceOf} </p>
                  </div>
                  <div className="han-Staking-Deposit-Approve-AmountSection">
                    <input
                      type="number"
                      step="0.000000000000000001"
                      id="maxHanChainStakeAmount"
                      placeholder="0"
                      onChange={changeHanDepositAmount}
                      value={parseFloat(hanStakingAmount)}
                    ></input>
                    <p>HAN</p>
                    <button className="han-Staking-Deposit-AmountMaxBtn" onClick={changeMaxHanDepositAmount}>
                      Max
                    </button>
                  </div>
                  <div className="han-Staking-Deposit-Pswd-Container">
                    <div className="han-Staking-Deposit-Pswd-Section">
                      <div className="han-Staking-Deposit-Pswd-Lock">
                        <HiOutlineLockClosedIcon />
                      </div>
                      <input name="stakingPassword" placeholder="365 Days Locked" readOnly />
                    </div>
                  </div>

                  <div className="han-Staking-DepositStakeBtnSection">
                    <button className="han-Staking-Deposit-CantBtn " disabled={true}>
                      INSUFFICIENT HAN BALANCE
                    </button>
                  </div>
                </>
              ) : hanChainAllowance < hanChainBalanceOf || hanChainAllowance === "0" ? (
                <>
                  <div className="han-Staking-Deposit-TokenBalanceSection">
                    <p>Available : {hanChainBalanceOf} </p>
                  </div>
                  <div className="han-Staking-Deposit-Approve-AmountSection">
                    <input
                      type="number"
                      step="0.000000000000000001"
                      id="maxHanChainStakeAmount"
                      placeholder="0"
                      onChange={changeHanDepositAmount}
                      value={parseFloat(hanStakingAmount)}
                    ></input>
                    <p>HAN</p>
                    <button className="han-Staking-Deposit-AmountMaxBtn" onClick={changeMaxHanDepositAmount}>
                      Max
                    </button>
                  </div>
                  <div className="han-Staking-Deposit-Pswd-Container">
                    <div className="han-Staking-Deposit-Pswd-Section">
                      <div className="han-Staking-Deposit-Pswd-Lock">
                        <HiOutlineLockClosedIcon />
                      </div>
                      <input name="stakingPassword" placeholder="365 Days Locked" readOnly />
                    </div>
                  </div>
                  <div className="han-Staking-DepositStakeBtnSection">
                    <button className="han-Staking-Deposit-CanBtn" onClick={setHanChainApprove}>
                      APPROVE
                    </button>
                  </div>
                </>
              ) : hanChainAllowance >= hanChainBalanceOf ? (
                <>
                  <div className="han-Staking-Deposit-TokenBalanceSection">
                    <p>Available : {hanChainBalanceOf} </p>
                  </div>
                  <div className="han-Staking-Deposit-Approve-AmountSection">
                    <input
                      type="number"
                      step="0.000000000000000001"
                      id="maxHanChainStakeAmount"
                      placeholder="0"
                      onChange={changeHanDepositAmount}
                      value={parseFloat(hanStakingAmount)}
                    ></input>
                    <p>HAN</p>
                    <button className="han-Staking-Deposit-AmountMaxBtn" onClick={changeMaxHanDepositAmount}>
                      Max
                    </button>
                  </div>
                  <div className="han-Staking-Deposit-Pswd-Container">
                    <div className="han-Staking-Deposit-Pswd-Section">
                      <div className="han-Staking-Deposit-Pswd-Lock">
                        <HiOutlineLockClosedIcon />
                      </div>
                      <input name="stakingPassword" placeholder="365 Days Locked" readOnly />
                    </div>
                  </div>
                  <div className="han-Staking-DepositStakeBtnSection">
                    <button className="han-Staking-Deposit-CanBtn" onClick={setHanChainStake}>
                      STAKE
                    </button>
                  </div>
                </>
              ) : successHanChainApprove === false ? (
                <>
                  <div className="han-Staking-Deposit-TokenBalanceSection">
                    <p>Available : {hanChainBalanceOf} </p>
                  </div>
                  <div className="han-Staking-Deposit-Approve-AmountSection">
                    <input
                      type="number"
                      step="0.000000000000000001"
                      id="maxHanChainStakeAmount"
                      placeholder="0"
                      onChange={changeHanDepositAmount}
                      value={parseFloat(hanStakingAmount)}
                    ></input>
                    <p>HAN</p>
                    <button className="han-Staking-Deposit-AmountMaxBtn" onClick={changeMaxHanDepositAmount}>
                      Max
                    </button>
                  </div>
                  <div className="han-Staking-Deposit-Pswd-Container">
                    <div className="han-Staking-Deposit-Pswd-Section">
                      <div className="han-Staking-Deposit-Pswd-Lock">
                        <HiOutlineLockClosedIcon />
                      </div>
                      <input name="stakingPassword" placeholder="365 Days Locked" readOnly />
                    </div>
                  </div>
                  <div className="han-Staking-DepositStakeBtnSection">
                    <button className="han-Staking-Deposit-CanBtn" onClick={setHanChainApprove}>
                      APPROVE
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="han-Staking-Deposit-TokenBalanceSection">
                    <p>Available : {hanChainBalanceOf} </p>
                  </div>
                  <div className="han-Staking-Deposit-Approve-AmountSection">
                    <input
                      type="number"
                      step="0.000000000000000001"
                      id="maxHanChainStakeAmount"
                      placeholder="0"
                      onChange={changeHanDepositAmount}
                      value={parseFloat(hanStakingAmount)}
                    ></input>
                    <p>HAN</p>
                    <button className="han-Staking-Deposit-AmountMaxBtn" onClick={changeMaxHanDepositAmount}>
                      Max
                    </button>
                  </div>
                  <div className="han-Staking-Deposit-Pswd-Container">
                    <div className="han-Staking-Deposit-Pswd-Section">
                      <div className="han-Staking-Deposit-Pswd-Lock">
                        <HiOutlineLockClosedIcon />
                      </div>
                      <input name="stakingPassword" placeholder="365 Days Locked" readOnly />
                    </div>
                  </div>
                  <div className="han-Staking-DepositStakeBtnSection">
                    <button className="han-Staking-Deposit-CanBtn" onClick={setHanChainStake}>
                      STAKE
                    </button>
                  </div>
                </>
              )
            ) : (
              <div className="han-Staking-Deposit-LoadingContainer">
                <Loading />
              </div>
            )}
          </>

          <div className="logoContainer">
            <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
            <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
          </div>
        </div>
      ) : (
        <>
          <div className="han-Staking-Deposit-LoadingContainer">
            <Loading />
          </div>
          <div className="logoContainer">
            <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
            <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(HanDepositSection);
