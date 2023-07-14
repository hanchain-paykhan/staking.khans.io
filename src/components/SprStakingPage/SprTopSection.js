import React from "react";
import "./SprTopSection.scss";
import { SprLogoBackX } from "../../assets/_index";

const SprTopSection = () => {
    return (
        <div>
            <div className="platFromPageNewChange">
                This is the formally Staking. Old Version is live at <a href="/hanep/old">staking.khans.io/hanep/old</a>
            </div>
            <div className="stakingPageSprLogoContainer">
                <img className="stakingSprLogo" src={SprLogoBackX} alt="HanLogo" />
                <a>SPR STAKING</a>
            </div>
            <div className="stakingSprAllAmountContainer">
                <div className="stakingSprAmountContainer">
                    <div className="stakingSprAmountTitle">
                        <div className="stakingSprAmountTxt">
                            <a>0.000001157407407407 HANeP</a>
                        </div>

                        {/* <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <MdHelp />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings characters from Sewoori Union for AdKhan:
                                    Advertising Platform
                                </span>
                                <span className="align-right">
                                    <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div> */}
                    </div>
                    <div className="stakingSprAmountNum">
                        <a>for each NFT per second</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SprTopSection;
