import React, { useEffect } from "react";
import "./HanEpTokenomicsPage.scss";
import { OptimismRedLogo } from "../assets/_index";
import { useDispatch, useSelector } from "react-redux";
import { ethHanEpTokenomicAct } from "../redux/actions/tokenomicActions/HanEpTokenomics/ethHanEpTokenomicAction";
import { hanEpCirculatingAction } from "../redux/actions/tokenomicActions/HanEpTokenomics/hanEpCirculatingAction";

const HanEpTokenomicsPage = () => {
  const dispatch = useDispatch();

  const {
    ethHanEpEplatform,
    ethHanEpPartner,
    ethHanEpFounder,
    ethHanEpTeamAdvisor,
    ethHanEpReward,
    ethHanEpPvtUniV2,
    ethHanEpUniV2,
    ethHanEpMunieV2,
    ethHanEpSPRV2,
    ethHanEpPvtUniV2OneYear,
    ethHanEpUniV2OneYear,
    ethHanEpMunieV2OneYear,
    ethHanEpSPRV2OneYear,
    hanEpCirculating,
  } = useSelector((state) => state.ethHanEpTokenomic);

  const truncateAddress = (address, length = 6) => {
    if (address.length <= length + 2) {
      return address; // Return the original address if it's already shorter than the desired length
    }

    const start = address.slice(0, length + 2);
    const end = address.slice(-length);

    return `${start}...${end}`;
  };

  useEffect(() => {
    dispatch(hanEpCirculatingAction.hanEpCirculatingAct());
    dispatch(ethHanEpTokenomicAct());
  }, []);
  return (
    <div className="hanTokenomicPageContainer">
      <div className="hanTokenomicPageSection">
        <div className="hanTokenomicTopSection">
          <div className="hanTokenomicTotalSection">
            <p>Total Supply</p>
            <p>255,000,000 HANeP</p>
          </div>
          <div className="hanCirCulatingSection">
            <p>Circulating Supply</p>
            <p>
              {hanEpCirculating} HANeP
              {/* <FiRefreshCcwIcon className="hanCirCulRefreshIcon" onClick={changeHanCirCulState} /> */}
            </p>
          </div>
        </div>
        <div className="hanTokenomicInfoSection">
          <div className="hanTokenomicInfoSection-scrollBox">
            <div className="hanTokenomicInfoSection-scrollBoxInner">
              <table className="etherscan-table">
                <div className="mainHanLockTitleSection">
                  <p>Locked</p>
                </div>
                {/* <thead>
                  <tr>
                    <th>Block</th>
                    <th>Age</th>
                    <th>Txn Hash</th>
                    <th>Value</th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>ColdWallet ePlatfrom</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x495fcd7f56a0bf8be1f29be02d1aa5f492f2ff66"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x495fcd7f56a0bf8be1f29be02d1aa5f492f2ff66")}
                      </a>
                    </td>
                    <td>{ethHanEpEplatform}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>ColdWallet Partner</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x19681f34afce6b7fadfb07cd34c8f20dcf0a4f2a"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x19681f34afce6b7fadfb07cd34c8f20dcf0a4f2a")}
                      </a>
                    </td>
                    <td>{ethHanEpPartner}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>ColdWallet Founder</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x90a692e0819075c49100f9f5f2724e75d8a34711"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x90a692e0819075c49100f9f5f2724e75d8a34711")}
                      </a>
                    </td>
                    <td>{ethHanEpFounder}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>ColdWallet Team and Advisor</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0xc7bdbcda0b8162427868ac41713d2559a9e2281c"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xc7bdbcda0b8162427868ac41713d2559a9e2281c")}
                      </a>
                    </td>
                    <td>{ethHanEpTeamAdvisor}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>ColdWallet Reward</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x3811f5674abbc216ad29a1edcdd0b05172a9f123"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x3811f5674abbc216ad29a1edcdd0b05172a9f123")}
                      </a>
                    </td>
                    <td>{ethHanEpReward}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking Private Uni V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0xb365bB98c1469732eab3b2Ed7f6c8fc494A27977"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xb365bB98c1469732eab3b2Ed7f6c8fc494A27977")}
                      </a>
                    </td>
                    <td>{ethHanEpPvtUniV2}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking Uni V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x08FCaca90F40cF9184Da1F433d1F283A414AEb28"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x08FCaca90F40cF9184Da1F433d1F283A414AEb28")}
                      </a>
                    </td>
                    <td>{ethHanEpUniV2}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking Munie V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x6A9c80Da002B4594000A822B8984C1A46b5b6f91"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x6A9c80Da002B4594000A822B8984C1A46b5b6f91")}
                      </a>
                    </td>
                    <td>{ethHanEpMunieV2}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking SPR V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070?a=0x282b3c1fF58B3b4587A22f761Bb1B8D2994FEB01"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x282b3c1fF58B3b4587A22f761Bb1B8D2994FEB01")}
                      </a>
                    </td>
                    <td>{ethHanEpSPRV2}</td>
                  </tr>
                  <tr>
                    <div className="mainHanLockTitleSection">
                      <p>Claimable per one year</p>
                    </div>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking Private Uni V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0xe1d6ad723e20206a655b0677354d67bcd671b084?a=0xb365bB98c1469732eab3b2Ed7f6c8fc494A27977"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x7364f19d1db8babfd1a9df5da7ee8488d8cc9592")}
                      </a>
                    </td>
                    <td>{ethHanEpPvtUniV2OneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking Uni V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0xe1d6ad723e20206a655b0677354d67bcd671b084?a=0x08FCaca90F40cF9184Da1F433d1F283A414AEb28"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xef66cf0f03ee87165eb9f7a785c8fdadae916d32")}
                      </a>
                    </td>
                    <td>{ethHanEpUniV2OneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking Munie V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x03d32959696319026bbde564f128eb110aabe7af?a=0x6A9c80Da002B4594000A822B8984C1A46b5b6f91"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x147534dC273e358632AdeD0a74265F70229512dC")}
                      </a>
                    </td>
                    <td>{ethHanEpMunieV2OneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img
                        width="20px"
                        height="20px"
                        src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                        alt="EthereumIcon"
                      ></img>
                      Mainnet
                    </td>
                    <td>Staking SPR V2</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0xcee864b8633b96f5542f25e0b9942bf7557cc5c3?a=0x282b3c1fF58B3b4587A22f761Bb1B8D2994FEB01"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x5AD7e2BF0204C066ac9C3DD7028cE30B41D12682")}
                      </a>
                    </td>
                    <td>{ethHanEpSPRV2OneYear}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HanEpTokenomicsPage;
