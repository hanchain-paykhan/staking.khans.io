import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PrivateUniWithdrawModal.scss";
import { ArrakisBlackIcon } from "../../../../../assets/_index";
import { UniV2PrivateWithdrawBalanceAction } from "../../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateWithdrawBalanceAction";
import { UniV2PrivateRemainingDurationAction } from "../../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateRemainingDurationAction";

const PrivateUniWithdrawModal = (props) => {
  const { open, close } = props;
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const { getUniPrivateStakerDataArray } = useSelector((state) => state.UniV2PrivateView);

  const selectPrivateRakis6TokenToPage = (item, index) => {
    const privateStakeAmount = item[7];
    dispatch(UniV2PrivateWithdrawBalanceAction.UniV2PrivateWithdrawBalanceAct(privateStakeAmount, index));
    dispatch(UniV2PrivateRemainingDurationAction.UniV2PrivateRemainingDurationAct(account, index));
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="musikhan-ModalTopTitleContainer">
              <div className="eplat-PrUni-ModalTopTitleSection">
                <a>Select</a>
                <button className="close" onClick={close}></button>
              </div>
            </div>
          </header>
          <div className="eplat-PrUni-ModalTokenInfoContainer">
            {/* <div className="eplat-PrUni-ModalTokensSearchInputSection">
                    <FaSearch className="eplat-PrUni-ModalSearchIcon" />
                    <input placeholder="Search name or symbol" className="eplat-PrUni-ModalTokensSearchInput"></input>
                </div> */}
            <div className="eplat-PrUni-ModalTokenListSection">
              <ul className="eplat-PrUni-TokenList_PickerToken">
                <div className="eplat-PrUni-Modal-Title">
                  {/* <div className="eplat-PrUni-Modal-Title-Num">
                                <a>Logo</a>
                            </div> */}
                  <div className="eplat-PrUni-Modal-Title-Amount">
                    <a>Amount</a>
                  </div>
                  <div className="eplat-PrUni-Modal-Title-Date">
                    <a>Withdrawal Date</a>
                  </div>
                </div>
                <hr />
                {getUniPrivateStakerDataArray.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      selectPrivateRakis6TokenToPage(item, index);
                      close();
                    }}
                  >
                    <div className="eplat-PrUni-TokenListTokenImgTextSection">
                      <img src={ArrakisBlackIcon} alt="ArrakisIcon"></img>
                      <div className="eplat-PrUni-TokenListNameSymbolSection">
                        <div className="eplat-PrUni-TokenListNameSection">
                          <h2>{item[7]}</h2>
                        </div>
                        <div className="eplat-PrUni-TokenListSymbolSection">
                          <h2>
                            {item[4]}Y {item[5]}D {item[6]}H
                          </h2>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default PrivateUniWithdrawModal;
