import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { L2BridgeMintAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2BridgeMintAction";
import "./L2MintSection.scss";
import Loading from "../../../SprStakingPage/Loading";
import { L2BridgeL1TokenInfoAction } from "../../../../redux/actions/musikhanActions/L2Actions/L2BridgeL1TokenInfoAction";

const L2MintSection = () => {
    const dispatch = useDispatch();
    const [checkChainId, setCheckChainId] = useState("");
    const { account } = useSelector((state) => state.account);

    // L2 Bridge
    const { mintL2TokenName, mintL2TokenSymbol, getL1TokenAmount, getL1TokenL2Ca } = useSelector((state) => state.L2BridgeView);

    const l2TokenMinting = () => {
        dispatch(L2BridgeMintAction.L2BridgeMintAct(account, getL1TokenL2Ca));
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
        dispatch(L2BridgeL1TokenInfoAction.L2BridgeL1TokenInfoAct(account));
    }, [account]);

    return (
        <div>
            {checkChainId === "0x1" ? (
                // Ethereum Bridge Section
                <div>
                    <h1>MainNet</h1>
                </div>
            ) : checkChainId === "Oxa" ? (
                // Optimism Bridge Section
                <div className="musiStakingL2BridgeContainer">
                    <div className="musiStakingL2BridgeSection">
                        {getL1TokenAmount === "0" ? (
                            <>
                                <div className="musiStakingL2BridgeTokenTitleSection">
                                    <a>Token Name : N/A </a>
                                    <a>Token Symbol : N/A </a>
                                    <a>Token Amount : N/A </a>
                                </div>
                                <div className="musiStakingL2BridegeSwitchBtnSection">
                                    <button className="cant-Musi-L2Bridge-learn-more" disabled={true}>
                                        NOTHING TO MINT
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="musiStakingL2BridgeTokenTitleSection">
                                    <a>Token Name : {mintL2TokenName} </a>
                                    <a>Token Symbol : {mintL2TokenSymbol} </a>
                                    <a>Token Amount : {getL1TokenAmount}</a>
                                </div>
                                <div className="musiStakingL2BridegeSwitchBtnSection">
                                    <button className="musi-L2Bridge-learn-more" onClick={l2TokenMinting}>
                                        MINT
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                // Others Network Bridge Section
                <div className="cantConnectNetWorkContainer">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default L2MintSection;
