import React, { useState, useEffect } from "react";
import "./L2SwapModal.scss";
import { useSelector, useDispatch } from "react-redux";
import { L2SwapTokenListToBackAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2SwapTokenListToBackAction";
import { L2SwapViewAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2SwapViewAction";
import { L2SwapTokenBalanceAction } from "../../../../../redux/actions/musikhanActions/L2Actions/L2SwapTokenBalanceAction";
import { MusiLogoXBack } from "../../../../../assets/_index";
import { FaSearchIcon } from "../../../../Icons/reactIcons";
import axios from "axios";

const L2SwapModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const { account } = useSelector((state) => state.account);
  const [searchSwapTokenData, setSearchSwapTokenData] = useState("");
  const { L2SwapTokenList, L2SwapContract, L2_Swap_Api_Status } = useSelector((state) => state.L2SwapView);

  const selectL2SwapTokenListToPage = async (L2SwapTokenList) => {
    const L2SwapName = L2SwapTokenList.name;
    const L2SwapSymbol = L2SwapTokenList.symbol;
    const existTokenCa = L2SwapTokenList.existedTokenAddress;
    const musiSwapTokenCa = L2SwapTokenList.musikhanTokenAddress;
    dispatch(L2SwapViewAction.L2SwapViewAct(L2SwapName, L2SwapSymbol, existTokenCa, musiSwapTokenCa));
    await axios.post("https://back.khans.io/block/l2SwapTokenBalance", { account, existTokenCa });
    dispatch(L2SwapTokenBalanceAction.L2SwapTokenBalanceAct(account, existTokenCa));
  };

  useEffect(() => {
    dispatch(L2SwapTokenListToBackAction.L2SwapTokenListToBackAct());
  }, []);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="swapL2-ModalTopTitleContainer">
              <div className="swapL2-ModalTopTitleSection">
                <a>Select token</a>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="swapL2-ModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
            </div>
          </header>
          <div className="swapL2-ModalTokenInfoContainer">
            <div className="swapL2-ModalTokensSearchInputSection">
              <FaSearchIcon className="swapL2-ModalSearchIcon" />
              <input
                placeholder="Search name or symbol"
                className="swapL2-ModalTokensSearchInput"
                onChange={(e) => setSearchSwapTokenData(e.target.value.toLowerCase())}
              ></input>
            </div>
            <div className="swapL2-ModalTokenListSection">
              <ul className="swapL2-TokenList_PickerToken">
                {L2SwapTokenList.filter(
                  (L2SwapTokenList) =>
                    L2SwapTokenList.name.toLowerCase().includes(searchSwapTokenData) ||
                    L2SwapTokenList.symbol.toLowerCase().includes(searchSwapTokenData)
                ).map((L2SwapTokenList, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      selectL2SwapTokenListToPage(L2SwapTokenList);
                      close();
                    }}
                  >
                    <div className="swapL2-TokenListTokenImgTextSection">
                      <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                      <div className="swapL2-TokenListNameSymbolSection">
                        <div className="swapL2-TokenListNameSection">
                          <h2>{L2SwapTokenList.name}</h2>
                        </div>
                        <div className="swapL2-TokenListSymbolSection">
                          <h2>{L2SwapTokenList.symbol}</h2>
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

export default L2SwapModal;
