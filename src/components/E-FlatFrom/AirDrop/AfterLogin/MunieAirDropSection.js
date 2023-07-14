import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MunieAirDropSection.scss";
import MunieTokenListModal from "./Modal/MunieTokenListModal";
import { munieAirDropTokenListAction } from "../../../../redux/actions/airdropActions/munieActions/munieAirDropTokenListAction";
import { munieAirDropViewAction } from "../../../../redux/actions/airdropActions/munieActions/munieAirDropViewAction";
import { munieAirDropGetTokenAction } from "../../../../redux/actions/airdropActions/munieActions/munieAirDropGetTokenAction";
import { MunieLogoBackX } from "../../../../assets/_index";
import { GiClickIcon, FiRefreshCcwIcon } from "../../../Icons/reactIcons";

const MunieAirDropSection = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const [checkChainId, setCheckChainId] = useState("");
  const [munieTokenListModal, setMunieTokenListModal] = useState(false);

  const { selectMunieTokenName, selectMunieTokenId, tokenOwnerResult } = useSelector((state) => state.munieAirDropView);

  // Munie Modal Open
  const openMunieTokenListModal = () => {
    setMunieTokenListModal(true);
  };

  // Munie Modal close
  const closeMunieTokenListModal = () => {
    setMunieTokenListModal(false);
  };

  const munieAirDropGetToken = () => {
    dispatch(munieAirDropGetTokenAction.munieAirDropGetTokenAct(account, selectMunieTokenId));
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
    dispatch(munieAirDropTokenListAction.munieAirDropTokenListAct(account));
  }, [account]);

  useEffect(() => {
    dispatch(munieAirDropViewAction.munieAirDropViewAct(account));
  }, [account]);

  return (
    <>
      <div className="airDropMuniSection">
        <div className="airDropMunieLogoSection">
          <img src={MunieLogoBackX} alt="MunieLogo" />
        </div>
        {selectMunieTokenName ? (
          <div className="selectAfterAirDropMuniTxt">
            <a>{selectMunieTokenName}</a>
          </div>
        ) : (
          <div className="selectBeforeAirDropMuniTxt">
            <a>NFT Munie</a>
          </div>
        )}
        <div className="munieBeforePickerSection">
          <button className="munieAirDropBeforePicker_SelectBtn" onClick={openMunieTokenListModal}>
            <span></span>
            <GiClickIcon size="20" className="munieModalClickIcon" />
          </button>
          <MunieTokenListModal open={munieTokenListModal} close={closeMunieTokenListModal} header="Modal heading"></MunieTokenListModal>
        </div>
        {checkChainId === "0x1" ? (
          selectMunieTokenName ? (
            <div className="airDropMuniBtn">
              {account === tokenOwnerResult ? (
                <button className="munie-airdrop-learn-more" onClick={munieAirDropGetToken}>
                  Claim
                </button>
              ) : (
                <button className="cant-airdrop-munie-learn-more" disabled={true}>
                  Nothing to Claim
                </button>
              )}
            </div>
          ) : (
            <div className="airDropMuniBtn">
              <button className="munie-airdrop-learn-more" onClick={openMunieTokenListModal}>
                Select MNI
              </button>
            </div>
          )
        ) : (
          <div className="airDropMuniBtn">
            <button className="cant-airdrop-munie-learn-more" disabled={true}>
              Switch to Ethereum
            </button>
          </div>
        )}

        {/* <div className="airDropMuniTimeStampSection">
                    <div className="airDropMuniTimeStampTitle">
                        <a>Remaining Duration</a>
                    </div>
                    <div className="airDropMuniTimeStampInfo">
                        <a className="muniDayDate">28D</a>
                        <a className="muniHoursDate">00H</a>
                        <a className="muniMinDate">00M</a>
                        <FiRefreshCcwIcon
                            className="airDropMuniReFreshTimeStamp"
                        />
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default MunieAirDropSection;
