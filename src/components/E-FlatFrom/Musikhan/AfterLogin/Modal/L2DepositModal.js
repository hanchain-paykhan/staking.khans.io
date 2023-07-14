import React, { useEffect, useState } from "react";
import "./L2DepositModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { L2MusikhanMintingCaAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2MusikhanMintingCaAction";
import { L2MusikhanViewAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2MusikhanViewAction";
import { L2DepositTokenBalanceAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2DepositTokenBalanceAction";
import { MusiLogoXBack } from "../../../../../assets/_index";
import { FaSearchIcon } from "../../../../Icons/reactIcons";
import axios from "axios";

const L2DepositModal = (props) => {
  const { open, close } = props;
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const [searchDepositTokenData, setSearchDepositTokenData] = useState("");
  const { l2AllTokenList } = useSelector((state) => state.musikhanCaView);
  const { deposit_Api_Status, L2Contract } = useSelector((state) => state.musikhanL2View);

  const selectDepositTokenListToPage = async (l2AllTokenList) => {
    const l2TokenAddress = l2AllTokenList.ca;
    const l2TokenSymbol = l2AllTokenList.symbol;
    dispatch(L2MusikhanViewAction.L2MusikhanViewAct(l2TokenSymbol, l2TokenAddress));
    await axios.post("http://localhost:4000/block/l2DepositTokenBalance", { account, l2TokenAddress });
    await axios.post("http://localhost:4000/block/l2DepositAllowance", { account, l2TokenAddress });
    dispatch(L2DepositTokenBalanceAction.L2DepositTokenBalanceAct(account, l2TokenAddress));
  };

  useEffect(() => {
    dispatch(L2MusikhanMintingCaAction.L2MusikhanMintingCaAct(account));
  }, [account]);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="depositL2-ModalTopTitleContainer">
              <div className="depositL2-ModalTopTitleSection">
                <a>Select token</a>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="depositL2-ModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
            </div>
          </header>
          <div className="depositL2-ModalTokenInfoContainer">
            <div className="depositL2-ModalTokensSearchInputSection">
              <FaSearchIcon className="depositL2-ModalSearchIcon" />
              <input
                placeholder="Search name or symbol"
                className="depositL2-ModalTokensSearchInput"
                onChange={(e) => setSearchDepositTokenData(e.target.value.toLowerCase())}
              ></input>
            </div>
            <div className="depositL2-ModalTokenListSection">
              <ul className="depositL2-TokenList_PickerToken">
                {l2AllTokenList
                  .filter(
                    (l2AllTokenList) =>
                      l2AllTokenList.name.toLowerCase().includes(searchDepositTokenData) ||
                      l2AllTokenList.symbol.toLowerCase().includes(searchDepositTokenData)
                  )
                  .map((l2AllTokenList, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        selectDepositTokenListToPage(l2AllTokenList);
                        close();
                      }}
                    >
                      <div className="depositL2-TokenListTokenImgTextSection">
                        <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                        <div className="depositL2-TokenListNameSymbolSection">
                          <div className="depositL2-TokenListNameSection">
                            <h2>{l2AllTokenList.name}</h2>
                          </div>
                          <div className="depositL2-TokenListSymbolSection">
                            <h2>{l2AllTokenList.symbol}</h2>
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

export default L2DepositModal;
