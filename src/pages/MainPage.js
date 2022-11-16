import React from 'react'
import "./MainPage.scss"
import { useNavigate } from 'react-router-dom'
import { MainHanLogo, MainArrakisLogo, MainUniLogo, MainTwitterLogo, MainFacebookLogo, MainDiscordLogo, MainTelegramLogo, MainMediumLogo, MainGithubLogo, MainEnterLogo, MainOffLogo, MainAdLogo   } from '../img/_index'
import HelpIcon from '@mui/icons-material/Help';




const MainPage = () => {

    const navigate = useNavigate();

    const myFunction=()=> {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);

        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied: " + copyText.value;
    }

    const outFunc=()=> {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
    }

    const openNewPopUp = () => {
        navigate("./rakis6")
    }

    

    

  return (
    <div>
        <div className="home-section">
          <div className="home-content">
            <div className="home-1">
              <div className="pjtxt">
                <div className="hanlogo">
                  <img src={MainHanLogo} />
                </div>
                <div className="hantxt">
                  <b>HANCHAIN PROJECT</b>
                </div>
              </div>
            </div>
            <div className="home-eth">
              <div className="eth-box">
                <div className="eth-txt">
                  <h4>STAKING</h4>
                </div>
                <div className="home-pools" id="staking">
                  <div className="home-2">
                    <div className="home-2_0">
                      <img src={MainArrakisLogo} />
                    </div>
                    <div className="home-2_1">
                      Arrakis Vault WETH/HAN
                    </div>
                    <div className="tooltip-main-container">
                      <i className="info-icon material-main-icons"><HelpIcon/></i>
                      <div className="tooltip-main-content">
                        <p>APR displayed is not historical statistics. 
                      According to the LP token quantity standard that fluctuates with the HAN weight of the POOL, when staking at the present time, APR is the annual interest rate of the amount of HAN to be obtained against the liquidity supplied.
                      <br></br><a className='align-main-right' href='https://medium.com/@HanIdentity/hanchain-x-optimism-x-uniswap-v3-x-arrakis-af564de80f81' target="_blank">Read More</a></p>
                      </div>
                    </div>
                    <div className="home-2_2 staking_btn">
                        <a href="/rakis6" target="_blank">Go</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="eth-box">
                <div className="eth-txt">
                  <h4>POOL</h4>
                </div>
                <div className="home-pools" id="pool">
                  <div className="home-2">
                    <div className="home-2_0">
                      <img src={MainArrakisLogo} />
                    </div>
                    <div className="home-2_1">
                      WETH-V3-HAN
                    </div>
                    <div className="home-2_2 add-btn1">
                      <a href="https://beta.arrakis.finance/vaults/10/0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f/add" target="_blank"> Add</a>
                    </div>
                  </div>
                  <div className="home-2">
                    <div className="home-2_0">
                      <img src={MainUniLogo} />
                    </div>
                    <div className="home-2_1">
                      USDC-V2-HAN
                    </div>
                    <div className="home-2_2 add-btn2">
                      <a href="https://bafybeigkgx3gq5yrrsyxpna2czlq3bc2ish2gk6yqh7v57kugehlq6qoly.ipfs.dweb.link/#/add/v2/0x0c90C57aaf95A3A87eadda6ec3974c99D786511F/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" target="_blank"> Add</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-footer-logo">
          <div className="home-footer">
            <div>
              <div className="ether">
                <span className="ether_logo">
                  <img width="20px" height="20px" src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" />
                </span>
                <input className="ether_txt" id="myInput" defaultValue="0x0c90c57aaf95a3a87eadda6ec3974c99d786511f" style={{border: 'none', background: 'transparent'}} />
                <a className="ether_copy tooltip">
                  <button onClick={myFunction} onMouseOut={outFunc} style={{border: 'none', background: 'transparent', display: 'flex'}}>
                    <span className="tooltiptext" id="myTooltip">Copy to clipboard</span>
                    <i className="far fa-far fa-clone" />
                  </button>
                </a>
                <a href="./meta.html" className="tooltip">
                  <img width="20px" height="20px" src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg" />
                  <span className="tooltiptext" id="metamask_txt">Add to Metamask</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_twiter">
                <a href="https://twitter.com/HanIdentity" target="_blank" className="tooltip2">
                  <img src={MainTwitterLogo} />
                  <span className="tooltiptext2">Twiter</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_facebook">
                <a href="https://www.facebook.com/HanChainGlobalOfficial-101331419212206" target="_blank" className="tooltip2">
                  <img src={MainFacebookLogo} />
                  <span className="tooltiptext2">Facebook</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_discord">
                <a href="https://discord.gg/5gtfUuvJJX" target="_blank" className="tooltip2">
                  <img src={MainDiscordLogo} />
                  <span className="tooltiptext2">Discord</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_telegram">
                <a href="https://t.me/hanchain_official" target="_blank" className="tooltip2">
                  <img src={MainTelegramLogo} />
                  <span className="tooltiptext2">Telegram</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_medium">
                <a href="https://medium.com/@HanIdentity" target="_blank" className="tooltip2">
                  <img src={MainMediumLogo} />
                  <span className="tooltiptext2">Medium</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_github">
                <a href="https://github.com/hanchain-paykhan/hanchain" target="_blank" className="tooltip2">
                  <img src={MainGithubLogo} />
                  <span className="tooltiptext2">Github</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_enter">
                <a href="https://www.youtube.com/channel/UCQPzdwU4KHlXO3srolte0Dg" target="_blank" className="tooltip2">
                  <img src={MainEnterLogo} />
                  <span className="tooltiptext2">Entertainment</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_office">
                <a href="https://www.youtube.com/channel/UCw_N38K7yK754M7wbaOpx0g" target="_blank" className="tooltip2">
                  <img src={MainOffLogo} />
                  <span className="tooltiptext2">Youtube</span>
                </a>
              </div>
            </div>
            <div className="logoimg">
              <div className="logo_ad">
                <a href="https://www.youtube.com/channel/UCekUY9Bc3J9adN2tQ-uDXqA" target="_blank" className="tooltip2">
                  <img src={MainAdLogo} />
                  <span className="tooltiptext2">Advertisement</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MainPage
