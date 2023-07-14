import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import "./SprViewAdsSection.scss";
import { allSPRV2StakedViewAction } from "../../redux/actions/SPRV2StakingActions/allSPRV2StakedViewAction";
import { SlArrowUpIcon, SlArrowDownIcon } from "../Icons/reactIcons";

const SprViewAdsSection = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { account } = useSelector((state) => state.account);

  const [checkChainId, setCheckChainId] = useState("");

  const { getSPRV2StakingTokenIdImgVideoUrl } = useSelector((state) => state.SPRV2StakingView);

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
    dispatch(allSPRV2StakedViewAction.allSPRV2StakedViewAct(account));
  }, [account]);

  return (
    <div>
      {getSPRV2StakingTokenIdImgVideoUrl.length === 0 ? (
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
            {getSPRV2StakingTokenIdImgVideoUrl !== "" ? (
              <div className="allStakingInfoImgContainer">
                <div className="scrollBox">
                  <div className="scrollBoxInner" ref={ref}>
                    {getSPRV2StakingTokenIdImgVideoUrl.map((item, index) => {
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

export default React.memo(SprViewAdsSection);
