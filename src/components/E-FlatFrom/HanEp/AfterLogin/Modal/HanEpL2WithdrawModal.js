import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanEpL2WithdrawModal.scss";

const HanEpL2WithdrawModal = (props) => {
  const { open, close } = props;
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="musikhan-ModalTopTitleContainer">
              <div className="eplat-HanEp-ModalTopTitleSection">
                <a>Select</a>
                <button className="close" onClick={close}></button>
              </div>
            </div>
          </header>
          <div className="eplat-HanEp-ModalTokenInfoContainer">
            {/* <div className="eplat-HanEp-ModalTokensSearchInputSection">
            <FaSearch className="eplat-HanEp-ModalSearchIcon" />
            <input placeholder="Search name or symbol" className="eplat-HanEp-ModalTokensSearchInput"></input>
        </div> */}
            <div className="eplat-HanEp-ModalTokenListSection">
              <ul className="eplat-HanEp-TokenList_PickerToken">
                <div className="eplat-HanEp-Modal-Title">
                  {/* <div className="eplat-HanEp-Modal-Title-Num">
                        <a>Logo</a>
                    </div> */}
                  <div className="eplat-HanEp-Modal-Title-Amount">
                    <a>Amount</a>
                  </div>
                  <div className="eplat-HanEp-Modal-Title-Date">
                    <a>Withdrawal Date</a>
                  </div>
                </div>
                <hr />
                {/* {stakerDataArray.map((stakerDataArray, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    selectRakis6AirDropTokenToPage(stakerDataArray, index);
                                    close();
                                }}
                            >
                                <div className="eplat-HanEp-TokenListTokenImgTextSection">
                                    <img src={ArrakisBlackIcon} alt="ArrakisIcon"></img>
                                    <div className="eplat-HanEp-TokenListNameSymbolSection">
                                        <div className="eplat-HanEp-TokenListNameSection">
                                            <h2>{stakerDataArray[8]}</h2>
                                        </div>
                                        <div className="eplat-HanEp-TokenListSymbolSection">
                                            <h2>
                                                {stakerDataArray[5]}Y {stakerDataArray[6]}D {stakerDataArray[7]}H
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))} */}
              </ul>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default HanEpL2WithdrawModal;
