import React from "react";
import "./SwitchChainModal.scss";

const SwitchChainModal = () => {
    return (
        <div className="switchChainModalContainer">
            <div>
                <h3>Switch Chain</h3>
            </div>
            <div>
                <p>Synthetix requires that you switch your wallet to the Optimism Mainnet network to continue.</p>
            </div>
            <div>
                <p>*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a</p>
            </div>
        </div>
    );
};

export default SwitchChainModal;
