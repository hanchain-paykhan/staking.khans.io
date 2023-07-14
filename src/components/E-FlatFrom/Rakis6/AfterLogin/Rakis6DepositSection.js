import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Rakis6DepositSection.scss";
import Swal from "sweetalert2";
import { rakis6AirDropApproveAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropApproveAction";
import { rakis6AirDropStakeAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropStakeAction";
import { ArrakisBlackIcon, HanLogo, OptimismRedLogo } from "../../../../assets/_index";
import Loading from "../../../SprStakingPage/Loading";
import { rakis6AirDropViewAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropViewAction";
import { rakis6AirDropRewardViewAcion } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRewardViewAction";
import { rakis6AirDropAprAction } from "../../../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropAprAction";
import { web3 } from "../../../../config/StakingRakis6Config";
import { FaEyeIcon, HiOutlineLockClosedIcon } from "../../../Icons/reactIcons";

const Rakis6DepositSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [stakingPassword, setStakingPassword] = useState("");

    const [rakis6StakingAmount, setRakis6StakingAmount] = useState(0);
    const { account } = useSelector((state) => state.account);

    const { rakis6StakingBalanceOf, canStakedQuatoAmount, allowance, successRakis6Apporve, HanQuantityLpQuantityPerYear1HanValue } = useSelector((state) => state.rakis6AirDropView);

    const { rakis6TotalRewardAmount } = useSelector((state) => state.rakis6AirDropReward);
    const isZeroAmount = rakis6StakingAmount === "0" || rakis6StakingAmount === "00" || rakis6StakingAmount === "000" || rakis6StakingAmount === "0000";

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
        let rakisAp6StakingAmount = document.getElementById("maxRakis6ApStakeAmount").value;
        const rakis6ApStakingnum = web3.utils.toWei(String(rakisAp6StakingAmount), "ether");
        dispatch(rakis6AirDropApproveAction.rakis6AirDropApproveAct(account, rakis6ApStakingnum));
    };

    const setRakis6Staking = () => {
        let rakis6StStakingAmount = document.getElementById("maxRakis6StStakeAmount").value;
        const rakis6StStakingnum = web3.utils.toWei(String(rakis6StStakingAmount), "ether");
        dispatch(rakis6AirDropStakeAction.rakis6AirDropStakeAct(account, rakis6StStakingnum, stakingPassword));
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
        // dispatch(rakis6AirDropAprAction.rakis6AirDropAprAct());
    }, [account]);

    return (
        <div>
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
                    <a>0.000000048445704606 HAN</a>
                </div>
                <div className="rakis6-AirDrop-Deposit-APR-Info">
                    <a>for each 1Rakis6 per second</a>
                </div>
            </div>
            {canStakedQuatoAmount ? (
                rakis6StakingAmount === 0 || rakis6StakingAmount === "" ? (
                    <>
                        <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                            <p>Available : {rakis6StakingBalanceOf}</p>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-AmountSection">
                            <input type="number" step="0.00000000000001" id="maxRakis6StStakeAmount" placeholder="0" onChange={changeRakis6DepositAmount} value={rakis6StakingAmount}></input>
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
                ) : isZeroAmount || rakis6StakingBalanceOf === 0 || rakis6StakingAmount > rakis6StakingBalanceOf ? (
                    <>
                        <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                            <p>Available : {rakis6StakingBalanceOf}</p>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-AmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6StStakeAmount" placeholder="0" onChange={changeRakis6DepositAmount} value={rakis6StakingAmount}></input>
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
                ) : allowance < rakis6StakingBalanceOf ? (
                    <>
                        <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                            <p>Available : {rakis6StakingBalanceOf}</p>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-Approve-AmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6ApStakeAmount" placeholder="0" onChange={changeRakis6DepositAmount} value={rakis6StakingAmount}></input>
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
                ) : allowance >= rakis6StakingBalanceOf ? (
                    <>
                        <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                            <p>Available : {rakis6StakingBalanceOf}</p>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-StakedAmountSection">
                            <input type="number" onChange={changeRakis6DepositAmount} step="0.000000000000000001" id="maxRakis6StStakeAmount" placeholder="0" value={rakis6StakingAmount}></input>
                            <p>RAKIS-6</p>
                            <button className="rakis6-AirDrop-Deposit-AmountMaxBtn">Max</button>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-Pswd-Container">
                            <div className="rakis6-AirDrop-Deposit-Pswd-Section">
                                <div className="rakis6-AirDrop-Deposit-Pswd-Lock">
                                    <HiOutlineLockClosedIcon />
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
                                    <FaEyeIcon
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
                ) : successRakis6Apporve === false ? (
                    <>
                        <div className="rakis6-AirDrop-Deposit-TokenBalanceSection">
                            <p>Available : {rakis6StakingBalanceOf}</p>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-Approve-AmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6ApStakeAmount" placeholder="0" onChange={changeRakis6DepositAmount} value={rakis6StakingAmount}></input>
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
                            <input type="number" step="0.000000000000000001" id="maxRakis6StStakeAmount" placeholder="0" value={rakis6StakingAmount}></input>
                            <p>RAKIS-6</p>
                            <button className="rakis6-AirDrop-Deposit-AmountMaxBtn">Max</button>
                        </div>
                        <div className="rakis6-AirDrop-Deposit-Pswd-Container">
                            <div className="rakis6-AirDrop-Deposit-Pswd-Section">
                                <div className="rakis6-AirDrop-Deposit-Pswd-Lock">
                                    <HiOutlineLockClosedIcon />
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
                                    <FaEyeIcon
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
        </div>
    );
};

export default Rakis6DepositSection;
