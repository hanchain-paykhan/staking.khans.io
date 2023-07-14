import React, { useState, useEffect } from "react";
import "./L2WithdrawModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { L2WithdrawTokenListAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2WithdrawTokenListAction";
import { L2WithdrawViewAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2WithdrawViewAction";
import { MusiLogoXBack } from "../../../../../assets/_index";
import { FaSearchIcon } from "../../../../Icons/reactIcons";

const L2WithdrawModal = (props) => {
  const dispatch = useDispatch();
  const { open, close, header } = props;
  const { account } = useSelector((state) => state.account);
  const [searchWithdrawTokenData, setSearchWithdrawTokenData] = useState("");
  const { withdrawTokenList } = useSelector((state) => state.musikhanL2View);

  const selectWithdrawTokenListToPage = (withdrawTokenList) => {
    const l2WithdrawSymbol = withdrawTokenList.symbol;
    const l2WithdrawAmountStaked = withdrawTokenList.amountStaked;
    const l2WithdrawTokenCa = withdrawTokenList.l2Ca;
    dispatch(L2WithdrawViewAction.L2WithdrawViewAct(l2WithdrawSymbol, l2WithdrawAmountStaked, l2WithdrawTokenCa));
  };

  useEffect(() => {
    dispatch(L2WithdrawTokenListAction.L2WithdrawTokenListAct(account));
  }, []);
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="withdrawL2-ModalTopTitleContainer">
              <div className="withdrawL2-ModalTopTitleSection">
                <a>Select token</a>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="withdrawL2-ModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
            </div>
          </header>
          <div className="withdrawL2-ModalTokenInfoContainer">
            <div className="withdrawL2-ModalTokensSearchInputSection">
              <FaSearchIcon className="withdrawL2-ModalSearchIcon" />
              <input
                placeholder="Search name or symbol"
                className="withdrawL2-ModalTokensSearchInput"
                onChange={(e) => setSearchWithdrawTokenData(e.target.value.toLowerCase())}
              ></input>
            </div>
            <div className="withdrawL2-ModalTokenListSection">
              <ul className="withdrawL2-TokenList_PickerToken">
                {withdrawTokenList
                  .filter(
                    (withdrawTokenList) =>
                      withdrawTokenList.name.toLowerCase().includes(searchWithdrawTokenData) ||
                      withdrawTokenList.symbol.toLowerCase().includes(searchWithdrawTokenData)
                  )
                  ?.map((withdrawTokenList, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        selectWithdrawTokenListToPage(withdrawTokenList);
                        close();
                      }}
                    >
                      <div className="withdrawL2-TokenListTokenImgTextSection">
                        <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                        <div className="withdrawL2-TokenListNameSymbolSection">
                          <div className="withdrawL2-TokenListNameSection">
                            <h2>{withdrawTokenList.name}</h2>
                          </div>
                          <div className="withdrawL2-TokenListSymbolSection">
                            <h2>{withdrawTokenList.symbol}</h2>
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

export default L2WithdrawModal;
