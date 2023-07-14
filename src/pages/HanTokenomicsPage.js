import React, { useEffect } from "react";
import "./HanTokenomicsPage.scss";
import { OptimismRedLogo } from "../assets/_index";
import { useDispatch, useSelector } from "react-redux";
import { ethHanTokenomicAct } from "../redux/actions/tokenomicActions/HanTokenomics/ethHanTokenomicAction";
import { opHanTokenomicAct } from "../redux/actions/tokenomicActions/HanTokenomics/opHanTokenomicAction";
import { hanChainCirculatingAction } from "../redux/actions/tokenomicActions/HanTokenomics/hanChainCirculatingAction";
import { FiRefreshCcwIcon } from "../components/Icons/reactIcons";

const HanTokenomicsPage = () => {
  const dispatch = useDispatch();
  const {
    ethEplatform,
    ethPartner,
    ethFounder,
    ethTeamAdvisor,
    ethReward,
    ethMunie,
    ethSpr,
    ethMunieOneYear,
    ethSprOneYear,
    hanCirculating,
  } = useSelector((state) => state.ethHanTokenomic);
  const { opHanBonus, opMusikhan, opPvtRakis6, opRakis6, hanBonusOneYear, musikhanOneYear, pvtRakis6OneYear, rakis6OneYear } = useSelector(
    (state) => state.opHanTokenomic
  );
  const truncateAddress = (address, length = 6) => {
    if (address.length <= length + 2) {
      return address; // Return the original address if it's already shorter than the desired length
    }

    const start = address.slice(0, length + 2);
    const end = address.slice(-length);

    return `${start}...${end}`;
  };

  const changeHanCirCulState = () => {
    dispatch(hanChainCirculatingAction.hanChainCirculatingAct());
  };

  useEffect(() => {
    dispatch(ethHanTokenomicAct());
    dispatch(opHanTokenomicAct());
    dispatch(hanChainCirculatingAction.hanChainCirculatingAct());
  }, []);

  return (
    <div className="hanTokenomicPageContainer">
      <div className="hanTokenomicPageSection">
        <div className="hanTokenomicTopSection">
          <div className="hanTokenomicTotalSection">
            <p>Total Supply</p>
            <p>1,500,000,000 HAN</p>
          </div>
          <div className="hanCirCulatingSection">
            <p>Circulating Supply</p>
            <p>
              {hanCirculating} HAN
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
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0x495fcd7f56a0bf8be1f29be02d1aa5f492f2ff66"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x495fcd7f56a0bf8be1f29be02d1aa5f492f2ff66")}
                      </a>
                    </td>
                    <td>{ethEplatform}</td>
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
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0x19681f34afce6b7fadfb07cd34c8f20dcf0a4f2a"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x19681f34afce6b7fadfb07cd34c8f20dcf0a4f2a")}
                      </a>
                    </td>
                    <td>{ethPartner}</td>
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
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0x90a692e0819075c49100f9f5f2724e75d8a34711"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x90a692e0819075c49100f9f5f2724e75d8a34711")}
                      </a>
                    </td>
                    <td>{ethFounder}</td>
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
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0xc7bdbcda0b8162427868ac41713d2559a9e2281c"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xc7bdbcda0b8162427868ac41713d2559a9e2281c")}
                      </a>
                    </td>
                    <td>{ethTeamAdvisor}</td>
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
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0x3811f5674abbc216ad29a1edcdd0b05172a9f123"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x3811f5674abbc216ad29a1edcdd0b05172a9f123")}
                      </a>
                    </td>
                    <td>{ethReward}</td>
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
                    <td>Staking Munie</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0x7364f19d1db8babfd1a9df5da7ee8488d8cc9592"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x7364f19d1db8babfd1a9df5da7ee8488d8cc9592")}
                      </a>
                    </td>
                    <td>{ethMunie}</td>
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
                    <td>Staking SPR</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F?a=0xef66cf0f03ee87165eb9f7a785c8fdadae916d32"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xef66cf0f03ee87165eb9f7a785c8fdadae916d32")}
                      </a>
                    </td>
                    <td>{ethSpr}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking HanBonus</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x50Bce64397C75488465253c0A034b8097FeA6578?a=0x147534dc273e358632aded0a74265f70229512dc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x147534dc273e358632aded0a74265f70229512dc")}
                      </a>
                    </td>
                    <td>{opHanBonus}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking Musikhan</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x50Bce64397C75488465253c0A034b8097FeA6578?a=0x5ad7e2bf0204c066ac9c3dd7028ce30b41d12682"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x5ad7e2bf0204c066ac9c3dd7028ce30b41d12682")}
                      </a>
                    </td>
                    <td>{opMusikhan}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking Private Rakis6</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x50bce64397c75488465253c0a034b8097fea6578?a=0xd6d4eaaed79f618bcd0ea12dbdf45bb654287415"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xd6d4eaaed79f618bcd0ea12dbdf45bb654287415")}
                      </a>
                    </td>
                    <td>{opPvtRakis6}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking Rakis6</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x50bce64397c75488465253c0a034b8097fea6578?a=0x96ea5e0255dafe9825210f1375826fa4f0de1e8c"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x96ea5e0255dafe9825210f1375826fa4f0de1e8c")}
                      </a>
                    </td>
                    <td>{opRakis6}</td>
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
                    <td>Staking Munie</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0x03d32959696319026bbde564f128eb110aabe7af?a=0x7364f19d1db8babfd1a9df5da7ee8488d8cc9592"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x7364f19d1db8babfd1a9df5da7ee8488d8cc9592")}
                      </a>
                    </td>
                    <td>{ethMunieOneYear}</td>
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
                    <td>Staking SPR</td>
                    <td>
                      <a
                        href="https://etherscan.io/token/0xcee864b8633b96f5542f25e0b9942bf7557cc5c3?a=0xef66cf0f03ee87165eb9f7a785c8fdadae916d32"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xef66cf0f03ee87165eb9f7a785c8fdadae916d32")}
                      </a>
                    </td>
                    <td>{ethSprOneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking HanBonus</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x50Bce64397C75488465253c0A034b8097FeA6578?a=0x147534dc273e358632aded0a74265f70229512dc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x147534dC273e358632AdeD0a74265F70229512dC")}
                      </a>
                    </td>
                    <td>{hanBonusOneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking Musikhan</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x50Bce64397C75488465253c0A034b8097FeA6578?a=0x5AD7e2BF0204C066ac9C3DD7028cE30B41D12682"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x5AD7e2BF0204C066ac9C3DD7028cE30B41D12682")}
                      </a>
                    </td>
                    <td>{musikhanOneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking Private Rakis6</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x3fa8cee6795220ac25dd35d4d39ec306a3e4fb3f?a=0xd6d4eaaed79f618bcd0ea12dbdf45bb654287415"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0xd6d4eaaed79f618bcd0ea12dbdf45bb654287415")}
                      </a>
                    </td>
                    <td>{pvtRakis6OneYear}</td>
                  </tr>
                  <tr>
                    <td className="lockedImgSection">
                      <img width="20px" height="20px" src={OptimismRedLogo} alt="EthereumIcon"></img>
                      Optimism
                    </td>
                    <td>Staking Rakis6</td>
                    <td>
                      <a
                        href="https://optimistic.etherscan.io/token/0x3fa8cee6795220ac25dd35d4d39ec306a3e4fb3f?a=0x96ea5e0255dafe9825210f1375826fa4f0de1e8c"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {truncateAddress("0x96ea5e0255dafe9825210f1375826fa4f0de1e8c")}
                      </a>
                    </td>
                    <td>{rakis6OneYear}</td>
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

export default HanTokenomicsPage;
