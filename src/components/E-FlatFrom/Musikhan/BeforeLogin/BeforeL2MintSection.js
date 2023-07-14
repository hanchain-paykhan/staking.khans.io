import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../SprStakingPage/Loading";
import "../AfterLogin/L2MintSection.scss";

const BeforeL2MintSection = () => {
  const [checkChainId, setCheckChainId] = useState("");
  const { account } = useSelector((state) => state.account);

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
        // Ethereum Bridge Section
        <div>
          <h1>MainNet</h1>
        </div>
      ) : checkChainId === "Oxa" ? (
        // Optimism Bridge Section
        <div className="musiStakingL2BridgeContainer">
          <div className="musiStakingL2BridgeSection">
            <>
              <div className="musiStakingL2BridgeTokenTitleSection">
                <a>Token Name : N/A </a>
                <a>Token Symbol : N/A </a>
                <a>Token Amount : N/A </a>
              </div>
              <div className="musiStakingL2BridegeSwitchBtnSection">
                <button className="cant-Musi-L2Bridge-learn-more" disabled={true}>
                  NOTHING TO MINT
                </button>
              </div>
            </>
          </div>
        </div>
      ) : (
        // Others Network Bridge Section
        <div className="cantConnectNetWorkContainer">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BeforeL2MintSection;
