import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../SprStakingPage/Loading";
import Swal from "sweetalert2";
import { FiRefreshCcwIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/L2RewardSection.scss";

const BeforeL2RewardSection = () => {
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

  const loginAlert = () => {
    Swal.fire({
      text: "Please try again after log in",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      footer: '<a href="/hanep/signin">Go to the login page?</a>',
    });
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
      {checkChainId === "0x1" ? (
        // Ethereum Rewards Section
        <div>
          <h3>MainNet</h3>
        </div>
      ) : checkChainId === "Oxa" ? (
        // Optimism Rewards Section
        <div>
          <div className="allMusiRewardsCumulativeSection">
            <p>
              Estimated Interest : 0
              <FiRefreshCcwIcon className="allOpRefreshClaimIcon" />
              HAN
            </p>
          </div>
          <div className="amountMusiTokenRewardAccSection">
            <p>Accumulated Interest : 0 HAN</p>
          </div>
          <div className="amountMusiTokenRewardTxtSection">
            <p>Rewarded Interest : 0 HAN </p>
          </div>
          <div className="amountMusiTotalRewardTxtSection">
            <p>Total Rewarded Interest : 0 HAN</p>
          </div>
          <div className="rewardsMusiClaimBtnSection">
            <button className="musi-oPBefore-SelectToken-Claim" onClick={loginAlert}>
              SELECT TOKEN
            </button>

            <button className="cant-Musi-opClaim-learn-more" disabled={true}>
              NOTHING TO CLAIM
            </button>
          </div>
        </div>
      ) : (
        // Others Network Reward Section
        <div className="cantConnectNetWorkContainer">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BeforeL2RewardSection;
