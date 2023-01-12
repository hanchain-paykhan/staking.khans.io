import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AirDropPage.scss";
import HanLogo from "../assets/images/HanLogo.svg";
import HelpIcon from "@mui/icons-material/Help";
import Web3 from "web3";
import { FiRefreshCcw } from "react-icons/fi";
import { OptimismRedLogo, ArrakisBlackIcon } from "../assets/_index";
import {
  WETHLogo,
  MunieLogo,
  MunieLogoBackX,
  MusiKhanLogo,
} from "../img/_index";
import { FcCancel } from "react-icons/fc";
import { Loading } from "../components";
import { airDropClaimAction } from "../redux/actions/airdropActions/airDropClaimAction";
import { airDropViewAction } from "../redux/actions/airdropActions/airDropViewAction";
import { airDropClaimedAction } from "../redux/actions/airdropActions/airDropClaimedAction";
import { airDropPriceAction } from "../redux/actions/airdropActions/airDropPriceAction";
import { airDropTimeStampAction } from "../redux/actions/airdropActions/airDropTimeStampAction";

const AirDropPage = () => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [error, setError] = useState();
  const [checkChainId, setCheckChainId] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    successAirDropClaim,
    canClaim,
    getProofToBack,
    getAmountToBack,
    claimed,
    claimDayDate,
    claimHoursDate,
    claimMinDate,
  } = useSelector((state) => state.airDropView);

  const { gasPriceResult } = useSelector((state) => state.gasPrice);

  const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);

  //---------------- Ethereum Network Switching ---------------- //
  const networks = {
    optimismTestNet: {
      chainId: `0x${Number(420).toString(16)}`,
      chainName: "Optimism Goerli",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [
        "https://opt-goerli.g.alchemy.com/v2/2lGr3nFlynOLUsom7cnrmg-hUtq7IcrM",
      ],
      blockExplorerUrls: ["https://goerli-optimistic.etherscan.io"],
    },
    optimism: {
      chainId: `0x${Number(10).toString(16)}`,
      chainName: "Optimism",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
  };

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
            // chainId : '0x1',
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const changeEthereumNetWork = async () => {
    await window.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  };

  const handleConnectWallet = async () => {
    if (window.ethereum === undefined) {
      window.open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
      );
    } else {
      const account = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setAccount(account[0]);
    }
  };

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  // add to LP token
  const addStakingToken = async () => {
    const tokenAddress = "0x6d8aA00034ECB1d2aD766117d7d35e1f94f18dE0";
    const tokenSymbol = "LP";
    const tokenDecimals = 18;
    const tokenImage =
      "https://github.com/sieun95/develop_note/blob/main/Arrakis%20Icon%20(monochrome).png?raw=true";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
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

  // add to Reward Token
  const addRewardToken = async () => {
    const tokenAddress = "0x0c90C57aaf95A3A87eadda6ec3974c99D786511F";
    const tokenSymbol = "HAN";
    const tokenDecimals = 18;
    const tokenImage =
      "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

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
    window.ethereum?.on("chainChanged", networkChanged);

    return () => {
      window.ethereum?.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const setup = useCallback(async () => {
    const account = await window.ethereum?.request({
      method: "eth_requestAccounts",
    });
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
    setAccount(account[0]);
  });

  useEffect(() => {
    setup();
    window.ethereum?.on("accountsChanged", () => {
      setup();
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum?.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum?.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);

  useEffect(() => {
    setLoading(false);
  });

  const changeTimeStampState = () => {
    dispatch(airDropTimeStampAction.airDropTimeStampAct());
  };

  useEffect(() => {
    dispatch(airDropPriceAction.airDropPriceAct(account));
    dispatch(airDropViewAction.airDropViewAct(account));
    dispatch(airDropTimeStampAction.airDropTimeStampAct());
  }, [account]);

  useEffect(() => {
    dispatch(airDropClaimedAction.airDropClaimedAct(account));
  }, [account]);

  const airDropClaim = () => {
    dispatch(
      airDropClaimAction.airDropClaimAct(
        account,
        getProofToBack,
        getAmountToBack,
        gasPriceResult
      )
    );
  };

  return (
    <div className="airDropPageContainer">
      <div className="airDropPageLogoContainer">
        <img className="airDropLogo" src={HanLogo} alt="HanLogo" />
        <a>HAN e-Platform Airdrop</a>
      </div>
      <div className="airDropAmountContainer">
        <div className="airDropAmountContainer">
          <div className="airDropAmountTitle">
            {/* <div className="airDropAmountTxt">
              <a>1 WETH = {getLatestPrice} USD</a>
            </div> */}

            {/* <div className="tooltip-container">
              <i className="info-icon material-icons">
                <HelpIcon />
              </i>
              <div className="tooltip-content">
                <span>
                  The right to possess digital content forever and get yourself
                  a Sheepoori card -Ms. Caring one of three sheep siblings
                  characters from Sewoori Union for AdKhan: Advertising Platform
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
        </div>
      </div>
      <Tabs className="Tabs">
        {/* <div className="stakedSprCanAmountSection">
          <p>STAKED : {getAmountStaked} </p>
        </div> */}
        {account === "" ? (
          <div className="connectAirDropMetaWalletSection">
            <a
              className="social-button button--social-login button--google"
              href="#"
            >
              <img
                width="20px"
                height="20px"
                src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg"
                className="social-icon fa fa-google"
              ></img>
              <p onClick={handleConnectWallet}>Connect Wallet</p>
            </a>
          </div>
        ) : checkChainId === "0x1" ? (
          <div className="connectAirDropEtherWalletSection">
            <a
              className="social-button button--social-login button--google"
              href="#"
            >
              <img
                width="20px"
                height="20px"
                src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                className="social-icon fa fa-google"
              ></img>
              {account.substr(0, 6)}...{account.slice(-6)}
            </a>
          </div>
        ) : checkChainId === "Oxa" ? (
          <div className="connectOptiComWalletSection">
            <a
              className="social-button button--social-login button--google"
              href="#"
            >
              <img
                width="20px"
                height="20px"
                src={OptimismRedLogo}
                className="social-icon fa fa-google"
              ></img>
              {account.substr(0, 6)}...{account.slice(-6)}
            </a>
          </div>
        ) : (
          <div className="cantConnectAirDropWalletSection">
            <a
              className="social-button button--social-login button--google"
              href="#"
              onClick={() => handleNetworkSwitch("optimism")}
            >
              <FcCancel className="social-icon fa fa-google" />
              {account.substr(0, 6)}...{account.slice(-6)}
            </a>
          </div>
        )}
        <TabList>
          {/* <Tab className="airDropTitleContainer">AIRDROP</Tab> */}
        </TabList>
        <TabPanel>
          <div className="airDropTabContainer">
            {getLatestPrice ? (
              <div className="airDropTabSection">
                <div className="airDropWethSection">
                  <div className="airDropWethLogoSection">
                    <img src={WETHLogo} />
                  </div>
                  <div className="airDropWethTxt">
                    <p>WETH</p>
                  </div>
                  {checkChainId === "Oxa" ? (
                    canClaim === true ? (
                      <div className="airDropWethBtn">
                        <button
                          className="weth-learn-more"
                          onClick={airDropClaim}
                        >
                          Claim
                        </button>
                      </div>
                    ) : claimed === true ? (
                      <div className="airDropWethBtn">
                        <button
                          className="cant-weth-learn-more"
                          disabled={true}
                        >
                          Already Claimed
                        </button>
                      </div>
                    ) : (
                      <div className="airDropWethBtn">
                        <button
                          className="cant-weth-learn-more"
                          disabled={true}
                        >
                          Nothing to Claim
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="airDropWethBtn">
                      <button
                        className="switch-weth-learn-more"
                        disabled={true}
                      >
                        Switch to Optimism
                      </button>
                    </div>
                  )}
                  <div className="airDropWethTimeStampSection">
                    <div className="airDropWethTimeStampTitle">
                      <a>Remaining Duration</a>
                    </div>
                    <div className="airDropWethTimeStampInfo">
                      <a className="wethDayDate">{claimDayDate}D</a>
                      <a className="wethHoursDate">{claimHoursDate}H</a>
                      <a className="wethMinDate">{claimMinDate}M</a>
                      {/* <a> */}
                      <FiRefreshCcw
                        className="airDropWethReFreshTimeStamp"
                        onClick={changeTimeStampState}
                      />
                      {/* </a> */}
                    </div>
                    <p></p>
                  </div>
                  <div className="airDropWethPriceSection">
                    <a>1 WETH = {getLatestPrice} USD</a>
                  </div>
                </div>
                <div className="airDropMucikhanSection">
                  <div className="airDropMusiKhanLogoSection">
                    <img src={MusiKhanLogo} />
                  </div>
                  <div className="airDropMuciTxt">
                    <p>MusiKhan</p>
                  </div>
                  <div className="airDropMuciBtn">
                    <button className="cant-muci-learn-more" disabled={true}>
                      Coming Soon
                    </button>
                  </div>
                  <div className="airDropMusiTimeStampSection">
                    <div className="airDropMusiTimeStampTitle">
                      <a>Remaining Duration</a>
                    </div>
                    <div className="airDropMusiTimeStampInfo">
                      <a className="musiDayDate">28D</a>
                      <a className="musiHoursDate">00H</a>
                      <a className="musiMinDate">00M</a>
                      <FiRefreshCcw
                        className="airDropMusiReFreshTimeStamp"
                        // onClick={changeTimeStampState}
                      />
                    </div>
                  </div>
                </div>
                <div className="airDropMuniSection">
                  <div className="airDropMunieLogoSection">
                    <img src={MunieLogoBackX} />
                  </div>
                  <div className="airDropMuniTxt">
                    <p>NFT Munie</p>
                  </div>
                  <div className="airDropMuniBtn">
                    <button className="cant-muni-learn-more" disabled={true}>
                      Coming Soon
                    </button>
                  </div>
                  <div className="airDropMuniTimeStampSection">
                    <div className="airDropMuniTimeStampTitle">
                      <a>Remaining Duration</a>
                    </div>
                    <div className="airDropMuniTimeStampInfo">
                      <a className="muniDayDate">28D</a>
                      <a className="muniHoursDate">00H</a>
                      <a className="muniMinDate">00M</a>
                      <FiRefreshCcw
                        className="airDropMuniReFreshTimeStamp"
                        // onClick={changeTimeStampState}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="airDropLoadingSection">
                <Loading />
              </div>
            )}
            <div className="airDropBottomLineSection">
              <hr className="bottomHr"></hr>
            </div>
          </div>
        </TabPanel>
        <div className="logoContainer">
          <img
            src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
            onClick={changeEthereumNetWork}
            className="opIcon"
          />
          <img
            src={OptimismRedLogo}
            onClick={() => handleNetworkSwitch("optimism")}
            className="opIcon"
          />
          <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
        </div>
      </Tabs>
    </div>
  );
};

export default AirDropPage;
