import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../SprStakingPage/Loading";
import { oldAllSprStakedViewAction } from "../../../../redux/actions/OldEPlatActions/OldSprActions/oldAllSprStakedViewAction";
import { SlArrowUpIcon, SlArrowDownIcon, MdHelpIcon } from "../../../Icons/reactIcons";

const OldSprViewAdsSection = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { account } = useSelector((state) => state.account);

  const [checkChainId, setCheckChainId] = useState("");

  const { getOldSprStakingTokenIdImgVideoUrl } = useSelector((state) => state.oldSprAllStakedView);

  const goUp = (id) => {
    id.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const goDown = (id) => {
    id.scrollTo({
      top: id.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const stopScroll = (id) => {
    id.scrollTop = id.scrollTop;
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
    dispatch(oldAllSprStakedViewAction.oldAllSprStakedViewAct(account));
  }, [account]);
  return (
    <div>
      <div className="oldSprstakingAmountTitle">
        <div className="stakingSprAmountTitle">
          <div className="stakingSprAmountTxt">
            <a>0.000001157407407407 HAN</a>
          </div>

          <div className="tooltip-container">
            <i className="info-icon material-icons">
              <MdHelpIcon />
            </i>
            <div className="tooltip-content">
              <span>
                The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                characters from Sewoori Union for AdKhan: Advertising Platform
              </span>
              <span className="align-right">
                <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                  Read More
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="stakingSprAmountNum">
          <a>for each NFT per second</a>
        </div>
      </div>
      {getOldSprStakingTokenIdImgVideoUrl.length === 0 ? (
        // <div className="sprStakingWithdrawContainer">
        //   <div className="sprStakingCantChoiceContainer">
        //     <div className="sprStakingCantChoiceSection">
        //       <a className="cantStakingSprBtn" disabled={true}>
        //         INSUFFICIENT BALANCE
        //       </a>
        //     </div>
        //   </div>
        // </div>
        <div className="sprStakingCantViewContainer">
          <Loading />
        </div>
      ) : (
        <div className="sprAllStakingComContainer">
          <div className="sprAllStakingArrowUpSection">
            <SlArrowUpIcon onPointerDown={(e) => goUp(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
          </div>
          <div className="sprAllStakingContainer">
            {getOldSprStakingTokenIdImgVideoUrl !== "" ? (
              <div className="allStakingInfoImgContainer">
                <div className="scrollBox">
                  <div className="scrollBoxInner" ref={ref}>
                    {getOldSprStakingTokenIdImgVideoUrl.map((item, index) => {
                      return (
                        <div className="allStakingInfoSection" key={index}>
                          <div
                            className="allStakingInfoImgSection"
                            style={{
                              // backgroundImage:
                              // `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`
                              // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                              backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                            }}
                            onClick={() => window.open(`${item.externalUrl}`, "_blank")}
                            // onClick={()=>window.open(`https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA/videos`,'_blank')}
                          ></div>
                          <div className="allStakingInfoNameSection">
                            <p>Sheepoori # {item.tokenId}</p>
                            {/* <p>{item.name}</p> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="sprAllStakingArrowDownSection">
            <SlArrowDownIcon onPointerDown={(e) => goDown(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(OldSprViewAdsSection);
