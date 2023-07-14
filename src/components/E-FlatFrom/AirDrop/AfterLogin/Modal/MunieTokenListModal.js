import React, { useEffect, useState } from "react";
import "./MunieTokenListModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { munieAirDropViewAction } from "../../../../../redux/actions/airdropActions/munieActions/munieAirDropViewAction";
import { munieAirDropCheckOwnerAction } from "../../../../../redux/actions/airdropActions/munieActions/munieAirDropCheckOwnerAction";
import { FaSearchIcon } from "../../../../Icons/reactIcons";
const MunieTokenListModal = (props) => {
  const { open, close, header } = props;
  const dispatch = useDispatch();
  const [searchMunieAirDropTokenData, setSearchMunieAirDropTokenData] = useState("");

  const { account } = useSelector((state) => state.account);

  const selectMunieAirDropTokenListToPage = (getMunieAirDropTokenImg) => {
    const munieTokenName = getMunieAirDropTokenImg.nft.name;
    const munieTokenid = getMunieAirDropTokenImg.nft.tokenId;
    dispatch(munieAirDropViewAction.munieAirDropViewAct(account, munieTokenName, munieTokenid));
    dispatch(munieAirDropCheckOwnerAction.munieAirDropCheckOwnerAct(munieTokenid, account));
  };

  const { getMunieAirDropTokenImg } = useSelector((state) => state.munieAirDropView);

  // console.log(getMunieAirDropTokenImg);

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="munie-ModalTopTitleContainer">
              <div className="munie-ModalTopTitleSection">
                <a>Select MNI</a>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="musikhan-ModalTokensTxtSection">
                        <a>Tokens</a>
                    </div> */}
            </div>
          </header>
          <div className="munie-ModalTokenInfoContainer">
            <div className="munie-ModalTokenInfoContainer">
              <div className="munie-ModalTokensSearchInputSection">
                <FaSearchIcon className="munie-ModalSearchIcon" />
                <input
                  placeholder="Search name or symbol"
                  className="munie-ModalTokensSearchInput"
                  onChange={(e) => setSearchMunieAirDropTokenData(e.target.value.toLowerCase())}
                ></input>
              </div>
              <div className="munie-ModalTokenListSection">
                <ul className="munie-TokenList_PickerToken">
                  {getMunieAirDropTokenImg
                    .filter((getMunieAirDropTokenImg) =>
                      getMunieAirDropTokenImg.nft.name.toLowerCase().includes(searchMunieAirDropTokenData)
                    )
                    .map((getMunieAirDropTokenImg, index) => (
                      <div
                        className="munie-TokenListTokenImgTextSection"
                        key={index}
                        onClick={() => {
                          selectMunieAirDropTokenListToPage(getMunieAirDropTokenImg);
                          close();
                        }}
                      >
                        <div
                          className="munie-AirDropModalImgSection"
                          style={{
                            backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${getMunieAirDropTokenImg.nft.image})`,
                          }}
                        ></div>
                        <div className="munie-TokenListNameSection">
                          <h2>{getMunieAirDropTokenImg.nft.name} </h2>
                        </div>
                        {/* <div
                                                    className="munie-AirDropModalImgSection"
                                                    style={{
                                                        backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${getMunieAirDropTokenImg.nft.image})`,
                                                    }}
                                                ></div>
                                                <div className="munie-TokenListNameSection">
                                                    <h2>Munie #138 </h2>
                                                </div>
                                                <div
                                                    className="munie-AirDropModalImgSection"
                                                    style={{
                                                        backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${getMunieAirDropTokenImg.nft.image})`,
                                                    }}
                                                ></div>
                                                <div className="munie-TokenListNameSection">
                                                    <h2>Munie #2 </h2>
                                                </div> */}
                      </div>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default MunieTokenListModal;
