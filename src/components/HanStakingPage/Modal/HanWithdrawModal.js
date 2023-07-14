import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HanWithdrawModal.scss";
import { HanLogo } from "../../../assets/_index";
import { hanStakingWithdrawBalanceAction } from "../../../redux/actions/hanStakingActions/hanStakingWithdrawBalanceAction";
import { hanStakingRemainingDurationAction } from "../../../redux/actions/hanStakingActions/hanStakingRemainingDurationAction";

const HanWithdrawModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const { account } = useSelector((state) => state.account);
  const { getHanStakerDataArray } = useSelector((state) => state.hanStakingView);

  const selectHanChainTokenToPage = (item, index) => {
    const hanStakeAmount = item[7];
    dispatch(hanStakingWithdrawBalanceAction.hanStakingWithdrawBalanceAct(hanStakeAmount, index));
    dispatch(hanStakingRemainingDurationAction.hanStakingRemainingDurationAct(account, index));
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="han-Staking-ModalTopTitleContainer">
              <div className="han-Staking-ModalTopTitleSection">
                <a>Select</a>
                <button className="close" onClick={close}></button>
              </div>
            </div>
          </header>
          <div className="han-Staking-ModalTokenInfoContainer">
            {/* <div className="han-Staking-ModalTokensSearchInputSection">
                            <FaSearch className="han-Staking-ModalSearchIcon" />
                            <input placeholder="Search name or symbol" className="han-Staking-ModalTokensSearchInput"></input>
                        </div> */}
            <div className="han-Staking-ModalTokenListSection">
              <ul className="han-Staking-TokenList_PickerToken">
                <div className="han-Staking-Modal-Title">
                  {/* <div className="han-Staking-Modal-Title-Num">
                                        <a>Logo</a>
                                    </div> */}
                  <div className="han-Staking-Modal-Title-Amount">
                    <a>Amount</a>
                  </div>
                  <div className="han-Staking-Modal-Title-Date">
                    <a>Withdrawal Date</a>
                  </div>
                </div>
                <hr />
                {getHanStakerDataArray?.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      selectHanChainTokenToPage(item, index);
                      close();
                    }}
                  >
                    <div className="han-Staking-TokenListTokenImgTextSection">
                      <img src={HanLogo} alt="ArrakisIcon"></img>
                      <div className="han-Staking-TokenListNameSymbolSection">
                        <div className="han-Staking-TokenListNameSection">
                          <h2>{item[7]}</h2>
                        </div>
                        <div className="han-Staking-TokenListSymbolSection">
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

export default HanWithdrawModal;
