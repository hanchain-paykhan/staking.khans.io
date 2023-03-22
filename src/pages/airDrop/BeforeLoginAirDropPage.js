import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AirDropPage.scss";
import HanLogo from "../../assets/images/HanLogo.svg";
import { FiRefreshCcw } from "react-icons/fi";
import { OptimismRedLogo, ArrakisBlackIcon } from "../../assets/_index";
import { connectAccount } from "../../redux/actions/connectAccount";
import { WETHLogo, MunieLogoBackX, MusiKhanLogo } from "../../img/_index";
import { FcCancel } from "react-icons/fc";
import { GiClick } from "react-icons/gi";
import { airDropViewAction } from "../../redux/actions/airdropActions/wethActions/airDropViewAction";
import { airDropClaimedAction } from "../../redux/actions/airdropActions/wethActions/airDropClaimedAction";
import { airDropPriceAction } from "../../redux/actions/airdropActions/wethActions/airDropPriceAction";
import { airDropTimeStampAction } from "../../redux/actions/airdropActions/wethActions/airDropTimeStampAction";
import { musiAirDropTimeStampAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropTimeStampAction";
import { musiAirDropBackDataInfoAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropBackDataInfoAction";
import { rakis6AirDropViewAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropViewAction";
import { tokenListViewAction } from "../../redux/actions/airdropActions/rakis6Actions/tokenListViewAction";
import { rakis6AirDropRewardViewAcion } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRewardViewAction";
import { rakis6TotalRewardViewAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6TotalRewardViewAction";
import { rakis6AirDropAprAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropAprAction";
import { hanAirDropTimeStampAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropTimeStampAction";
import { hanAirDropViewAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropViewAction";
import { hanAirDropClaimedAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropClaimedAction";
import { musiAirDropClaimedAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropClaimedAction";
import Swal from "sweetalert2";

const BeforeLoginAirDropPage = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);
    const { getLatestPrice } = useSelector((state) => state.airDropLatestPrice);
    const { musiKhanNewRoot } = useSelector((state) => state.musiAirDropView);
    const { canStakedQuatoAmount, HanQuantityLpQuantityPerYear1HanValue } = useSelector((state) => state.rakis6AirDropView);

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
            rpcUrls: ["https://mainnet.optimism.io"],
            blockExplorerUrls: ["https://optimistic.etherscan.io"],
        },
    };

    const changeNetwork = async ({ networkName }) => {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum?.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName],
                    },
                ],
            });
        } catch (err) {
            console.log(err);
        }
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
        await changeNetwork({ networkName });
    };

    const networkChanged = (chainId) => {
        console.log({ chainId });
    };

    useEffect(() => {
        window.ethereum?.on("chainChanged", networkChanged);

        return () => {
            window.ethereum?.removeListener("chainChanged", networkChanged);
        };
    }, []);

    useEffect(() => {
        setup();
        if (window.ethereum) {
            window.ethereum?.on("accountsChanged", () => {
                setup();
            });
        }
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
        dispatch(airDropPriceAction.airDropPriceAct(account));
        dispatch(airDropViewAction.airDropViewAct(account));
        dispatch(airDropTimeStampAction.airDropTimeStampAct());
        dispatch(hanAirDropViewAction.hanAirDropViewAct(account));
        dispatch(airDropClaimedAction.airDropClaimedAct(account));
        dispatch(hanAirDropClaimedAction.hanAirDropClaimedAct(account));
        dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct());
        dispatch(hanAirDropTimeStampAction.hanAirDropTimeStampAct());
        dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account));
        dispatch(rakis6AirDropViewAction.rakis6AirDropViewAct(account));
        dispatch(tokenListViewAction.tokenListViewAct(account));
        dispatch(rakis6AirDropRewardViewAcion.rakis6AirDropRewardViewAct(account));
        dispatch(rakis6AirDropAprAction.rakis6AirDropAprAct());
        dispatch(rakis6TotalRewardViewAction.rakis6TotalRewardViewAct(account));
        dispatch(musiAirDropClaimedAction.musiAirDropClaimedAct(account, musiKhanNewRoot));
        dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account, musiKhanNewRoot));
    }, [account, musiKhanNewRoot]);

    const loginAlert = () => {
        Swal.fire({
            text: "Please try again after log in",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            footer: '<a href="/airdrop/signin">Go to the login page?</a>',
        });
    };

    return (
        <div className="airDropPageContainer">
            <div className="airDropPageLogoContainer">
                <img className="airDropLogo" src={HanLogo} alt="HanLogo" />
                <a>HAN e-Platform Airdrop</a>
            </div>
            <div className="airDropAmountContainer">
                <div className="airDropAmountContainer">
                    <div className="airDropAmountTitle"></div>
                </div>
            </div>
            <Tabs className="Tabs">
                <div className="airDropSignInUpContinaer">
                    <div className="airDropSignIn-BtnSection">
                        <a href="/airdrop/signin" target="_blank">
                            Log in
                        </a>
                    </div>
                    <div className="airDropSignUp-BtnSection">
                        <a href="/airdrop/signup" target="_blank">
                            Sign up
                        </a>
                    </div>
                </div>

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
                    <Tab>WTIHDRAW</Tab>
                </TabList>
                <TabPanel>
                    <div className="airDropTabContainer">
                        <div className="airDropTabSection">
                            <div className="airDrop-Han-Section">
                                <div className="airDrop-Han-LogoSection">
                                    <img src={HanLogo} />
                                </div>
                                <div className="airDrop-Han-Txt">
                                    <a>HAN</a>
                                </div>

                                <div className="airDrop-Han-Btn">
                                    <button className="cant-han-learn-more" disabled={true}>
                                        Nothing to Claim
                                    </button>
                                </div>

                                <div className="airDrop-Han-TimeStampSection">
                                    <div className="airDrop-Han-TimeStampTitle">
                                        <a>Remaining Duration</a>
                                    </div>
                                    <div className="airDrop-Han-TimeStampInfo">
                                        <a className="han-DayDate">N/A</a>
                                        <a className="han-HoursDate">N/A</a>
                                        <a className="han-MinDate">N/A</a>
                                        <FiRefreshCcw className="airDropMuniReFreshTimeStamp" />
                                    </div>
                                    <p></p>
                                </div>
                            </div>

                            <div className="airDropMusikhanSection">
                                <div className="airDropMusiKhanLogoSection">
                                    <img src={MusiKhanLogo} />
                                </div>

                                <div className="airDropMusiTxt">
                                    <a>MusiKhan</a>
                                </div>

                                <div className="musiAfterPickerSection">
                                    <button className="musiAirDropAfterPicker_SelectBtn" onClick={loginAlert}>
                                        <GiClick size="20" className="modalClickIcon" />
                                    </button>
                                </div>

                                <div className="airDropMusiBtn">
                                    <button className="cant-musi-learn-more" disabled={true}>
                                        Nothing to Claim
                                    </button>
                                </div>
                                <div className="airDropMusiTimeStampSection">
                                    <div className="airDropMusiTimeStampTitle">
                                        <a>Remaining Duration</a>
                                    </div>

                                    <div className="airDropMusiTimeStampInfo">
                                        <a className="musiDayDate">N/A</a>
                                        <a className="musiHoursDate">N/A</a>
                                        <a className="musiMinDate">N/A</a>
                                        <FiRefreshCcw className="airDropCantMusiReFreshTimeStamp" />
                                    </div>
                                </div>
                            </div>

                            <div className="airDropWethSection">
                                <div className="airDropWethLogoSection">
                                    <img src={WETHLogo} />
                                </div>
                                <div className="airDropWethTxt">
                                    <a>WETH</a>
                                </div>
                                <div className="airDropWethBtn">
                                    <button className="cant-weth-learn-more" disabled={true}>
                                        Nothing to Claim
                                    </button>
                                </div>

                                <div className="airDropWethTimeStampSection">
                                    <div className="airDropWethTimeStampTitle">
                                        <a>Remaining Duration</a>
                                    </div>
                                    <div className="airDropWethTimeStampInfo">
                                        <a className="wethDayDate">N/A</a>
                                        <a className="wethHoursDate">N/A</a>
                                        <a className="wethMinDate">N/A</a>

                                        <FiRefreshCcw className="airDropMuniReFreshTimeStamp" />
                                    </div>
                                </div>
                                <div className="airDropWethPriceSection">
                                    <a>1 WETH = {getLatestPrice} USD</a>
                                </div>
                            </div>

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
                                        <a className="muniDayDate">N/A</a>
                                        <a className="muniHoursDate">N/A</a>
                                        <a className="muniMinDate">N/A</a>
                                        <FiRefreshCcw className="airDropMuniReFreshTimeStamp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="logoContainer">
                        <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" className="opIcon" />
                        <img src={OptimismRedLogo} className="opIcon" />
                        <img src={HanLogo} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel>
                    <>
                        <div className="rakis6-AirDrop-Deposit-Quaota-Section">
                            <p>STAKED : 0</p>
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
                    <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                        <p>Available : 0</p>
                    </div>
                    <div className="rakis6-AirDrop-Deposit-AmountSection">
                        <input type="number" placeholder="0" disabled="disabled"></input>
                        <p>RAKIS-6</p>
                        <button className="rakis6-AirDrop-Deposit-AmountMaxBtn">Max</button>
                    </div>
                    <div className="rakis6-AirDrop-DepositStakeBtnSection">
                        <button className="rakis6-AirDrop-Withdraw-SelectBtn" disabled={true}>
                            ENTER AMOUNT
                        </button>
                    </div>

                    <div className="logoContainer">
                        <img src={OptimismRedLogo} className="opIcon" />
                        <img src={ArrakisBlackIcon} className="arrakisIcon" />
                        <img src={HanLogo} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel className="rakis6-AirDrop-Reward-Container">
                    <div className="rakis6-AirDrop-Reward-Quaota-Section">
                        <p>STAKED : 0</p>
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
                        <p>Estimated Interest : 0 HAN</p>
                    </div>
                    <div className="rakis6-AirDrop-Reward-AccSection">
                        <p>Accumulated Interest : 0 HAN</p>
                    </div>
                    <div className="rakis6-AirDrop-Reward-InterSection">
                        <p>Rewarded Interest : 0 HAN </p>
                    </div>

                    <div className="rakis6-AirDrop-Rewards-ClaimBtnSection">
                        <button className="rakis6-AirDrop-Reward-CantBtn" disabled="disabled">
                            NOTHING TO CLAIM
                        </button>
                    </div>

                    <div className="logoContainer">
                        <img src={OptimismRedLogo} className="opIcon" />
                        <img src={ArrakisBlackIcon} className="arrakisIcon" />
                        <img src={HanLogo} className="hanIcon" />
                    </div>
                </TabPanel>
                <TabPanel>
                    <>
                        <div className="rakis6-AirDrop-Withdraw-Quaota-Section">
                            <p>STAKED : 0</p>
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
                        <input type="number" step="0.00000000000001" id="maxUnstakeAmount" placeholder="0" disabled={true}></input>
                        <p>RAKIS-6</p>

                        <button className="rakis6-AirDrop-Select-Token-Btn" onClick={loginAlert}>
                            SELECT
                            <GiClick className="rakis6-AirDrop-Select-Token-Icon" />
                        </button>
                    </div>
                    <div className="rakis6-AirDrop-WithDraw-TimeContainer">
                        <div className="rakis6-AirDrop-WithDraw-TimeTitle">
                            <a>Remaining Duration</a>
                        </div>

                        <div className="rakis6-AirDrop-WithDraw-TimeSection">
                            <a className="rakis6DayDate">N/A</a>
                            <a className="rakis6HoursDate">N/A</a>
                            <a className="rakis6MinDate">N/A</a>
                            <FiRefreshCcw className="rakis6-AirDrop-WithDraw-CantReFreshIcon" />
                        </div>
                    </div>

                    <div className="rakis6-AirDrop-WithDraw-BtnContainer">
                        <div className="rakis6-AirDrop-Withdraw-Can-BtnSection">
                            <button className="rakis6-AirDrop-Withdraw-SelectBtn" disabled={true}>
                                UNSTAKE
                            </button>
                        </div>
                    </div>
                    <div className="logoContainer">
                        <img src={OptimismRedLogo} className="opIcon" />
                        <img src={ArrakisBlackIcon} className="arrakisIcon" />
                        <img src={HanLogo} className="hanIcon" />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default BeforeLoginAirDropPage;
