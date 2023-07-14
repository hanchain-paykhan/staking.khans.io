import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UniV2TopSection.scss";
import { WhiteUniLogo } from "../../assets/_index";
import { uniV2APRViewAction } from "../../redux/actions/uniV2StakingActions/uniV2APRViewAction";

const UniV2TopSection = () => {
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.account);
    const { stakingUniV2APR } = useSelector((state) => state.uniV2View);

    useEffect(() => {
        dispatch(uniV2APRViewAction.uniV2APRViewAct(account));
    }, [account]);
    return (
        <div>
            <div className="usdcHanEpPageLogoContainer">
                <img className="usdcHanEpLogo" src={WhiteUniLogo} alt="HanLogo" />
                <a>UNI-V2 STAKING</a>
            </div>
            <div className="usdcHanEpAllAmountContainer">
                <div className="usdcHanEpAprAmountContainer">
                    <div className="usdcHanEpAprAmountTitle">
                        <div className="usdcHanEpAprAmountTxt">
                            <a>APR</a>
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
                    <div className="usdcHanEpAprAmountNum">
                        <a>{stakingUniV2APR}%</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniV2TopSection;
