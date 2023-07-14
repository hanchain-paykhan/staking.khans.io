import React from "react";
import { useDispatch } from "react-redux";
import { OptimismRedLogo, HanLogo } from "../../../assets/_index";
import Swal from "sweetalert2";
import { networksAction } from "../../../redux/actions/networksAction";
import "./MusiFooter.scss";

const MusiFooter = () => {
    const dispatch = useDispatch();
    const changeEthereumNetWork = () => {
        dispatch(networksAction.changeEthereumNetWorkAct());
    };
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

    // add to Reward Token
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

    return (
        <div>
            <div className="logoContainer">
                <img
                    src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                    onClick={changeEthereumNetWork}
                    className="opIcon"
                    alt="EthereumIcon"
                />
                <img src={OptimismRedLogo} onClick={changeOpNetwork} className="opIcon" alt="OptimismIcon" />
                <img src={HanLogo} onClick={addRewardToken} className="hanIcon" alt="HanIcon" />
            </div>
        </div>
    );
};

export default MusiFooter;
