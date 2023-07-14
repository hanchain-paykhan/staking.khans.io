import React, { useEffect } from "react";
import "./MainPage.scss";

import { useDispatch, useSelector } from "react-redux";
import { hanChainPriceActtion } from "../redux/actions/mainActions/hanChainPriceAction";
import {
  SprLogoBackX,
  MainHanLogo,
  WhiteUniLogo,
  MunieLogoBackX,
  MainFacebookLogo,
  MainTwitterLogo,
  MainDiscordLogo,
  MainTelegramLogo,
  MainMediumLogo,
  MainGithubLogo,
  MainOffLogo,
  MainAdLogo,
  MainEnterLogo,
  MainArrakisLogo,
  HanLogo,
  HANePLogo20,
} from "../assets/_index";
import { MdHelpIcon } from "../components/Icons/reactIcons";

const MainPage = () => {
  const dispatch = useDispatch();

  const { hanChainPrice, hanChainPercentage } = useSelector((state) => state.coinPrice);

  const myFunction = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
  };

  const outFunc = () => {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  };

  const addRewardToken = async () => {
    const tokenAddress = "0xC7483FbDB5c03E785617a638E0f22a08da10084B";
    const tokenSymbol = "HAN";
    const tokenDecimals = 18;
    const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

    try {
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(hanChainPriceActtion.hanChainPriceAct());
  }, []);

  return (
    <div className="mainPageTestContainer">
      <div className="mainPageTopPaddingSection"></div>
      <div className="mainPageLogoTitleContainer">
        <div className="mainPageLogoSection">
          <img src={MainHanLogo} alt="HanLogo" />
        </div>
        <div className="mainPageTitleTxtSection">
          <a>KHAN's STAKING</a>
        </div>
      </div>
      <div className="hanChainPriceContainer">
        <div className="hanChainPriceSection">
          <div className="hanChainPricTextSection">
            <span className="hanChainPriceTitleSection">
              <a href="https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/hanchain" target="_blank">
                HanChain (HAN)
              </a>
            </span>
            <br />
            <span className="hanChainPriceAmountSection">{hanChainPrice}</span>
            <span className="hanChainPriceUnitSection">USD</span>
            {hanChainPercentage > 0 ? (
              <span className="hanChainPrice24hPercentageInSection">({hanChainPercentage}%)</span>
            ) : (
              <span className="hanChainPrice24HPercentageDeSection">({hanChainPercentage}%)</span>
            )}
          </div>
        </div>
        <div className="test2">
          <a href="https://www.coingecko.com/ko/%EC%BD%94%EC%9D%B8/hanchain" target="_blank">
            Powered by CoinGecko
          </a>
        </div>
      </div>
      <div className="airDropSection">
        <a href="/hanep" target="_blank" className="airDropTxt1">
          HAN e-Platform
        </a>
        {/* <a href="/hanep" target="_blank" className="airDropTxt2">
                    Airdrop
                </a> */}
      </div>

      <div className="mainPageStakingPoolContainer">
        <div className="mainPageStakingContainer">
          <div className="mainPageStakingTitleSection">
            <p>STAKING</p>
          </div>

          <div className="mainPageStakingBoxSection">
            <div className="stakingBoxHanepSection">
              <div className="stakingBoxHanepLogoSection">
                <img src={WhiteUniLogo} alt="ArrakisLogo" />
              </div>
              <div className="stakingBoxHanepTxtSection">
                <p>Uniswap V2 USDC/HANeP</p>
              </div>
              {/* <div className="tooltip-Hanep-main-container">
                                <i className="info-icon material-main-icons">
                                    <HelpIcon />
                                </i>
                                <div className="tooltip-Hanep-main-content">
                                    <p>
                                        APR displayed is not historical statistics. According to the LP token quantity standard that fluctuates with the HAN
                                        weight of the POOL, when staking at the present time, APR is the annual interest rate of the amount of HAN to be
                                        obtained against the liquidity supplied.
                                        <br></br>
                                        <a
                                            className="align-Hanep-main-right"
                                            href="https://medium.com/@HanIdentity/hanchain-x-optimism-x-uniswap-v3-x-arrakis-af564de80f81"
                                            target="_blank"
                                        >
                                            Read More
                                        </a>
                                        l{" "}
                                    </p>
                                    <p className="align-main-right"> </p>
                                </div>
                            </div> */}
              <div className="stakingBoxHanepBtnSection">
                <a href="/univ2" target="_blank">
                  GO
                </a>
              </div>
            </div>

            <div className="stakingBoxArrakisSection">
              <div className="stakingBoxArrakisLogoSection">
                <img src={MainArrakisLogo} alt="ArrakisLogo" />
              </div>
              <div className="stakingBoxArrakisTxtSection">
                <p>Arrakis Vault WETH/HAN</p>
              </div>
              <div className="tooltip-rakis6-main-container">
                <i className="info-icon material-main-icons">
                  <MdHelpIcon />
                </i>
                <div className="tooltip-rakis6-main-content">
                  <p>
                    APR displayed is not historical statistics. According to the LP token quantity standard that fluctuates with the HAN
                    weight of the POOL, when staking at the present time, APR is the annual interest rate of the amount of HAN to be
                    obtained against the liquidity supplied.
                    <br></br>
                    <a
                      className="align-rakis6-main-right"
                      href="https://medium.com/@HanIdentity/hanchain-x-optimism-x-uniswap-v3-x-arrakis-af564de80f81"
                      target="_blank"
                    >
                      Read More
                    </a>
                    l{" "}
                  </p>
                  {/* <p className="align-main-right"> </p> */}
                </div>
              </div>
              <div className="stakingBoxArrakisBtnSection">
                <a href="/rakis6" target="_blank">
                  GO
                </a>
              </div>
            </div>

            {/* <div className="stakingBoxMusiSection">
                            <div className="stakingBoxMusiLogoSection">
                                <img src={MusiKhanLogo} />
                            </div>
                            <div className="stakingBoxMusiTxtSection">
                                <p>MusiKhan tokens</p>
                            </div>
                            <div className="tooltip-main-musi-container">
                                <i className="info-icon material-main-musi-icons">
                                    <HelpIcon />
                                </i>
                                <div className="tooltip-main-musi-content">
                                    <p>
                                        The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                        characters from Sewoori Union for AdKhan: Advertising Platform
                                        <br></br>
                                        <a
                                            className="align-main-musi-right"
                                            href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                                            target="_blank"
                                        >
                                            Read More
                                        </a>
                                    </p>
                                    <p className="align-main-right"> </p>
                                </div>
                            </div>
                            <div className="stakingBoxMusiBtnSection">
                                <a href="/musikhan" target="_blank">
                                    GO
                                </a>
                            </div>
                        </div> */}
            <div className="stakingBoxSpriSection">
              <div className="stakingBoxSpriLogoSection">
                <img src={SprLogoBackX} alt="SprLogo" />
              </div>
              <div className="stakingBoxSpriTxtSection">
                <p>Sheepoori SPR NFT</p>
              </div>
              <div className="tooltip-main-spri-container">
                <i className="info-icon material-main-spri-icons">
                  <MdHelpIcon />
                </i>
                <div className="tooltip-main-spri-content">
                  <p>
                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                    characters from Sewoori Union for AdKhan: Advertising Platform
                    <br></br>
                    <a
                      className="align-main-spri-right"
                      href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                      target="_blank"
                    >
                      Read More
                    </a>
                  </p>
                  {/* <p className="align-main-right"> </p> */}
                </div>
              </div>
              <div className="stakingBoxSpriBtnSection">
                <a href="/spr" target="_blank">
                  GO
                </a>
              </div>
            </div>
            <div className="stakingBoxHanSection">
              <div className="stakingBoxHanLogoSection">
                <img src={MainHanLogo} alt="HanLogo" />
              </div>
              <div className="stakingBoxHanTxtSection">
                <p>HAN BONUS</p>
              </div>
              {/* <div className="tooltip-main-han-container">
                                <i className="info-icon material-main-han-icons">
                                    <HelpIcon />
                                </i>
                                <div className="tooltip-main-han-content">
                                    <p>
                                        The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                        characters from Sewoori Union for AdKhan: Advertising Platform
                                        <br></br>
                                        <a
                                            className="align-main-han-right"
                                            href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3"
                                            target="_blank"
                                        >
                                            Read More
                                        </a>
                                    </p>
                                    <p className="align-main-right"> </p>
                                </div>
                            </div> */}
              <div className="stakingBoxHanBtnSection">
                <a href="/hanbonus" target="_blank">
                  GO
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mainPagePoolContainer">
          <div className="mainPagePoolTitleSection">
            <p>MARKET</p>
          </div>
          <div className="mainPagePoolBoxSection">
            <div className="poolBoxHanEpSection">
              <div className="poolBoxHanEpLogoSection">
                <img src={WhiteUniLogo} alt="ArrakisLogo" />
              </div>
              <div className="poolBoxHanEpTxtSection">
                <p>USDC-V2-HANeP</p>
              </div>
              <div className="poolBoxHanEpBtnSection">
                <a
                  href="https://app.uniswap.org/#/add/v2/0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                  target="_blank"
                >
                  ADD POOL
                </a>
              </div>
            </div>
            <div className="poolBoxWethSection">
              <div className="poolBoxWethLogoSection">
                <img src={MainArrakisLogo} alt="ArrakisLogo" />
              </div>
              <div className="poolBoxWethTxtSection">
                <p>WETH-V3-HAN</p>
              </div>
              <div className="poolBoxWethBtnSection">
                <a href="https://beta.arrakis.finance/vaults/0x3fa8cee6795220ac25dd35d4d39ec306a3e4fb3f" target="_blank">
                  ADD POOL
                </a>
              </div>
            </div>
            <div className="poolBoxUsdcSection">
              <div className="poolBoxUsdcLogoSection">
                <img src={WhiteUniLogo} alt="MunieLogo" />
              </div>
              <div className="poolBoxUsdcTxtSection">
                <p>USDC-V2-HAN</p>
              </div>
              <div className="poolBoxUsdcBtnSection">
                <a
                  href="https://app.uniswap.org/#/add/v2/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                  target="_blank"
                >
                  ADD POOL
                </a>
              </div>
            </div>
            <div className="poolBoxSpriSection">
              <div className="poolBoxSpriLogoSection">
                <img src={SprLogoBackX} alt="SprLogo" />
              </div>
              <div className="poolBoxSpriTxtSection">
                <p>Sheepoori SPR NFT</p>
              </div>
              <div className="poolBoxSpriBtnSection">
                <a href="https://opensea.io/collection/sheepoori" target="_blank">
                  PURCHASE
                </a>
              </div>
            </div>
            <div className="poolBoxMunieSection">
              <div className="poolBoxMunieLogoSection">
                <img src={MunieLogoBackX} alt="MunieLogo" />
              </div>
              <div className="poolBoxMunieTxtSection">
                <p>Munie NFT</p>
              </div>
              <div className="poolBoxMunieBtnSection">
                <a href="https://opensea.io/collection/munie" target="_blank">
                  PURCHASE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-footer-logo">
        <div className="tokenomics-Section">
          <div className="hanTokenomicsSection">
            <a href="/hanscan" target="_blank">
              <img src={HanLogo} width="20px" height="20px"></img>
              Tokenomics
            </a>
          </div>
          <div className="hanEpTokenomicsSection">
            <a href="/hanepscan" target="_blank">
              <img src={HANePLogo20} width="20px" height="20px"></img>
              Tokenomics
            </a>
          </div>
        </div>
        <div className="home-footer">
          {/* <div className="airDropSection">
            <div className="airDropBtnSection">
              <a href="/airdrop" target="_blank">
                Go
              </a>
            </div>
          </div> */}
          <div>
            <div className="ether">
              <span className="ether_logo">
                <img
                  width="20px"
                  height="20px"
                  src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                  alt="EthereumIcon"
                />
              </span>
              <input
                className="ether_txt"
                id="myInput"
                defaultValue="0x0c90c57aaf95a3a87eadda6ec3974c99d786511f"
                style={{ border: "none", background: "transparent" }}
              />
              <a className="ether_copy tooltip">
                <button
                  onClick={myFunction}
                  onMouseOut={outFunc}
                  style={{
                    border: "none",
                    background: "transparent",
                    display: "flex",
                  }}
                >
                  <span className="tooltiptext" id="myTooltip">
                    Copy to clipboard
                  </span>
                  <i className="far fa-far fa-clone" />
                </button>
              </a>
              <a onClick={addRewardToken} className="tooltip">
                <img
                  width="20px"
                  height="20px"
                  src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg"
                  alt="MetamaskLogo"
                />
                <span className="tooltiptext" id="metamask_txt">
                  Add to Metamask
                </span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_twiter">
              <a href="https://twitter.com/HanIdentity" target="_blank" className="tooltip2">
                <img src={MainTwitterLogo} alt="TwitterLogo" />
                <span className="tooltiptext2">Twiter</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_facebook">
              <a href="https://www.facebook.com/HanChainGlobalOfficial-101331419212206" target="_blank" className="tooltip2">
                <img src={MainFacebookLogo} alt="FacebookLogo" />
                <span className="tooltiptext2">Facebook</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_discord">
              <a href="https://discord.gg/5gtfUuvJJX" target="_blank" className="tooltip2">
                <img src={MainDiscordLogo} alt="DiscordLogo" />
                <span className="tooltiptext2">Discord</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_telegram">
              <a href="https://t.me/hanchain_official" target="_blank" className="tooltip2">
                <img src={MainTelegramLogo} alt="TelegramLogo" />
                <span className="tooltiptext2">Telegram</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_medium">
              <a href="https://medium.com/@HanIdentity" target="_blank" className="tooltip2">
                <img src={MainMediumLogo} alt="MediumLogo" />
                <span className="tooltiptext2">Medium</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_github">
              <a href="https://github.com/hanchain-paykhan" target="_blank" className="tooltip2">
                <img src={MainGithubLogo} alt="GithubLogo" />
                <span className="tooltiptext2">Github</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_enter">
              <a href="https://www.youtube.com/channel/UCQPzdwU4KHlXO3srolte0Dg" target="_blank" className="tooltip2">
                <img src={MainEnterLogo} alt="EnterLogo" />
                <span className="tooltiptext2">Entertainment</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_office">
              <a href="https://www.youtube.com/channel/UCw_N38K7yK754M7wbaOpx0g" target="_blank" className="tooltip2">
                <img src={MainOffLogo} alt="MainOffLogo" />
                <span className="tooltiptext2">Youtube</span>
              </a>
            </div>
          </div>
          <div className="logoimg">
            <div className="logo_ad">
              <a href="https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA" target="_blank" className="tooltip2">
                <img src={MainAdLogo} alt="MainAdLogo" />
                <span className="tooltiptext2">Advertisement</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
