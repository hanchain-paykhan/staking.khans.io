import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MunieLogoBackX } from "../../../../assets/_index";
import { GiClickIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/MunieAirDropSection.scss";

const BeforeMunieAirDropSection = () => {
  const { account } = useSelector((state) => state.account);
  const [checkChainId, setCheckChainId] = useState("");

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
    <>
      <div className="airDropMuniSection">
        <div className="airDropMunieLogoSection">
          <img src={MunieLogoBackX} alt="MunieLogo" />
        </div>
        <div className="selectBeforeAirDropMuniTxt">
          <a>NFT Munie</a>
        </div>
        <div className="munieBeforePickerSection">
          <button className="munieAirDropBeforePicker_SelectBtn">
            {/* <img src={MusiKhanLogo}></img> */}
            <span></span>
            <GiClickIcon size="20" className="munieModalClickIcon" onClick={loginAlert} />
          </button>
        </div>
        <div className="airDropMuniBtn">
          <button className="cant-airdrop-munie-learn-more" disabled={true}>
            Nothing to Claim
          </button>
        </div>
        {/* <div className="airDropMuniTimeStampSection">
                    <div className="airDropMuniTimeStampTitle">
                        <a>Remaining Duration</a>
                    </div>
                    <div className="airDropMuniTimeStampInfo">
                        <a className="muniDayDate">28D</a>
                        <a className="muniHoursDate">00H</a>
                        <a className="muniMinDate">00M</a>
                        <FiRefreshCcw
                            className="airDropMuniReFreshTimeStamp"
                            // onClick={changeTimeStampState}
                        />
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default BeforeMunieAirDropSection;
