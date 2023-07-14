import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6WithdrawSection.scss";
import { ArrakisBlackIcon, HanLogo, OptimismRedLogo } from "../../../../assets/_index";
import Rakis6WithdrawModal from "./Modal/Rakis6WithdrawModal";
import { rakis6AirDropRemainingAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRemainingAction";
import { rakis6AirDropUnStakeAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropUnStakeAction";
import Swal from "sweetalert2";
import { rakis6AirDropViewAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropViewAction";
import { rakis6AirDropRewardViewAcion } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRewardViewAction";
import { rakis6AirDropAprAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropAprAction";
import { FiRefreshCcwIcon, GiClickIcon } from "../../../Icons/reactIcons";

const Rakis6WithdrawSection = () => {
    const dispatch = useDispatch();

    const [checkChainId, setCheckChainId] = useState("");
    const [rakis6WithdrawModal, setRakis6WithdrawModal] = useState(false);
    const { account } = useSelector((state) => state.account);
    const { canStakedQuatoAmount, rakis6WithdrawAmount, withdrawIndex, HanQuantityLpQuantityPerYear1HanValue } = useSelector((state) => state.rakis6AirDropView);
    const { rakis6TotalRewardAmount } = useSelector((state) => state.rakis6AirDropReward);
    const { rakis6ClaimDayDate, rakis6ClaimHoursDate, rakis6ClaimMinDate } = useSelector((state) => state.rakis6AirDropTimeStamp);

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

    const openRakis6WithdrawModal = () => {
        setRakis6WithdrawModal(true);
    };

    const closeRakis6WithdrawModal = () => {
        setRakis6WithdrawModal(false);
    };

    const changeRakis6TimeStampState = () => {
        dispatch(rakis6AirDropRemainingAction.rakis6AirDropRemainingAct(account, withdrawIndex));
    };

    const setRakis6UnStake = () => {
        dispatch(rakis6AirDropUnStakeAction.rakis6AirDropUnStakeAct(account, withdrawIndex));
    };

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
    }, [window.ethereum?.chainId]);

    useEffect(() => {
        dispatch(rakis6AirDropViewAction.rakis6AirDropViewAct(account));
        dispatch(rakis6AirDropRewardViewAcion.rakis6AirDropRewardViewAct(account));
        dispatch(rakis6AirDropAprAction.rakis6AirDropAprAct());
    }, []);
    return (
        <div>
            <>
                <div className="rakis6-AirDrop-Withdraw-Quaota-Section">
                    <p>STAKED : {rakis6TotalRewardAmount}</p>
                </div>
                <div className="rakis6-AirDrop-Withdraw-StakeAmount-Section">
                    <p>Available Quota : {canStakedQuatoAmount}</p>
                </div>
            </>
            <div className="stakingMunieAmountContainer">
                <div className="stakingMunieAmountTitle">
                    <div className="stakingMunieAmountTxt">
                        <a>0.000000048445704606 HAN</a>
                    </div>

                    {/* <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <HelpIcon />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                    characters from Sewoori Union for AdKhan: Advertising Platform
                                </span>
                                <span className="align-right">
                                    {" "}
                                    <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div> */}
                </div>
                <div className="stakingMunieAmountNum">
                    <a>for each 1Rakis6 per second</a>
                </div>
            </div>
            {/* <div className="rakis6-AirDrop-Withdraw-APR-Container">
                <div className="rakis6-AirDrop-Withdraw-APR-Title">
                    <a>APR</a>
                </div>
                <div className="rakis6-AirDrop-Withdraw-APR-Info">
                    <a>{HanQuantityLpQuantityPerYear1HanValue}%</a>
                </div>
            </div> */}
            <div className="rakis6-AirDrop-Withdraw-AmountSection">
                <input type="number" step="0.00000000000001" id="maxUnstakeAmount" placeholder="0" readOnly value={rakis6WithdrawAmount}></input>
                <p>RAKIS-6</p>
                {/* <button className="rakis6-AirDrop-Withdraw-AmountMaxBtn">Max</button> */}
                <button className="rakis6-AirDrop-Select-Token-Btn" onClick={openRakis6WithdrawModal}>
                    SELECT
                    <GiClickIcon className="rakis6-AirDrop-Select-Token-Icon" />
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
                        <FiRefreshCcwIcon className="rakis6-AirDrop-WithDraw-ReFreshIcon" onClick={changeRakis6TimeStampState} />
                    </div>
                ) : (
                    <div className="rakis6-AirDrop-WithDraw-TimeSection">
                        <a className="rakis6DayDate">N/A</a>
                        <a className="rakis6HoursDate">N/A</a>
                        <a className="rakis6MinDate">N/A</a>
                        <FiRefreshCcwIcon className="rakis6-AirDrop-WithDraw-CantReFreshIcon" />
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
                <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
                {/* <img src={OptimismRedLogo} onClick={() => handleNetworkSwitch("optimism")} className="opIcon" /> */}
                <img src={ArrakisBlackIcon} onClick={addStakingToken} className="arrakisIcon" alt="ArrakisIcon" />
                <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
            </div>
        </div>
    );
};

export default Rakis6WithdrawSection;
