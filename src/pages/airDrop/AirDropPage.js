import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AirDropPage.scss";
import Web3 from "web3";
import HanLogo from "../../assets/images/HanLogo.svg";
import { FiRefreshCcw } from "react-icons/fi";
import { OptimismRedLogo, ArrakisBlackIcon } from "../../assets/_index";
import { connectAccount } from "../../redux/actions/connectAccount";
import { WETHLogo, MunieLogoBackX, MusiKhanLogo } from "../../img/_index";
import { FcCancel } from "react-icons/fc";
import { GiClick } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AirDropLoading, Loading, MusiTokenListModal, SwitchChainModal } from "../../components";
import { airDropClaimAction } from "../../redux/actions/airdropActions/wethActions/airDropClaimAction";
import { airDropViewAction } from "../../redux/actions/airdropActions/wethActions/airDropViewAction";
import { airDropClaimedAction } from "../../redux/actions/airdropActions/wethActions/airDropClaimedAction";
import { airDropPriceAction } from "../../redux/actions/airdropActions/wethActions/airDropPriceAction";
import { airDropTimeStampAction } from "../../redux/actions/airdropActions/wethActions/airDropTimeStampAction";
import { musiAirDropTimeStampAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropTimeStampAction";
import { musiAirDropViewAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropVeiwAction";
import { musiAirDropBackDataInfoAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropBackDataInfoAction";
import { musiAirDropClaimAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropClaimAction";
import Rakis6WithdrawModal from "../../components/AirDropPage/Rakis6WithdrawModal";
import { rakis6AirDropViewAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropViewAction";
import { rakis6AirDropApproveAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropApproveAction";
import { tokenListViewAction } from "../../redux/actions/airdropActions/rakis6Actions/tokenListViewAction";
import { rakis6AirDropStakeAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropStakeAction";
import { rakis6AirDropRemainingAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRemainingAction";
import { rakis6AirDropUnStakeAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropUnStakeAction";
import { rakis6AirDropRewardViewAcion } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRewardViewAction";
import { rakis6AirDropClaimAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropClaimAction";
import { rakis6TotalRewardViewAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6TotalRewardViewAction";
import { rakis6AirDropAprAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropAprAction";
import { hanAirDropTimeStampAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropTimeStampAction";
import { hanAirDropViewAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropViewAction";
import { hanAirDropClaimAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropClaimAction";
import { hanAirDropClaimedAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropClaimedAction";
import { musiAirDropClaimedAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropClaimedAction";
import Swal from "sweetalert2";
import { signUpAction } from "../../redux/actions/airdropActions/signUpActions/signUpAction";

const AirDropPage = () => {
    const dispatch = useDispatch();
    // const [account, setAccount] = useState("");
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState();
    const [musiTokenListModal, setMusiTokenListModal] = useState(false);
    const [switchNetModal, setSwitchNetModal] = useState(false);
    const [rakis6WithdrawModal, setRakis6WithdrawModal] = useState(false);
    const [rakis6StakingAmount, setRakis6StakingAmount] = useState("");
    const [checkChainId, setCheckChainId] = useState("");
    const [stakingPassword, setStakingPassword] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [loginState, setLoginState] = useState(false);

    const { account } = useSelector((state) => state.account);
    const { login, email } = useSelector((state) => state.signUpEmail);

    const { successAirDropClaim, canClaim, getProofToBack, getAmountToBack, claimed, claimDayDate, claimHoursDate, claimMinDate, successMusiAirDropClaim } =
        useSelector((state) => state.airDropView);

    const { gasPriceResult } = useSelector((state) => state.gasPrice);

    const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);

    const {
        musiRoot,
        musiName,
        musiSymbol,
        musiL2Ca,
        musiClaimDayDate,
        musiClaimHoursDate,
        musiClaimMinDate,
        musiKhanNewRoot,
        getmusiProofToBack,
        getmusiTokenCaToBack,
        getmusiAmountToBack,
        musiCanClaim,
        musiClaimed,
        timeStampErrorState,
    } = useSelector((state) => state.musiAirDropView);
    // Rakis6
    const {
        rakis6StakingBalanceOf,
        canStakedQuatoAmount,
        allowance,
        successRakis6Apporve,
        rakis6WithdrawAmount,
        withdrawIndex,
        HanQuantityLpQuantityPerYear1HanValue,
    } = useSelector((state) => state.rakis6AirDropView);
    const { rakis6ClaimDayDate, rakis6ClaimHoursDate, rakis6ClaimMinDate } = useSelector((state) => state.rakis6AirDropTimeStamp);
    const { rakis6UnClaimedReward, rakis6UnClaimedRewardToEth, rakis6TotalRewardReceived, rakis6TotalRewardReceivedToEth, rakis6TotalRewardAmount } =
        useSelector((state) => state.rakis6AirDropReward);
    const { totalRewardView } = useSelector((state) => state.rakis6AirDropTotalRewardView);
    // hanAirDrop
    const { hanAirDropCanClaim, getHanProofToBack, getHanAmountToBack, hanClaimDayDate, hanClaimHoursDate, hanClaimMinDate, hanClaimed } = useSelector(
        (state) => state.hanAirDropView
    );
    //---------------- Optimism Network Switching ---------------- //
    const changeOpNetwork = async () => {
        try {
            await window.ethereum?.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xa" }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    Swal.fire({
                        title: "Switch Network",
                        html: "Project requires that you switch your wallet to the Optimism network to continue.",
                        showConfirmButton: false,
                    });
                } catch (addError) {
                    console.log(addError);
                }
            }
        }
    };
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
            rpcUrls: ["https://opt-goerli.g.alchemy.com/v2/2lGr3nFlynOLUsom7cnrmg-hUtq7IcrM"],
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
            rpcUrls: ["https://optimism-mainnet.infura.io"],
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
    const setup = () => {
        dispatch(connectAccount.getAccount());
    };
    const handleConnectWallet = async () => {
        if (window.ethereum === undefined) {
            window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
        } else {
            setup();
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
        const tokenAddress = "0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f";
        const tokenSymbol = "LP";
        const tokenDecimals = 18;
        const tokenImage = "https://github.com/sieun95/develop_note/blob/main/Arrakis%20Icon%20(monochrome).png?raw=true";

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
        const tokenAddress = "0x50Bce64397C75488465253c0A034b8097FeA6578";
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
        window.ethereum?.on("chainChanged", networkChanged);

        return () => {
            window.ethereum?.removeListener("chainChanged", networkChanged);
        };
    }, []);

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
                setup();
            });
        }
    }, []);

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

    const changeHanTimeStampState = () => {
        dispatch(hanAirDropTimeStampAction.hanAirDropTimeStampAct());
    };

    useEffect(() => {
        dispatch(airDropPriceAction.airDropPriceAct(account));
        dispatch(airDropViewAction.airDropViewAct(account));
        dispatch(airDropTimeStampAction.airDropTimeStampAct());
        dispatch(hanAirDropViewAction.hanAirDropViewAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(airDropClaimedAction.airDropClaimedAct(account));
        dispatch(hanAirDropClaimedAction.hanAirDropClaimedAct(account));
    }, [account]);

    // HanClaim
    const hanAirDropClaim = () => {
        dispatch(hanAirDropClaimAction.hanAirDropClaimAct(getHanProofToBack, getHanAmountToBack, account));
    };
    // WethClaim
    const airDropClaim = () => {
        dispatch(airDropClaimAction.airDropClaimAct(account, getProofToBack, getAmountToBack, gasPriceResult));
    };

    // MusiClaim
    const musiAirDropClaim = () => {
        dispatch(musiAirDropClaimAction.musiAirDropClaimAct(account, getmusiProofToBack, getmusiAmountToBack, getmusiTokenCaToBack));
    };

    // MusiKhan Modal
    const openMusiTokenListModal = () => {
        setMusiTokenListModal(true);
    };
    const closeMusiTokenListModal = () => {
        setMusiTokenListModal(false);
    };

    const changeMusiTimeStampState = () => {
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct(musiL2Ca));
    };

    // Rakis6 WithdrawModal
    const openRakis6WithdrawModal = () => {
        setRakis6WithdrawModal(true);
    };

    const closeRakis6WithdrawModal = () => {
        setRakis6WithdrawModal(false);
    };

    const checkStakingPasswordNumber = (e) => {
        const pattern = /^(\d{0,4}?)?$/;
        if (pattern.test(e.target.value)) {
            setStakingPassword(e.target.value);
        }
    };

    const changeRakis6DepositAmount = (e) => {
        const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
        if (pattern.test(e.target.value)) {
            setRakis6StakingAmount(e.target.value);
        }
    };

    const changeMaxDepositAmount = () => {
        setRakis6StakingAmount(rakis6StakingBalanceOf);
    };

    const setRakis6Approve = () => {
        let rakis6StakingAmount = document.getElementById("maxRakis6StakeAmount").value;
        const rakis6Stakingnum = Web3.utils.toWei(String(rakis6StakingAmount), "ether");
        dispatch(rakis6AirDropApproveAction.rakis6AirDropApproveAct(account, rakis6Stakingnum));
    };

    // console.log(stakingPassword);

    const setRakis6Staking = () => {
        let rakis6StakingAmount = document.getElementById("maxRakis6StakeAmount").value;
        const rakis6Stakingnum = Web3.utils.toWei(String(rakis6StakingAmount), "ether");
        dispatch(rakis6AirDropStakeAction.rakis6AirDropStakeAct(account, rakis6Stakingnum, stakingPassword));
    };

    const setRakis6UnStake = () => {
        dispatch(rakis6AirDropUnStakeAction.rakis6AirDropUnStakeAct(account, withdrawIndex));
    };

    const setRakis6Claim = () => {
        dispatch(rakis6AirDropClaimAction.rakis6AirDropClaimAct(account));
    };

    const changeRakis6RewardState = () => {
        dispatch(rakis6TotalRewardViewAction.rakis6TotalRewardViewAct(account));
    };

    const changeRakis6TimeStampState = () => {
        dispatch(rakis6AirDropRemainingAction.rakis6AirDropRemainingAct(account, withdrawIndex));
    };

    useEffect(() => {
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct());
        dispatch(hanAirDropTimeStampAction.hanAirDropTimeStampAct());
    }, []);

    useEffect(() => {
        dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(rakis6AirDropViewAction.rakis6AirDropViewAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(tokenListViewAction.tokenListViewAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(rakis6AirDropRewardViewAcion.rakis6AirDropRewardViewAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(rakis6AirDropAprAction.rakis6AirDropAprAct());
    }, []);

    useEffect(() => {
        dispatch(rakis6TotalRewardViewAction.rakis6TotalRewardViewAct(account));
    }, [account]);

    useEffect(() => {
        dispatch(musiAirDropClaimedAction.musiAirDropClaimedAct(account, musiKhanNewRoot));
        dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account, musiKhanNewRoot));
    }, [account, musiKhanNewRoot]);

    useEffect(() => {
        getEmail();
        dispatch(signUpAction.loginAct(account));
        dispatch(signUpAction.getEmailAct(account));
        verification();
    }, [login, email, userEmail, account, loginState]);

    const getEmail = () => {
        setUserEmail(sessionStorage.getItem(account));
    };
    const verification = () => {
        if (email === userEmail) {
            setLoginState(true);
        } else setLoginState(false);
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
                {loginState === true ? (
                    <div className="airDropSignEmailContinaer">
                        <div className="airDropSignIn-Email-Section">
                            <a>{userEmail}</a>
                        </div>
                    </div>
                ) : (
                    <div className="airDropSignInUpContinaer">
                        <div className="airDropSignIn-BtnSection">
                            <a href="/airdrop/signin" target="_parent">
                                Log in
                            </a>
                        </div>
                        <div className="airDropSignUp-BtnSection">
                            <a href="/airdrop/signup">Sign up</a>
                        </div>
                    </div>
                )}

                {/* <div className="stakedSprCanAmountSection">
          <p>STAKED : {getAmountStaked} </p>
        </div> */}
                {account === "" ? (
                    <div className="connectAirDropMetaWalletSection">
                        <a className="social-button button--social-login button--google" href="#">
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
                        <a className="social-button button--social-login button--google" href="#">
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
                        <a className="social-button button--social-login button--google" href="#">
                            <img width="20px" height="20px" src={OptimismRedLogo} className="social-icon fa fa-google"></img>
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                ) : (
                    <div className="cantConnectAirDropWalletSection">
                        <a className="social-button button--social-login button--google" href="#" onClick={() => handleNetworkSwitch("optimism")}>
                            <FcCancel className="social-icon fa fa-google" />
                            {account.substr(0, 6)}...{account.slice(-6)}
                        </a>
                    </div>
                )}
                <TabList>
                    <Tab>AIRDROP</Tab>
                    <Tab>DEPOSIT</Tab>
                    <Tab>REWARDS</Tab>
                    <Tab>WITHDRAW</Tab>
                </TabList>
                <TabPanel>
                    <div className="airDropTabContainer">
                        {/* {getLatestPrice ? ( */}
                        <div className="airDropTabSection">
                            <div className="airDrop-Han-Section">
                                <div className="airDrop-Han-LogoSection">
                                    <img src={HanLogo} />
                                </div>
                                <div className="airDrop-Han-Txt">
                                    <a>HAN</a>
                                </div>
                                {/* {checkChainId === "Oxa" ? (
                                    hanAirDropCanClaim === true? ( */}
                                {hanAirDropCanClaim === true ? (
                                    <div className="airDrop-Han-Btn">
                                        <button className="han-learn-more" onClick={hanAirDropClaim}>
                                            Claim
                                        </button>
                                    </div>
                                ) : hanClaimed === true ? (
                                    <div className="airDrop-Han-Btn">
                                        <button className="cant-han-learn-more" disabled={true}>
                                            Already Claim
                                        </button>
                                    </div>
                                ) : (
                                    <div className="airDrop-Han-Btn">
                                        <button className="cant-han-learn-more" disabled={true}>
                                            Nothing to Claim
                                        </button>
                                    </div>
                                )}
                                {/* ):(
                                    <div className="airDrop-Han-Btn">
                                            <button className="switch-weth-learn-more" disabled={true}>
                                                Switch to Optimism
                                            </button>
                                        </div>
                                )} */}

                                <div className="airDrop-Han-TimeStampSection">
                                    <div className="airDrop-Han-TimeStampTitle">
                                        <a>Remaining Duration</a>
                                    </div>
                                    <div className="airDrop-Han-TimeStampInfo">
                                        <a className="han-DayDate">{hanClaimDayDate}D</a>
                                        <a className="han-HoursDate">{hanClaimHoursDate}H</a>
                                        <a className="han-MinDate">{hanClaimMinDate}M</a>
                                        {/* <a> */}
                                        <FiRefreshCcw className="airDrop-Han-ReFreshTimeStamp" onClick={changeHanTimeStampState} />
                                        {/* </a> */}
                                    </div>
                                    <p></p>
                                </div>
                            </div>
                            {/* ):(
                                <div className="airDropHanLoadingSection">
                                    <AirDropLoading />
                                </div>
                            )} */}

                            {getLatestPrice ? (
                                <div className="airDropMusikhanSection">
                                    <div className="airDropMusiKhanLogoSection">
                                        <img src={MusiKhanLogo} />
                                    </div>
                                    {musiSymbol ? (
                                        <div className="airDropMusiTxt">
                                            <p>{musiSymbol}</p>
                                        </div>
                                    ) : (
                                        <div className="airDropMusiTxt">
                                            <a>MusiKhan</a>
                                        </div>
                                    )}

                                    {musiSymbol === "" ? (
                                        <div className="musiBeforePickerSection">
                                            <button className="musiAirDropBeforePicker_SelectBtn" onClick={openMusiTokenListModal}>
                                                {/* <img src={MusiKhanLogo}></img> */}
                                                <span></span>
                                                <GiClick size="20" className="modalClickIcon" />
                                            </button>
                                            <MusiTokenListModal
                                                open={musiTokenListModal}
                                                close={closeMusiTokenListModal}
                                                header="Modal heading"
                                            ></MusiTokenListModal>
                                        </div>
                                    ) : (
                                        <div className="musiAfterPickerSection">
                                            <button className="musiAirDropAfterPicker_SelectBtn" onClick={openMusiTokenListModal}>
                                                {/* <img src={MusiKhanLogo}></img> */}
                                                <span></span>
                                                <GiClick size="20" className="modalClickIcon" />
                                            </button>
                                            <MusiTokenListModal
                                                open={musiTokenListModal}
                                                close={closeMusiTokenListModal}
                                                header="Modal heading"
                                            ></MusiTokenListModal>
                                        </div>
                                    )}
                                    {checkChainId === "Oxa" ? (
                                        musiCanClaim === true ? (
                                            <div className="airDropMusiBtn">
                                                <button className="musi-learn-more" onClick={musiAirDropClaim}>
                                                    Claim
                                                </button>
                                            </div>
                                        ) : musiClaimed === true ? (
                                            <div className="airDropMusiBtn">
                                                <button className="cant-musi-learn-more" disabled={true}>
                                                    Already Claimed
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="airDropMusiBtn">
                                                <button className="cant-musi-learn-more" disabled={true}>
                                                    Nothing to Claim
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <div className="airDropMusiBtn">
                                            <button className="switch-musi-learn-more" disabled={true}>
                                                Switch to Optimism
                                            </button>
                                        </div>
                                    )}

                                    <div className="airDropMusiTimeStampSection">
                                        <div className="airDropMusiTimeStampTitle">
                                            <a>Remaining Duration</a>
                                        </div>
                                        {musiClaimMinDate > 0 ? (
                                            <div className="airDropMusiTimeStampInfo">
                                                <a className="musiDayDate">{musiClaimDayDate}D</a>
                                                <a className="musiHoursDate">{musiClaimHoursDate}H</a>
                                                <a className="musiMinDate">{musiClaimMinDate}M</a>
                                                <FiRefreshCcw className="airDropMusiReFreshTimeStamp" onClick={changeMusiTimeStampState} />
                                            </div>
                                        ) : (
                                            <div className="airDropMusiTimeStampInfo">
                                                <a className="musiDayDate">N/A</a>
                                                <a className="musiHoursDate">N/A</a>
                                                <a className="musiMinDate">N/A</a>
                                                <FiRefreshCcw
                                                    className="airDropCantMusiReFreshTimeStamp"
                                                    // onClick={changeMusiTimeStampState}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="airDropWethLoadingSection">
                                    <AirDropLoading />
                                </div>
                            )}
                            {getLatestPrice ? (
                                <div className="airDropWethSection">
                                    <div className="airDropWethLogoSection">
                                        <img src={WETHLogo} />
                                    </div>
                                    <div className="airDropWethTxt">
                                        <a>WETH</a>
                                    </div>
                                    {checkChainId === "Oxa" ? (
                                        canClaim === true ? (
                                            <div className="airDropWethBtn">
                                                <button className="weth-learn-more" onClick={airDropClaim}>
                                                    Claim
                                                </button>
                                            </div>
                                        ) : claimed === true ? (
                                            <div className="airDropWethBtn">
                                                <button className="cant-weth-learn-more" disabled={true}>
                                                    Already Claimed
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="airDropWethBtn">
                                                <button className="cant-weth-learn-more" disabled={true}>
                                                    Nothing to Claim
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <div className="airDropWethBtn">
                                            <button className="switch-weth-learn-more" disabled={true}>
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
                                            <FiRefreshCcw className="airDropWethReFreshTimeStamp" onClick={changeTimeStampState} />
                                            {/* </a> */}
                                        </div>
                                        <p></p>
                                    </div>
                                    <div className="airDropWethPriceSection">
                                        <a>1 WETH = {getLatestPrice} USD</a>
                                    </div>
                                </div>
                            ) : (
                                <div className="airDropWethLoadingSection">
                                    <AirDropLoading />
                                </div>
                            )}

                            <div className="airDropMuniSection">
                                <div className="airDropMunieLogoSection">
                                    <img src={MunieLogoBackX} />
                                </div>
                                <div className="airDropMuniTxt">
                                    <a>NFT Munie</a>
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
                    </div>
                    <div className="logoContainer">
                        <img
                            src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                            onClick={changeEthereumNetWork}
                            className="opIcon"
                        />
                        <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" />
                        {/* <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" /> */}
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel>
                    <>
                        <div className="rakis6-AirDrop-Deposit-Quaota-Section">
                            <p>STAKED : {rakis6TotalRewardAmount}</p>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-StakeAmount-Section">
                            <p>Available Quota : {canStakedQuatoAmount}</p>
                        </div>
                    </>
                    <div className="rakis6-AirDrop-Deposit-APR-Container">
                        <div className="rakis6-AirDrop-Deposit-APR-Title">
                            <a>APR</a>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-APR-Info">
                            <a>{HanQuantityLpQuantityPerYear1HanValue}%</a>
                        </div>
                    </div>
                    {canStakedQuatoAmount ? (
                        allowance > 0 ? (
                            <>
                                <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                                    <p>Available : {rakis6StakingBalanceOf}</p>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-StakedAmountSection">
                                    <input
                                        type="number"
                                        onChange={changeRakis6DepositAmount}
                                        step="0.000000000000000001"
                                        id="maxRakis6StakeAmount"
                                        placeholder="0"
                                        value={allowance}
                                    ></input>
                                    <p>RAKIS-6</p>
                                    <button className="rakis6-AirDrop-Deposit-AmountMaxBtn">Max</button>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-Pswd-Container">
                                    <div className="rakis6-AirDrop-Deposit-Pswd-Section">
                                        <div className="rakis6-AirDrop-Deposit-Pswd-Lock">
                                            <HiOutlineLockClosed />
                                        </div>
                                        <input
                                            name="stakingPassword"
                                            placeholder="Enter Password"
                                            type={isRevealPwd ? "text" : "password"}
                                            value={stakingPassword}
                                            maxLength="4"
                                            onChange={(e) => setStakingPassword(e.target.value)}
                                        />
                                        <span className="rakis6-AirDrop-Deposit-Pswd-Hide">
                                            <FaEye
                                                className="rakis6-AirDrop-Deposit-Pswd-HideIcon"
                                                title={isRevealPwd ? "Hide password" : "Show password"}
                                                // src={isRevealPwd ? FaEye : FaEye}
                                                onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="rakis6-AirDrop-DepositStakeBtnSection">
                                    <button className="rakis6-AirDrop-Deposit-CanBtn" onClick={setRakis6Staking}>
                                        STAKE
                                    </button>
                                </div>
                            </>
                        ) : rakis6StakingAmount === "" ? (
                            <>
                                <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                                    <p>Available : {rakis6StakingBalanceOf}</p>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-AmountSection">
                                    <input
                                        type="number"
                                        step="0.00000000000001"
                                        id="maxRakis6StakeAmount"
                                        placeholder="0"
                                        onChange={changeRakis6DepositAmount}
                                        value={rakis6StakingAmount}
                                    ></input>
                                    <p>RAKIS-6</p>
                                    <button className="rakis6-AirDrop-Deposit-AmountMaxBtn" onClick={changeMaxDepositAmount}>
                                        Max
                                    </button>
                                </div>
                                <div className="rakis6-AirDrop-DepositStakeBtnSection">
                                    <button className="rakis6-AirDrop-Deposit-EnterBtn" onClick={setRakis6Approve}>
                                        ENTER AMOUNT
                                    </button>
                                </div>
                            </>
                        ) : rakis6StakingBalanceOf === "0" || rakis6StakingAmount > rakis6StakingBalanceOf ? (
                            <>
                                <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                                    <p>Available : {rakis6StakingBalanceOf}</p>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-AmountSection">
                                    <input
                                        type="number"
                                        step="0.000000000000000001"
                                        id="maxRakis6StakeAmount"
                                        placeholder="0"
                                        onChange={changeRakis6DepositAmount}
                                        value={rakis6StakingAmount}
                                    ></input>
                                    <p>RAKIS-6</p>
                                    <button className="rakis6-AirDrop-Deposit-AmountMaxBtn" onClick={changeMaxDepositAmount}>
                                        Max
                                    </button>
                                </div>

                                <div className="rakis6-AirDrop-DepositStakeBtnSection">
                                    <button className="rakis6-AirDrop-Deposit-CantBtn" disabled={true}>
                                        INSUFFICIENT RAKIS-6 BALANCE
                                    </button>
                                </div>
                            </>
                        ) : successRakis6Apporve === false ? (
                            <>
                                <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                                    <p>Available : {rakis6StakingBalanceOf}</p>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-Approve-AmountSection">
                                    <input
                                        type="number"
                                        step="0.000000000000000001"
                                        id="maxRakis6StakeAmount"
                                        placeholder="0"
                                        onChange={changeRakis6DepositAmount}
                                        value={rakis6StakingAmount}
                                    ></input>
                                    <p>RAKIS-6</p>
                                    <button className="rakis6-AirDrop-Deposit-AmountMaxBtn" onClick={changeMaxDepositAmount}>
                                        Max
                                    </button>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-LockedTxt">
                                    <a>Locked 365-Day</a>
                                </div>
                                <div className="rakis6-AirDrop-DepositStakeBtnSection">
                                    <button className="rakis6-AirDrop-Deposit-CanBtn" onClick={setRakis6Approve}>
                                        APPROVE
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                                    <p>Available : {rakis6StakingBalanceOf}</p>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-StakedAmountSection">
                                    <input
                                        type="number"
                                        step="0.000000000000000001"
                                        id="maxRakis6StakeAmount"
                                        placeholder="0"
                                        value={rakis6StakingAmount}
                                    ></input>
                                    <p>RAKIS-6</p>
                                    <button className="rakis6-AirDrop-Deposit-AmountMaxBtn">Max</button>
                                </div>
                                <div className="rakis6-AirDrop-Deposit-Pswd-Container">
                                    <div className="rakis6-AirDrop-Deposit-Pswd-Section">
                                        <div className="rakis6-AirDrop-Deposit-Pswd-Lock">
                                            <HiOutlineLockClosed />
                                        </div>
                                        <input
                                            name="stakingPassword"
                                            placeholder="Enter Password"
                                            type={isRevealPwd ? "text" : "password"}
                                            value={stakingPassword}
                                            maxLength="3"
                                            onChange={(e) => setStakingPassword(e.target.value)}
                                        />
                                        <span className="rakis6-AirDrop-Deposit-Pswd-Hide">
                                            <FaEye
                                                className="rakis6-AirDrop-Deposit-Pswd-HideIcon"
                                                title={isRevealPwd ? "Hide password" : "Show password"}
                                                // src={isRevealPwd ? FaEye : FaEye}
                                                onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="rakis6-AirDrop-DepositStakeBtnSection">
                                    <button className="rakis6-AirDrop-Deposit-CanBtn" onClick={setRakis6Staking}>
                                        STAKE
                                    </button>
                                </div>
                            </>
                        )
                    ) : (
                        <div className="rakis6-AirDrop-Deposit-LoadingContainer">
                            <Loading />
                        </div>
                    )}
                    <div className="logoContainer">
                        <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" />
                        {/* <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" /> */}
                        <img src={ArrakisBlackIcon} onClick={addStakingToken} className="arrakisIcon" />
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel className="rakis6-AirDrop-Reward-Container">
                    <>
                        <div className="rakis6-AirDrop-Reward-Quaota-Section">
                            <p>STAKED : {rakis6TotalRewardAmount}</p>
                        </div>
                        <div className="rakis6-AirDrop-Reward-StakeAmount-Section">
                            <p>Available Quota : {canStakedQuatoAmount}</p>
                        </div>
                        <div className="rakis6-AirDrop-Reward-APR-Container">
                            <div className="rakis6-AirDrop-Reward-APR-Title">
                                <a>APR</a>
                            </div>
                            <div className="rakis6-AirDrop-Reward-APR-Info">
                                <a>{HanQuantityLpQuantityPerYear1HanValue}%</a>
                            </div>
                        </div>
                        <div className="rakis6-AirDrop-Reward-EstSection">
                            <p>
                                Estimated Interest : {totalRewardView}
                                <FiRefreshCcw className="rakis6-AirDrop-Reward-RefreshIcon" onClick={changeRakis6RewardState} />
                                HAN
                            </p>
                        </div>
                        <div className="rakis6-AirDrop-Reward-AccSection">
                            <p>Accumulated Interest : {rakis6UnClaimedRewardToEth} HAN</p>
                        </div>
                        <div className="rakis6-AirDrop-Reward-InterSection">
                            <p>Rewarded Interest : {rakis6TotalRewardReceivedToEth} HAN </p>
                            {/* <p>Rewarded Interest : {rakis6TotalRewardReceived}HAN </p> */}
                        </div>
                        {totalRewardView + rakis6UnClaimedRewardToEth <= 0 ? (
                            <div className="rakis6-AirDrop-Rewards-ClaimBtnSection">
                                <button className="rakis6-AirDrop-Reward-CantBtn" disabled={true}>
                                    NOTHING TO CLAIM
                                </button>
                            </div>
                        ) : (
                            <div className="rakis6-AirDrop-Rewards-ClaimBtnSection">
                                <button className="rakis6-AirDrop-Reward-CanBtn" onClick={setRakis6Claim}>
                                    CLAIM
                                </button>
                            </div>
                        )}
                    </>
                    <div className="logoContainer">
                        <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" />
                        {/* <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" /> */}
                        <img src={ArrakisBlackIcon} onClick={addStakingToken} className="arrakisIcon" />
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel>
                    <>
                        <div className="rakis6-AirDrop-Withdraw-Quaota-Section">
                            <p>STAKED : {rakis6TotalRewardAmount}</p>
                        </div>
                        <div className="rakis6-AirDrop-Withdraw-StakeAmount-Section">
                            <p>Available Quota : {canStakedQuatoAmount}</p>
                        </div>
                    </>
                    <div className="rakis6-AirDrop-Withdraw-APR-Container">
                        <div className="rakis6-AirDrop-Withdraw-APR-Title">
                            <a>APR</a>
                        </div>
                        <div className="rakis6-AirDrop-Withdraw-APR-Info">
                            <a>{HanQuantityLpQuantityPerYear1HanValue}%</a>
                        </div>
                    </div>
                    <div className="rakis6-AirDrop-Withdraw-AmountSection">
                        <input
                            type="number"
                            step="0.00000000000001"
                            id="maxUnstakeAmount"
                            placeholder="0"
                            // onChange={changeWithdrawAmount}
                            value={rakis6WithdrawAmount}
                        ></input>
                        <p>RAKIS-6</p>
                        {/* <button className="rakis6-AirDrop-Withdraw-AmountMaxBtn">Max</button> */}
                        <button className="rakis6-AirDrop-Select-Token-Btn" onClick={openRakis6WithdrawModal}>
                            SELECT
                            <GiClick className="rakis6-AirDrop-Select-Token-Icon" />
                        </button>
                        <Rakis6WithdrawModal open={rakis6WithdrawModal} close={closeRakis6WithdrawModal} header="Rakis6 Modal" />
                    </div>
                    <div className="rakis6-AirDrop-WithDraw-TimeContainer">
                        <div className="rakis6-AirDrop-WithDraw-TimeTitle">
                            <a>Remaining Duration</a>
                        </div>
                        {rakis6ClaimDayDate ? (
                            <div className="rakis6-AirDrop-WithDraw-TimeSection">
                                <a className="rakis6DayDate">{rakis6ClaimDayDate}D</a>
                                <a className="rakis6HoursDate">{rakis6ClaimHoursDate}H</a>
                                <a className="rakis6MinDate">{rakis6ClaimMinDate}M</a>
                                <FiRefreshCcw className="rakis6-AirDrop-WithDraw-ReFreshIcon" onClick={changeRakis6TimeStampState} />
                            </div>
                        ) : (
                            <div className="rakis6-AirDrop-WithDraw-TimeSection">
                                <a className="rakis6DayDate">N/A</a>
                                <a className="rakis6HoursDate">N/A</a>
                                <a className="rakis6MinDate">N/A</a>
                                <FiRefreshCcw className="rakis6-AirDrop-WithDraw-CantReFreshIcon" />
                            </div>
                        )}
                    </div>

                    <div className="rakis6-AirDrop-WithDraw-BtnContainer">
                        {/* <div className="rakis6-AirDrop-Withdraw-Can-BtnSection">
                            <button className="rakis6-AirDrop-Withdraw-CanBtn" onClickCapture={setRakis6UnStake}>
                                UNSTAKE
                            </button>
                        </div> */}
                        {rakis6WithdrawAmount === "" ? (
                            <div className="rakis6-AirDrop-Withdraw-Can-BtnSection">
                                <button className="rakis6-AirDrop-Withdraw-SelectBtn" disabled={true}>
                                    UNSTAKE
                                </button>
                            </div>
                        ) : (
                            <div className="rakis6-AirDrop-Withdraw-Can-BtnSection">
                                <button className="rakis6-AirDrop-Withdraw-CanBtn" onClick={setRakis6UnStake}>
                                    UNSTAKE
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="logoContainer">
                        <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" />
                        {/* <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" /> */}
                        <img src={ArrakisBlackIcon} onClick={addStakingToken} className="arrakisIcon" />
                        <img src={HanLogo} onClick={addRewardToken} className="hanIcon" />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AirDropPage;
