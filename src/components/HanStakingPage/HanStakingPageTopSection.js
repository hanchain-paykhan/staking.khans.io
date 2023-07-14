import React from "react";
import "./HanStakingPageTopSection.scss";
import { HanLogo } from "../../assets/_index";

const HanStakingPageTopSection = () => {
    return (
        <div>
            <div className="hanStakingPageLogoContainer">
                <img className="hanStakingLogo" src={HanLogo} alt="HanLogo" />
                <a>HAN BONUS STAKING</a>
            </div>
            <div className="hanStakingAllAmountContainer">
                <div className="hanStakingAprAmountContainer">
                    <div className="hanStakingAprAmountTitle">
                        <div className="hanStakingAprAmountTxt">
                            <a>0.00000004318912037 HAN </a>
                        </div>
                        {/* <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <HelpIcon />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    APR displayed is not historical statistics. According to the LP token quantity standard that fluctuates with the HAN weight
                                    of the POOL, when staking at the present time, APR is the annual interest rate of the amount of HAN to be obtained against
                                    the liquidity supplied.
                                </span>
                                <span className="align-right">
                                    <a href="https://medium.com/@HanIdentity/hanchain-x-optimism-x-uniswap-v3-x-arrakis-af564de80f81" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div> */}
                    </div>
                    <div className="hanStakingAprAmountNum">
                        <a> for each HAN per second</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HanStakingPageTopSection;
