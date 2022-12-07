import React, { useEffect, useCallback, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {useLocation} from 'react-router-dom';
import "./SprStakingPage.scss"
import HanLogo from "../assets/images/HanLogo.svg";
import HelpIcon from "@mui/icons-material/Help";
import Web3 from "web3";
import { ArrakisBlackIcon } from "../assets/_index";
import { FiRefreshCcw } from "react-icons/fi";
import { sprStakingAction } from '../redux/actions/sprStakingAction';
import { sprStakingCancelAction } from '../redux/actions/sprStakingCancelAction';
import { sprStakingRewardAction } from '../redux/actions/sprStakingRewardAction';
import { sprStakingViewAction } from '../redux/actions/sprStakingViewAction';
import { SheepooriStakingAddress, SheepooriTokenAddress, SheepooriTokenContract } from "../config/SheepooriStakingConfig"
// import { SheepooriStakingAddress, SheepooriTokenAddress, SheepooriTokenContract } from "../config/SheepooriStakingConfigTest"
import { sprStakingAllApproveAction } from '../redux/actions/sprStakingAllApproveAction';
import { sprStakingSingleApproveAction } from '../redux/actions/sprStakingSingleApproveAction';
import { FcCancel } from "react-icons/fc";
import SheepooriLogo from "../assets/images/sheeprilogo.png"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Loading from '../components/SprStakingPage/Loading';
import { sprStakingResultViewAction } from '../redux/actions/sprStakingResultViewAction';
import { sprSingleApproveStateAction } from '../redux/actions/sprSingleApproveStateAction';
import { gasPriceResultAction } from '../redux/actions/gasPriceResultAction';
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";




const SprStakingPage = () => {
    const dispatch = useDispatch();
    const [account, setAccount] = useState("");
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState();
    const [checkChainId, setCheckChainId] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [tokenAmount, setTokenAmount] = useState("");
    const [stakingmyTokenId, setMyTokenId ] = useState("");
    const [mytestStakedTokenId, setMyStakedTokenId] = useState("");
    const [loading, setLoading] = useState(true);
    const item = useLocation();
    
    const {
      getTotalTokenIds,
      stakingNftNumber,
      getAmountStaked,
      myTokenId,
      myStakedTokenId,
      successSprAllApprove,
      getStakedTokenIds,
      getMyTokenIds,
      isApprovedForAll,
      successSprApprove,
      getApproved,
      tokenUrl,
      tokenUnStakingUrl,
      stakingTokenIdImg,
      // gasPriceResult,
      


    } = useSelector((state)=> state.sprStakingView);

    const {
      sprResultValue,
      getUnclaimedRewards,
      getTotalReward,
    } = useSelector((state)=> state.sprStakingResultView)

    const {
      getSingleApproved,
    } = useSelector((state)=>state.sprStakingApporveView)


    const {
      gasPriceResult,
    } = useSelector((state)=> state.gasPrice)

    // console.log(gasPriceResult,"32423454385458")
  //---------------- Ethereum Network Switching ----------------
  const networks = {
    GoerliTestNetwork: {
      chainId: `0x${Number(5).toString(16)}`,
      chainName: "Goerli Test Network",
      nativeCurrency: {
        name: "GoerliETH",
        symbol: "GoerliETH",
        decimals: 18,
      },
      rpcUrls: [
        "https://goerli.infura.io/v3",
      ],
      blockExplorerUrls: ["https://goerli.etherscan.io"],
    },
    EthereumMainNetwork: {
      chainId: `0x${Number(1).toString(16)}`,
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"],
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
  }

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
  // 배포전 지울거
    // add to LP token
  // const addStakingToken = async () => {
  //   const tokenAddress = "0x6d8aA00034ECB1d2aD766117d7d35e1f94f18dE0";
  //   const tokenSymbol = "LP";
  //   const tokenDecimals = 18;
  //   const tokenImage =
  //     "https://github.com/sieun95/develop_note/blob/main/Arrakis%20Icon%20(monochrome).png?raw=true";

  //   try {
  //     // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  //     const wasAdded = await window.ethereum?.request({
  //       method: "wallet_watchAsset",
  //       params: {
  //         type: "ERC20", // Initially only supports ERC20, but eventually more!
  //         options: {
  //           address: tokenAddress, // The address that the token is at.
  //           symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
  //           decimals: tokenDecimals,
  //           image: tokenImage,
  //         },
  //       },
  //     });

  //     if (wasAdded) {
  //       console.log("Thanks for your interest!");
  //     } else {
  //       console.log("Your loss!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
 
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

  useEffect(()=> {
    setLoading(false)
  })

  

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
  }, [window.ethereum?.chainId]);

  // console.log(window.ethereum.chainId,"chainid")
  const sprStaking = () => {
    dispatch(sprStakingAction.sprStakingAct(account, Number(stakingmyTokenId), gasPriceResult));
  }

  const sprSingleApprove = () => {
    dispatch(sprStakingSingleApproveAction.sprStakingSingleApproveAct(account, Number(stakingmyTokenId), gasPriceResult));
  }
  // const sprSingleApprove = () => {
  //   dispatch(sprStakingSingleApproveAction.sprStakingSingleApproveAct(account, Number(stakingmyTokenId)));
  // }

  const sprAllApprove = () => {
    dispatch(sprStakingAllApproveAction.sprStakingAllApproveAct(account, gasPriceResult));
  }

  const sprUnStaking = () => {
    dispatch(sprStakingCancelAction.sprStakingCancelAct(account, Number(myStakedTokenId), gasPriceResult));
  }

  const sprClaim = () => {
    dispatch(sprStakingRewardAction.sprStakingRewardAct(account, gasPriceResult));
  }

  const changeSprState = () => {
    dispatch(sprStakingResultViewAction.sprStakingResultViewAct(account));
  }
  const changeSprViewState = () => {
    dispatch(sprStakingViewAction.sprStakingViewAct(account, Number(myStakedTokenId)));
  }

  

  // 지울거 
  const sprMint = async () => {
    const mint = await web3.eth.sendTransaction({
      from: account,
      to: SheepooriTokenAddress,
      gasPrice: "3000000",
      data: SheepooriTokenContract.methods.mint().encodeABI(),
    });
    console.log("테스트 민팅: ", mint );
  }

  const test = async() => {
    const getTotalTokenIdsApi = await SheepooriTokenContract.methods
        .getTotalTokenIds(account)
        .call();    
    console.log("tokenid", getTotalTokenIdsApi)
  }
  

  useEffect(()=> {
    dispatch(sprStakingViewAction.sprStakingViewAct(account, Number(myStakedTokenId)));
  }, [account]);

  useEffect(()=> {
    dispatch(gasPriceResultAction.gasPriceResultAct(account));
  }, [account]);

 
  // ----------------------- Staking Slider Section ----------------------- //
  const handleClickButton = (myTokenId) => {
    console.log(myTokenId, " 체크");
    dispatch({type:"SELECT_STAKING_NFT", payload:myTokenId})
    // dispatch(sprStakingViewAction.sprStakingViewAct(account, Number(myStakedTokenId)));
  }

  const stakingCheckOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName('test3')
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false
      } else {
        setMyTokenId(checkThis.value)
        // console.log(typeof Number(checkThis.value))
      }
    }
  }

  // ----------------------- UnStaking Slider Section ----------------------- //

  const selectUnStakingCheckButton = (myStakedTokenId) => {
      console.log(myStakedTokenId,"체크")
      dispatch({type:"SELECT_UNSTAKING_NFT", payload:myStakedTokenId})
  }

  const checkOnlyOne = (checkThis) => {
      const checkboxes = document.getElementsByName('test2')
      // console.log(checkboxes)
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkThis) {
          checkboxes[i].checked = false
        } else {
          setMyStakedTokenId(checkThis.value)
          // console.log(checkThis.value);
        }
      }
    }

  const responsive = {
      0: { items: 1 },
      568: { items: 2 },
      800: { items: 3 },
      1024: { items: 4 },
  };

  useEffect(()=> {
    dispatch(sprStakingResultViewAction.sprStakingResultViewAct(account));
  }, [account]);

  useEffect(()=> {
    dispatch(sprSingleApproveStateAction.sprSingleApproveStateAct(account, Number(stakingmyTokenId)));
  }, [account,Number(stakingmyTokenId)]);
  

  return (
    <div className="stakingSprPageContainer">
      <div className="stakingPageSprLogoContainer">
        <img className="stakingSprLogo" src={SheepooriLogo} alt="HanLogo" />
        <a>SPR STAKING</a>
        
      </div>
      <div className="stakingSprAllAmountContainer">
        <div className="stakingSprAmountContainer">
          <div className="stakingSprAmountTitle">
            <div className="stakingSprAmountTxt">
              <a>0.000001157407407407 HAN</a>
            </div>
            
            <div className="tooltip-container">
              <i className="info-icon material-icons">
                <HelpIcon />
              </i>
              <div className="tooltip-content">
                <span>
                The right to possess digital content forever and get yourself a Sheepoori card -Ms. 
                Caring one of three sheep siblings characters from Sewoori Union for AdKhan: Advertising Platform

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
            </div>
          </div>
          <div className="stakingSprAmountNum">
            <a>for each NFT per second</a>
          </div>
        </div>
      </div>

      <Tabs className="Tabs">
        <div className="stakedSprCanAmountSection">
          <p>STAKED : {getAmountStaked} </p>
        </div>
        {account === '' ?
        (
          <div className='connectSprWalletSection'>
            <a className="social-button button--social-login button--google" href="#">
              <img
                width="20px"
                height="20px"
                src="https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg"
                className="social-icon fa fa-google"
              >
              </img>
              <p onClick={handleConnectWallet}>Connect Wallet</p>
            </a>
          </div>
          ) :  checkChainId === "0x1" ? (
            <div className='connectSprComWalletSection'>
              <a className="social-button button--social-login button--google" href="#">
                <img
                  width="20px"
                  height="20px"
                  src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                className="social-icon fa fa-google"
                >
                </img>
                {account.substr(0,6)}...{account.slice(-6)}
              </a>
            </div>
          ):(
            <div className='connectSprWalletSection'>
              <a className="social-button button--social-login button--google" href="#" onClick={changeEthereumNetWork}>
                <FcCancel className="social-icon fa fa-google"/>
                {account.substr(0,6)}...{account.slice(-6)}
              </a>
            </div>  
          ) 
        }
        <TabList>
          <Tab>DEPOSIT</Tab>
          <Tab>REWARDS</Tab>
          <Tab>WITHDRAW</Tab>
          {/* <Tab>View</Tab> */}
        </TabList>
        <TabPanel>
            {getAmountStaked ? 
              (
                getMyTokenIds.length === 0 ? (
                  <div className='sprStakingDepositContainer'>
                    <div className='sprStakingCantChoiceImgContainer'>
                      <div className='sprStakingCantChoiceImgSection'>
                        <a className='cantStakingSprBtn' disabled={true}>
                          INSUFFICIENT BALANCE
                        </a>
                      </div>
                    </div>
                    <div className='sprStakingSelectBtnSection'>
                                  <button onClick={sprMint}>
                                    Test Minting            
                                  </button>
                                  <button onClick={test}>
                                    Test Token           
                                  </button>
                    </div>
                  </div> 
              ) : (
                <div className='sprStakingDepositContainer'>
                  <div className='sprStakingBeforeChoiceImgContainer'>
                    <div className='test1'>
                      {
                        getMyTokenIds !== '' ?
                          <AliceCarousel  
                          responsive={responsive}
                          disableDotsControls
                          animationDuration={400}
                          className="mainSlider">
                          {
                            getMyTokenIds.map((item, index) => {
                              return <div className='sprStakingSlider' key={index}>
                                <div className='sprStakingImgContainer'>
                                  <div className='sprStakingImgCard'
                                    style={{
                                      // backgroundImage:
                                      //   `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`
                                      backgroundImage:
                                        `url(https://gateway.pinata.cloud/ipfs/${item.nft.image})`
                                    }}
                                    >
                                    <input className='imgCheckBox' name="test3" type="radio" key={index}  value={item.tokenId} onClick={()=>handleClickButton} onChange={(e) =>stakingCheckOnlyOne(e.target)}>
                                    </input>
                                  </div>
                                  <div className='sprStakingImgTokenId'>
                                    <p>
                                    Sheepoori # {item.tokenId}
                                    </p>
                                  </div>
                                </div>
                                
                              </div>
                              
                              })}
                          </AliceCarousel>
                          :null
                      }
                    </div>
                    {/* <div className='sprStakingSelectBtnSection'>
                                  <button onClick={sprMint}>
                                    Test Minting            
                                  </button>
                                  <button onClick={test}>
                                    Test Token           
                                  </button>
                    </div> */}
                  </div>
                  <div className="depositSprStakeBtnSection">
                  {getSingleApproved !== SheepooriStakingAddress ?
                  (
                      <button className="spr-learn-more" onClick={sprSingleApprove} >
                          APPROVE
                      </button>
    
                  ): (
                      <button className="spr-learn-more" onClick={sprStaking} >
                          STAKE
                      </button>
                  )
                  }
                  </div>
                  
                </div>
              )
                
                ) :(
                <div className='sprStakingDepositContainer'>
                  <div className='sprStakingCantChoiceImgContainer'>
                    <Loading/>   
                  </div>
                </div> 
                ) 
            } 
        </TabPanel>
        <TabPanel className="allTokenSprRewardsContainer">
            <div className="allRewardsSprCumulativeSection">
              <p>Estimated Interest : {sprResultValue} <FiRefreshCcw
                  className="allRefreshSprClaimIcon"
                  onClick={changeSprState} 
                /> HAN </p>
            </div>
              <div className="amountTokenSprRewardAccSection">
                <p>
                  Accumulated Interest : {getUnclaimedRewards} HAN
                </p>
              </div>
              <div className="amountTokenRewardSprTxtSection">
                <p>Rewarded Interest : {getTotalReward} HAN </p>
              </div>
          <div className="rewardsClaimSprBtnSection">
            {sprResultValue + getUnclaimedRewards <= 0 ? (
              <button className="cant-spr-learn-more" disabled={true}>
                NOTHING TO CLAIM
              </button>
            ):(
              <button className="learn-more" onClick={sprClaim} >
                CLAIM
              </button>
            )}
          </div> 
        </TabPanel>
        <TabPanel>
            {getStakedTokenIds.length === 0 ? (
              <div className='sprStakingWithdrawContainer'>
                <div className='sprStakingCantChoiceContainer'>
                  <div className='sprStakingCantChoiceSection'>
                    <a className='cantStakingSprBtn' disabled={true}>
                      INSUFFICIENT BALANCE
                    </a>
                  </div>
                </div>
              </div>
            ) : ( 
               <div className='sprStakingWithdrawContainer'>
                <div className='sprUnStakingChoiceImgContainer'>
                <div className='test1'>
            {
                stakingTokenIdImg !== '' ?
                <AliceCarousel
                responsive={responsive}
                mouseTracking
                disableDotsControls
                className="mainUnSlider"
                    >
                    {
                        stakingTokenIdImg.map((item, index)=> {
                        return <div className='sprUnStakingSlider'  key={index}>
                            <div className='sprUnStakingImgContainer'>

                                <div className='sprUnStakingImgCard'
                                style={{
                                  // backgroundImage:
                                  // `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`
                                  backgroundImage:
                                    `url(https://gateway.pinata.cloud/ipfs/${item.image})`
                                }}
                                >
                                <input  className='imgUnCheckBox' name="test2" type="radio" key={index}  value={item.tokenId} onClick={()=>selectUnStakingCheckButton(item.tokenId)} onChange={(e) =>checkOnlyOne(e.target)}/>
                                </div>
                                <div className='sprStakingImgTokenId'>
                                    <p>
                                    Sheepoori # {item.tokenId}
                                    </p>
                                  </div>
                            </div>
                        </div>    
                        })}
                </AliceCarousel>
                : null
            }
            </div>
                </div>
                <div className="sprUnStakeBtnSection">
                  <button className="spr-learn-more" onClick={sprUnStaking} >
                    UNSTAKE
                  </button>
                </div> 
              </div>
            )}
        </TabPanel>
        <div className="logoContainer">
          <img
            src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
            onClick={changeEthereumNetWork}
            className="opIcon"
          />
          {/* <img
            src={ArrakisBlackIcon}
            onClick={addStakingToken}
            className="arrakisIcon"
          /> */}
          <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
        </div>
      </Tabs>
    </div>
  )
}



export default SprStakingPage
