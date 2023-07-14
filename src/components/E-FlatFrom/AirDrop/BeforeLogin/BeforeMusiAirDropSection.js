import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MusiLogoXBack } from "../../../../assets/_index";
import { FiRefreshCcwIcon, GiClickIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/MusiAirDropSection.scss";

const BeforeMusiAirDropSection = () => {
  const dispatch = useDispatch();
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

  const loginAlert = () => {
    Swal.fire({
      text: "Please try again after log in",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      footer: '<a href="/hanep/signin">Go to the login page?</a>',
    });
  };

  return (
    <>
      <div className="airDropMusikhanSection">
        <div className="airDropMusiKhanLogoSection">
          <img src={MusiLogoXBack} alt="MusikhanLogo" />
        </div>

        <div className="airDropMusiTxt">
          <a>MusiKhan</a>
        </div>

        <div className="musiAfterPickerSection">
          <button className="musiAirDropAfterPicker_SelectBtn" onClick={loginAlert}>
            {/* <img src={MusiKhanLogo}></img> */}
            <span></span>
            <GiClickIcon size="20" className="modalClickIcon" />
          </button>
          {/* <MusiTokenListModal open={musiTokenListModal} close={closeMusiTokenListModal} header="Modal heading"></MusiTokenListModal> */}
        </div>

        {checkChainId === "Oxa" ? (
          <div className="airDropMusiBtn">
            <button className="cant-musi-learn-more" disabled={true}>
              Nothing to Claim
            </button>
          </div>
        ) : (
          <div className="airDropMusiBtn">
            <button className="switch-musi-learn-more" disabled={true}>
              Switch to Optimism
            </button>
          </div>
        )}

        <div className="airDropMusiTimeStampSection">
          <div className="airDropMusiTimeStampTitle">
            <a>Remaining Duration</a>
          </div>

          <div className="airDropMusiTimeStampInfo">
            <a className="musiDayDate">N/A</a>
            <a className="musiHoursDate">N/A</a>
            <a className="musiMinDate">N/A</a>
            <FiRefreshCcwIcon
              className="airDropCantMusiReFreshTimeStamp"
              // onClick={changeMusiTimeStampState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeMusiAirDropSection;
