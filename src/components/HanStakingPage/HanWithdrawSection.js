import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OptimismRedLogo, HanLogo } from "../../assets/_index";
import "./HanWithdrawSection.scss";
import Swal from "sweetalert2";
import { hanStakingUnStakeAction } from "../../redux/actions/hanStakingActions/hanStakingUnStakeAction";
import HanWithdrawModal from "./Modal/HanWithdrawModal";
import { hanStakingTokenListViewAction } from "../../redux/actions/hanStakingActions/hanStakingTokenListViewAction";
import { hanStakingRemainingDurationAction } from "../../redux/actions/hanStakingActions/hanStakingRemainingDurationAction";
import { FiRefreshCcwIcon, GiClickIcon } from "../Icons/reactIcons";
import Loading from "../SprStakingPage/Loading";

const HanWithdrawSection = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [hanStakingWithdrawModal, setHanStakingWithdrawModal] = useState(false);
  const { account } = useSelector((state) => state.account);
  const [hanWithdrawAmount, setHanWithdrawAmount] = useState("");
  const { totalHanStakedAmount, totalSupply, hanWithdrawAmountToModal, hanWithdrawIndex } = useSelector((state) => state.hanStakingView);
  const { hanClaimDayDate, hanClaimHoursDate, hanClaimMinDate, hanClaimSecDate } = useSelector((state) => state.hanStakingDuration);

  // console.log(hanWithdrawIndex);
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

  const openHanWithdrawModal = () => {
    setHanStakingWithdrawModal(true);
  };

  const closeHanWithdrawModal = () => {
    setHanStakingWithdrawModal(false);
  };

  const changeHanTimeStampState = () => {
    dispatch(hanStakingRemainingDurationAction.hanStakingRemainingDurationAct(account, hanWithdrawIndex));
  };

  const setHanUnStake = () => {
    dispatch(hanStakingUnStakeAction.hanStakingUnStakeAct(account, hanWithdrawIndex));
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
      dispatch(hanStakingTokenListViewAction.hanStakingTokenListViewAct(account));
    }
  }, [account]);

  return (
    <>
      {checkChainId === "0xa" ? (
        <div>
          <>
            <div className="han-Staking-Withdraw-Quaota-Section">
              <p>TOTAL STAKED : {totalSupply} </p>
            </div>
            <div className="han-Staking-Withdraw-StakeAmount-Section">
              <p>STAKED : {totalHanStakedAmount} </p>
            </div>
          </>

          <div className="han-Staking-Withdraw-AmountSection">
            <input
              type="number"
              step="0.000000000000000001"
              id="maxHanUnStakeAmount"
              placeholder="0"
              // onChange={changeHanWithdrawAmount}
              defaultValue={hanWithdrawAmountToModal}
            ></input>
            <p>HAN</p>
            {/* <button className="han-Staking-Withdraw-AmountMaxBtn">Max</button> */}
            {/* <button className="han-Staking-Withdraw-AmountMaxBtn" onClick={changeMaxHanWithdrawAmount}>
                     Max
                 </button> */}
            <button className="han-Staking-Select-Token-Btn" onClick={openHanWithdrawModal}>
              SELECT
              <GiClickIcon className="han-Staking-Select-Token-Icon" />
            </button>
            <HanWithdrawModal open={hanStakingWithdrawModal} close={closeHanWithdrawModal} header="Rakis6 Modal" />
          </div>
          <div className="han-Staking-WithDraw-TimeContainer">
            <div className="han-Staking-WithDraw-TimeTitle">
              <a>Remaining Duration</a>
            </div>
            {hanClaimMinDate ? (
              <div className="han-Staking-WithDraw-TimeSection">
                <a className="han-Staking-DayDate">{hanClaimDayDate}D</a>
                <a className="han-Staking-HoursDate">{hanClaimHoursDate}H</a>
                <a className="han-Staking-MinDate">{hanClaimMinDate}M</a>
                <a className="han-Staking-SecDate">{hanClaimSecDate}S</a>
                <FiRefreshCcwIcon className="han-Staking-WithDraw-ReFreshIcon" onClick={changeHanTimeStampState} />
              </div>
            ) : (
              <div className="han-Staking-WithDraw-TimeSection">
                <a className="han-Staking-DayDate">N/A</a>
                <a className="han-Staking-HoursDate">N/A</a>
                <a className="han-Staking-MinDate">N/A</a>
                <a className="han-Staking-SecDate">N/A</a>
                <FiRefreshCcwIcon className="han-Staking-WithDraw-CantReFreshIcon" />
              </div>
            )}
          </div>

          <div className="han-Staking-WithDraw-BtnContainer">
            {hanWithdrawAmountToModal === "" ? (
              <div className="han-Staking-Withdraw-Can-BtnSection">
                <button className="han-Staking-Withdraw-SelectBtn" disabled={true}>
                  SELECT TOKEN
                </button>
              </div>
            ) : hanClaimSecDate === "00" ? (
              <div className="han-Staking-Withdraw-Can-BtnSection">
                <button className="han-Staking-Withdraw-CanBtn" onClick={setHanUnStake}>
                  UNSTAKE
                </button>
              </div>
            ) : (
              <div className="han-Staking-Withdraw-Can-BtnSection">
                <button className="han-Staking-Withdraw-SelectBtn" disabled={true}>
                  UNSTAKE
                </button>
              </div>
            )}
          </div>
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

export default React.memo(HanWithdrawSection);
