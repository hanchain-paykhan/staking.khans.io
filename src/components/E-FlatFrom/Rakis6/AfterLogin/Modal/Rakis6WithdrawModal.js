import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6WithdrawModal.scss";
import { rakis6AirDropRemainingAction } from "../../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRemainingAction";
import { rakis6AirDropWithdrawBalanceAction } from "../../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropWithdrawBalanceAction";
import { ArrakisBlackIcon } from "../../../../../assets/_index";
import { tokenListViewAction } from "../../../../../redux/actions/airdropActions/rakis6Actions/tokenListViewAction";

const Rakis6WithdrawModal = (props) => {
  const { open, close } = props;
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const { stakerDataArray } = useSelector((state) => state.rakis6AirDropView);

  const selectRakis6AirDropTokenToPage = (stakerDataArray, index) => {
    const rakis6WithdrawAmount = stakerDataArray[8];
    dispatch(rakis6AirDropRemainingAction.rakis6AirDropRemainingAct(account, index));
    dispatch(rakis6AirDropWithdrawBalanceAction.rakis6AirDropWithdrawBalanceAct(rakis6WithdrawAmount, index));
  };

  useEffect(() => {
    dispatch(tokenListViewAction.tokenListViewAct(account));
  }, [account]);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="musikhan-ModalTopTitleContainer">
              <div className="rakis6-AirDrop-ModalTopTitleSection">
                <a>Select</a>
                <button className="close" onClick={close}></button>
              </div>
            </div>
          </header>
          <div className="rakis6-AirDrop-ModalTokenInfoContainer">
            {/* <div className="rakis6-AirDrop-ModalTokensSearchInputSection">
                            <FaSearch className="rakis6-AirDrop-ModalSearchIcon" />
                            <input placeholder="Search name or symbol" className="rakis6-AirDrop-ModalTokensSearchInput"></input>
                        </div> */}
            <div className="rakis6-AirDrop-ModalTokenListSection">
              <ul className="rakis6-AirDrop-TokenList_PickerToken">
                <div className="rakis6-AirDrop-Modal-Title">
                  {/* <div className="rakis6-AirDrop-Modal-Title-Num">
                                        <a>Logo</a>
                                    </div> */}
                  <div className="rakis6-AirDrop-Modal-Title-Amount">
                    <a>Amount</a>
                  </div>
                  <div className="rakis6-AirDrop-Modal-Title-Date">
                    <a>Withdrawal Date</a>
                  </div>
                </div>
                <hr />
                {stakerDataArray.map((stakerDataArray, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      selectRakis6AirDropTokenToPage(stakerDataArray, index);
                      close();
                    }}
                  >
                    <div className="rakis6-AirDrop-TokenListTokenImgTextSection">
                      <img src={ArrakisBlackIcon} alt="ArrakisIcon"></img>
                      <div className="rakis6-AirDrop-TokenListNameSymbolSection">
                        <div className="rakis6-AirDrop-TokenListNameSection">
                          <h2>{stakerDataArray[8]}</h2>
                        </div>
                        <div className="rakis6-AirDrop-TokenListSymbolSection">
                          <h2>
                            {stakerDataArray[5]}Y {stakerDataArray[6]}D {stakerDataArray[7]}H
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

export default Rakis6WithdrawModal;
