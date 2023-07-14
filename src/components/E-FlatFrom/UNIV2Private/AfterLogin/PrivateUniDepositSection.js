import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksAction } from "../../../../redux/actions/networksAction";
import "./PrivateUniDepositSection.scss";
import { UniV2PrivateViewAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateViewAction";
import { UniV2PrivateApproveAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateApproveAction";
import { UniV2PrivateStakeAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateStakeAction";
import Loading from "../../../SprStakingPage/Loading";
import Web3 from "web3";
import { UniV2PrivateApproveStateAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateApproveStateAction";
import { UniV2PrivateAPRViewAction } from "../../../../redux/actions/airdropActions/UniV2PrivateActions/UniV2PrivateAPRViewAction";
import { FaEyeIcon, HiOutlineLockClosedIcon } from "../../../Icons/reactIcons";

const PrivateUniDepositSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [privateRakis6Password, setPrivateRakis6Password] = useState(0);
    const [prRakis6Amount, setPrRakis6Amount] = useState("");
    const { account } = useSelector((state) => state.account);
    const { privateUniV2StakingTokenBalance, privateUniV2TotalStaked, totalUniV2PrivateStakedAmount, privateUniV2Allowance, successPrivateUniV2Approve, stakingPrUniV2APR } = useSelector(
        (state) => state.UniV2PrivateView
    );
    const isZeroAmount = prRakis6Amount === "0" || prRakis6Amount === "00" || prRakis6Amount === "000" || prRakis6Amount === "0000";

    const changeEthereumNetWork = () => {
        dispatch(networksAction.changeEthereumNetWorkAct());
    };

    // add to Reward Token
    const addRewardToken = async () => {
        const tokenAddress = "0x5052fa4a2a147eaAa4c0242e9Cc54a10A4f42070";
        const tokenSymbol = "HANeP";
        const tokenDecimals = 18;
        // const tokenImage = "https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg";

        try {
            const wasAdded = await window.ethereum?.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        // image: tokenImage,
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

    const changePrRakis6DepositAmount = (e) => {
        const pattern = /^(\d{0,4}([.]\d{0,18})?)?$/;
        if (pattern.test(e.target.value)) {
            setPrRakis6Amount(e.target.value);
        }
    };

    const changePrRakis6MaxDepositAmount = () => {
        setPrRakis6Amount(privateUniV2StakingTokenBalance);
    };

    const setPrivateRakis6Apporve = () => {
        let rakis6PrStakingAmount = document.getElementById("maxRakis6StakeAmount").value;
        const rakis6PrStakingnum = Web3.utils.toWei(String(rakis6PrStakingAmount), "ether");
        dispatch(UniV2PrivateApproveAction.UniV2PrivateApproveAct(account, rakis6PrStakingnum));
    };

    const setPrivateRakis6Stake = () => {
        let rakis6PrStakingAmount = document.getElementById("maxRakis6StakeAmount").value;
        const rakis6Stakingnum = Web3.utils.toWei(String(rakis6PrStakingAmount), "ether");
        dispatch(UniV2PrivateStakeAction.UniV2PrivateStakeAct(account, rakis6Stakingnum, privateRakis6Password));
    };

    useEffect(() => {
        dispatch(UniV2PrivateViewAction.UniV2PrivateViewAct(account));
        dispatch(UniV2PrivateApproveStateAction.UniV2PrivateApproveStateAct(account));
        dispatch(UniV2PrivateAPRViewAction.UniV2PrivateAPRViewAct(account));
    }, [account]);

    useEffect(() => {
        if (window.ethereum?.chainId === "0x1") {
            setCheckChainId("0x1");
        }
        if (window.ethereum?.chainId === "0xa") {
            setCheckChainId("Oxa");
        }
        if (window.ethereum?.chainId === "0x5") {
            setCheckChainId("0x5");
        }
        if (window.ethereum?.chainId === "0x1a4") {
            setCheckChainId("0x1a4");
        }
    }, [window.ethereum?.chainId]);

    return (
        <div>
            <>
                <div className="eplat-PrUni-Deposit-Quaota-Section">
                    <p>TOTAL STAKED : {privateUniV2TotalStaked} </p>
                </div>
                <div className="eplat-PrUni-Deposit-StakeAmount-Section">
                    <p>STAKED : {totalUniV2PrivateStakedAmount} </p>
                </div>
            </>
            <div className="eplat-PrUni-Deposit-APR-Container">
                <div className="eplat-PrUni-Deposit-APR-Title">
                    <a>APR</a>
                </div>
                <div className="eplat-PrUni-Deposit-APR-Info">
                    <a>{stakingPrUniV2APR}%</a>
                </div>
            </div>
            {privateUniV2TotalStaked ? (
                prRakis6Amount === 0 || prRakis6Amount === "" ? (
                    <>
                        <div className="eplat-PrUni-Deposit-TokenBalanceSection">
                            <p>Available : {privateUniV2StakingTokenBalance}</p>
                        </div>
                        <div className="eplat-PrUni-Deposit-AmountSection">
                            <input type="number" step="0.00000000000001" id="maxRakis6StakeAmount" placeholder="0" onChange={changePrRakis6DepositAmount} value={prRakis6Amount}></input>
                            <p>UNI-V2</p>
                            <button className="eplat-PrUni-Deposit-AmountMaxBtn" onClick={changePrRakis6MaxDepositAmount}>
                                Max
                            </button>
                        </div>
                        <div className="eplat-PrUni-DepositStakeBtnSection">
                            <button className="eplat-PrUni-Deposit-EnterBtn" onClick={setPrivateRakis6Apporve}>
                                ENTER AMOUNT
                            </button>
                        </div>
                    </>
                ) : isZeroAmount || privateUniV2StakingTokenBalance === 0 || prRakis6Amount > privateUniV2StakingTokenBalance ? (
                    <>
                        <div className="eplat-PrUni-Deposit-TokenBalanceSection">
                            <p>Available : {privateUniV2StakingTokenBalance}</p>
                        </div>
                        <div className="eplat-PrUni-Deposit-AmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6StakeAmount" placeholder="0" onChange={changePrRakis6DepositAmount} value={prRakis6Amount}></input>
                            <p>RAKIS-6</p>
                            <button className="eplat-PrUni-Deposit-AmountMaxBtn" onClick={changePrRakis6MaxDepositAmount}>
                                Max
                            </button>
                        </div>

                        <div className="eplat-PrUni-DepositStakeBtnSection">
                            <button className="eplat-PrUni-Deposit-CantBtn" disabled={true}>
                                INSUFFICIENT RAKIS-6 BALANCE
                            </button>
                        </div>
                    </>
                ) : privateUniV2Allowance < privateUniV2StakingTokenBalance ? (
                    <>
                        <div className="eplat-PrUni-Deposit-TokenBalanceSection">
                            <p>Available : {privateUniV2StakingTokenBalance}</p>
                        </div>
                        <div className="eplat-PrUni-Deposit-Approve-AmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6StakeAmount" placeholder="0" onChange={changePrRakis6DepositAmount} value={prRakis6Amount}></input>
                            <p>UNI-V2</p>
                            <button className="eplat-PrUni-Deposit-AmountMaxBtn" onClick={changePrRakis6MaxDepositAmount}>
                                Max
                            </button>
                        </div>
                        <div className="eplat-PrUni-Deposit-LockedTxt">
                            <a>Locked 365-Day</a>
                        </div>
                        <div className="eplat-PrUni-DepositStakeBtnSection">
                            <button className="eplat-PrUni-Deposit-CanBtn" onClick={setPrivateRakis6Apporve}>
                                APPROVE
                            </button>
                        </div>
                    </>
                ) : privateUniV2Allowance >= privateUniV2StakingTokenBalance ? (
                    <>
                        <div className="eplat-PrUni-Deposit-TokenBalanceSection">
                            <p>Available : {privateUniV2StakingTokenBalance}</p>
                        </div>
                        <div className="eplat-PrUni-Deposit-StakedAmountSection">
                            <input type="number" onChange={changePrRakis6DepositAmount} step="0.000000000000000001" id="maxRakis6StakeAmount" placeholder="0" value={prRakis6Amount}></input>
                            <p>UNI-V2</p>
                            <button className="eplat-PrUni-Deposit-AmountMaxBtn">Max</button>
                        </div>
                        <div className="eplat-PrUni-Deposit-Pswd-Container">
                            <div className="eplat-PrUni-Deposit-Pswd-Section">
                                <div className="eplat-PrUni-Deposit-Pswd-Lock">
                                    <HiOutlineLockClosedIcon />
                                </div>
                                <input
                                    name="stakingPassword"
                                    placeholder="Enter Password"
                                    type={isRevealPwd ? "text" : "password"}
                                    value={privateRakis6Password}
                                    maxLength="4"
                                    onChange={(e) => setPrivateRakis6Password(e.target.value)}
                                />
                                <span className="eplat-PrUni-Deposit-Pswd-Hide">
                                    <FaEyeIcon
                                        className="eplat-PrUni-Deposit-Pswd-HideIcon"
                                        title={isRevealPwd ? "Hide password" : "Show password"}
                                        // src={isRevealPwd ? FaEye : FaEye}
                                        onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="eplat-PrUni-DepositStakeBtnSection">
                            <button className="eplat-PrUni-Deposit-CanBtn" onClick={setPrivateRakis6Stake}>
                                STAKE
                            </button>
                        </div>
                    </>
                ) : successPrivateUniV2Approve === false ? (
                    <>
                        <div className="eplat-PrUni-Deposit-TokenBalanceSection">
                            <p>Available : {privateUniV2StakingTokenBalance}</p>
                        </div>
                        <div className="eplat-PrUni-Deposit-Approve-AmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6StakeAmount" placeholder="0" onChange={changePrRakis6DepositAmount} value={prRakis6Amount}></input>
                            <p>UNI-V2</p>
                            <button className="eplat-PrUni-Deposit-AmountMaxBtn" onClick={changePrRakis6MaxDepositAmount}>
                                Max
                            </button>
                        </div>
                        <div className="eplat-PrUni-Deposit-LockedTxt">
                            <a>Locked 365-Day</a>
                        </div>
                        <div className="eplat-PrUni-DepositStakeBtnSection">
                            <button className="eplat-PrUni-Deposit-CanBtn" onClick={setPrivateRakis6Apporve}>
                                APPROVE
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="eplat-PrUni-Deposit-TokenBalanceSection">
                            <p>Available : {privateUniV2StakingTokenBalance}</p>
                        </div>
                        <div className="eplat-PrUni-Deposit-StakedAmountSection">
                            <input type="number" step="0.000000000000000001" id="maxRakis6StakeAmount" placeholder="0" value={prRakis6Amount}></input>
                            <p>UNI-V2</p>
                            <button className="eplat-PrUni-Deposit-AmountMaxBtn">Max</button>
                        </div>
                        <div className="eplat-PrUni-Deposit-Pswd-Container">
                            <div className="eplat-PrUni-Deposit-Pswd-Section">
                                <div className="eplat-PrUni-Deposit-Pswd-Lock">
                                    <HiOutlineLockClosedIcon />
                                </div>
                                <input
                                    name="stakingPassword"
                                    placeholder="Enter Password"
                                    type={isRevealPwd ? "text" : "password"}
                                    value={privateRakis6Password}
                                    maxLength="3"
                                    onChange={(e) => setPrivateRakis6Password(e.target.value)}
                                />
                                <span className="eplat-PrUni-Deposit-Pswd-Hide">
                                    <FaEyeIcon
                                        className="eplat-PrUni-Deposit-Pswd-HideIcon"
                                        title={isRevealPwd ? "Hide password" : "Show password"}
                                        // src={isRevealPwd ? FaEye : FaEye}
                                        onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="eplat-PrUni-DepositStakeBtnSection">
                            <button className="eplat-PrUni-Deposit-CanBtn" onClick={setPrivateRakis6Stake}>
                                STAKE
                            </button>
                        </div>
                    </>
                )
            ) : (
                <div className="eplat-PrUni-Deposit-LoadingContainer">
                    <Loading />
                </div>
            )}
            <div className="logoContainer">
                <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" onClick={changeEthereumNetWork} className="opIcon" alt="EthereumIcon" />
                <div className="HanEpTxtContinaer">
                    <span className="HanEpTxt" onClick={addRewardToken}>
                        HANeP
                    </span>
                </div>
                {/* <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" /> */}
            </div>
        </div>
    );
};

export default PrivateUniDepositSection;
