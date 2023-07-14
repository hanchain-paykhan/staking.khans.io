import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../SprStakingPage/Loading";
import { oldAllMunieStakedViewAction } from "../../../../redux/actions/OldEPlatActions/OldMuineActions/oldAllMunieStakedViewAction";
import { SlArrowUpIcon, SlArrowDownIcon } from "../../../Icons/reactIcons";

const BeforeOldMunieViewAdsSection = () => {
    const dispatch = useDispatch();
    const ref = useRef();

    const [checkChainId, setCheckChainId] = useState("");

    const { account } = useSelector((state) => state.account);

    const { getOldMunieStakingTokenIdImgVideoUrl } = useSelector((state) => state.oldMunieStakingView);

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
            dispatch(oldAllMunieStakedViewAction.oldAllMunieStakedViewAct());
        }
    }, [account]);

    return (
        <div>
            {getOldMunieStakingTokenIdImgVideoUrl.length === 0 ? (
                <div className="munieStakingCantViewContainer">
                    <Loading />
                </div>
            ) : (
                <div className="munieAllStakingComContainer">
                    <div className="stakingMunieAmountContainer">
                        <div className="stakingMunieAmountTitle">
                            <div className="stakingMunieAmountTxt">
                                <a>0.000001157407407407 HAN</a>
                            </div>

                            {/* <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <HelpIcon />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                    characters from Sewoori Union for AdKhan: Advertising Platform
                                </span>
                                <span className="align-right">
                                    {" "}
                                    <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div> */}
                        </div>
                        <div className="stakingMunieAmountNum">
                            <a>for each NFT per second</a>
                        </div>
                    </div>
                    <div className="munieAllStakingArrowUpSection">
                        <SlArrowUpIcon onPointerDown={(e) => goUp(ref.current)} onPointerUp={(e) => stopScroll(ref.current)} />
                    </div>
                    <div className="munieAllStakingContainer">
                        {getOldMunieStakingTokenIdImgVideoUrl !== "" ? (
                            <div className="allMunieStakingInfoImgContainer">
                                <div className="munieScrollBox">
                                    <div className="munieScrollBoxInner" ref={ref}>
                                        {getOldMunieStakingTokenIdImgVideoUrl.map((item, index) => {
                                            return (
                                                <div className="allMunieStakingInfoSection" key={index}>
                                                    <div
                                                        className="allMunieStakingInfoImgSection"
                                                        style={{
                                                            // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                                                            backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                                                            // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                                                        }}
                                                        onClick={() => window.open(`${item.externalUrl}`, "_blank")}
                                                        // onClick={()=>window.open(`https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA/videos`,'_blank')}
                                                    ></div>
                                                    <div className="allMunieStakingInfoNameSection">
                                                        {/* <p>Sheepoori # {item.tokenId} </p> */}
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

export default BeforeOldMunieViewAdsSection;
