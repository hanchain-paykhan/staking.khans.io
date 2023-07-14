import React, { useState, useEffect } from "react";
import "./L1BridgeModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { L1TokenListToBackAction } from "../../../../../redux/actions/musikhanActions/L1Actions/L1TokenListToBackAction";
import { L1MusiKhanViewAction } from "../../../../../redux/actions/musikhanActions/L1Actions/L1MusiKhanViewAction";
import { L1TokenBalanceViewAction } from "../../../../../redux/actions/musikhanActions/L1Actions/L1TokenBalanceViewAction";
import { MusiLogoXBack } from "../../../../../assets/_index";
import { FaSearchIcon } from "../../../../Icons/reactIcons";
import axios from "axios";

const L1BridgeModal = (props) => {
  const dispatch = useDispatch();
  const { open, close, header } = props;
  const { account } = useSelector((state) => state.account);
  const [searchL1BridgeTokenData, setSearchL1BridgeTokenData] = useState("");
  const { L1Contract, L1TokenList, api_Status } = useSelector((state) => state.musikhanL1View);

  const selectTokenListToPage = async (tokenlist) => {
    const tokenSymbol = tokenlist.symbol;
    const l1TokenAddress = tokenlist.l1Address;
    const l2TokenAddress = tokenlist.l2Address;
    try {
      dispatch(L1MusiKhanViewAction.L1MusiKhanViewAct(tokenSymbol, l1TokenAddress, l2TokenAddress));
      await axios.post("https://back.khans.io/block/l1tokenbalance", { account, l1TokenAddress });
      dispatch(L1TokenBalanceViewAction.L1TokenBalanceViewAct(account, l1TokenAddress));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(L1TokenListToBackAction.L1TokenListToBackAct());
  }, []);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="selectModalTopTitleContainer">
              <div className="selectModalTopTitleSection">
                <a>Select token</a>
                <button className="close" onClick={close}></button>
              </div>
              {/* <div className="selectModalTokensTxtSection">
                                <a>Tokens</a>
                            </div> */}
            </div>
          </header>
          <div className="selectModalTokenInfoContainer">
            <div className="selectModalTokensSearchInputSection">
              <FaSearchIcon className="selectModalSearchIcon" />
              {/* <input></input> */}
              <input
                placeholder="Search name or paste address"
                className="selectModalTokensSearchInput"
                onChange={(e) => setSearchL1BridgeTokenData(e.target.value.toLowerCase())}
              ></input>
            </div>
            <div className="bridgeL1-ModalTokenListSection">
              <ul className="bridgeL1-TokenList_PickerToken">
                {L1TokenList.filter(
                  (tokenlist) =>
                    tokenlist.name.toLowerCase().includes(searchL1BridgeTokenData) ||
                    tokenlist.symbol.toLowerCase().includes(searchL1BridgeTokenData)
                ).map((tokenlist, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      selectTokenListToPage(tokenlist);
                      close();
                    }}
                  >
                    <div className="bridgeL1-TokenListTokenImgTextSection">
                      <img src={MusiLogoXBack} alt="MusikhanLogo"></img>
                      <div className="bridgeL1-TokenListNameSymbolSection">
                        <div className="bridgeL1-TokenListNameSection">
                          <h2>{tokenlist.name}</h2>
                        </div>
                        <div className="bridgeL1-TokenListSymbolSection">
                          <h2>{tokenlist.symbol}</h2>
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

export default L1BridgeModal;
