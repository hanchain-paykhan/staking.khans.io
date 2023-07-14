import React from "react";
import "./MusiCompensationSection.scss";

const MusiCompensationSection = () => {
    return (
        <div>
            <div className="stakingMusiAllAmountContainer">
                <div className="stakingMusiAmountContainer">
                    <div className="stakingMusiAmountTitle">
                        <div className="stakingMusiAmountTxt">
                            <a>0.000000002314814815 HAN</a>
                        </div>
                        {/* <div className="tooltip-container">
                  <i className="info-icon material-icons">
                    <HelpIcon />
                  </i>
                  <div className="tooltip-content">
                    <span>
                      The right to possess digital content forever and get
                      yourself a Sheepoori card -Ms. Caring one of three sheep
                      siblings characters from Sewoori Union for AdKhan:
                      Advertising Platform
                    </span>
                    <span className="align-right">
                      {" "}
                      <a
                        href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                        target="_blank"
                      >
                        Read More
                      </a>
                    </span>
                  </div>
                </div> */}
                    </div>
                    <div className="stakingMusiAmountNum">
                        <a>for each 1MKN per second</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusiCompensationSection;
