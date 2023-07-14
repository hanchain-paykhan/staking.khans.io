import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6TopSection.scss";
import { HanLogo } from "../../assets/_index";
import { MdHelpIcon } from "../Icons/reactIcons";
import { stakingViewAction } from "../../redux/actions/rakis6StakingActions/stakingViewAction";
const Rakis6TopSection = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);
  const { HanQuantityLpQuantityPerYear1HanValue } = useSelector((state) => state.stakingView);

  useEffect(() => {
    dispatch(stakingViewAction.stakingViewAct(account));
  }, [account]);
  return (
    <>
      {/* <div className="stakingPageNewChange">
                <p>This is the formally Staking. Old Version is live at rakis6.paykhan.io/rakis6</p>
            </div> */}
      <div className="stakingPageHanLogoContainer">
        <img className="stakingHanLogo" src={HanLogo} alt="HanLogo" />
        <a>STAKING</a>
      </div>
      {/* {getAmount === 0 |? (
        <div>2sdadsadas</div>
      ) : (
        <div>
          <Loading />
        </div>
      )} */}
      <div className="stakingAllAmountContainer">
        <div className="stakingAprAmountContainer">
          <div className="stakingAprAmountTitle">
            <div className="stakingAprAmountTxt">
              <a>APR</a>
            </div>
            <div className="tooltip-container">
              <i className="info-icon material-icons">
                <MdHelpIcon />
              </i>
              <div className="tooltip-content">
                <span>
                  APR displayed is not historical statistics. According to the LP token quantity standard that fluctuates with the HAN
                  weight of the POOL, when staking at the present time, APR is the annual interest rate of the amount of HAN to be obtained
                  against the liquidity supplied.
                </span>
                <span className="align-right">
                  <a href="https://medium.com/@HanIdentity/hanchain-x-optimism-x-uniswap-v3-x-arrakis-af564de80f81" target="_blank">
                    Read More
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="stakingAprAmountNum">
            <a>{HanQuantityLpQuantityPerYear1HanValue}%</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rakis6TopSection;
