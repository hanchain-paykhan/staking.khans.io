import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../SprStakingPage/Loading";
import { allMunieStakedViewAction } from "../../../../redux/actions/munieStakingActions/allMunieStakedViewAction";
import { SlArrowUpIcon, SlArrowDownIcon } from "../../../Icons/reactIcons";
import "../AfterLogin/MunieViewAdsSection.scss";

const BeforeMunieViewAdsSection = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  const [checkChainId, setCheckChainId] = useState("");

  const { account } = useSelector((state) => state.account);

  const { getMunieStakingTokenIdImgVideoUrl } = useSelector((state) => state.munieStakingView);

  // Scroll Carousel
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
    if (window.ethereum?.chainId === "0x5") {
      setCheckChainId("0x5");
    }
    if (window.ethereum?.chainId === "0x1a4") {
      setCheckChainId("0x1a4");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    if (account) {
      dispatch(allMunieStakedViewAction.allMunieStakedViewAct());
    }
  }, []);
  return (
    <div>
      {getMunieStakingTokenIdImgVideoUrl.length === 0 ? (
        <div className="munieStakingCantViewContainer">
          <Loading />
        </div>
      ) : (
        <div className="munieAllStakingComContainer">
          <div className="munieAllStakingArrowUpSection">
            <SlArrowUpIcon onPointerDown={(e) => goUp(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
          </div>
          <div className="munieAllStakingContainer">
            {getMunieStakingTokenIdImgVideoUrl !== "" ? (
              <div className="allMunieStakingInfoImgContainer">
                <div className="munieScrollBox">
                  <div className="munieScrollBoxInner" ref={ref}>
                    {getMunieStakingTokenIdImgVideoUrl.map((item, index) => {
                      return (
                        <div className="allMunieStakingInfoSection" key={index}>
                          <div
                            className="allMunieStakingInfoImgSection"
                            style={{
                              backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                              // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                              // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                            }}
                            // onClick={() => window.open(`${item.externalUrl}`, "_blank")}
                            // onClick={()=>window.open(`https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA/videos`,'_blank')}
                          ></div>
                          <div className="allMunieStakingInfoNameSection">
                            <p>{item.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="munieAllStakingArrowDownSection">
            <SlArrowDownIcon onPointerDown={(e) => goDown(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeMunieViewAdsSection;
