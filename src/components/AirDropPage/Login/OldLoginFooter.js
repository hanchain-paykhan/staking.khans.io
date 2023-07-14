import React, { useState } from "react";
import "./LoginFooter.scss";
import OldLoginTermsModal from "./OldLoginTermsModal";
import OldLoginPrivacyModal from "./OldLoginPrivacyModal";

const OldLoginFooter = () => {
    const [oldPrivacyModal, setOldPrivacyModal] = useState(false);
    const [oldTermsModal, setOldTermsModal] = useState(false);

    const openPrivacyModal = () => {
        setOldPrivacyModal(true);
    };
    const openTermsModal = () => {
        setOldTermsModal(true);
    };

    const closePrivacyModal = () => {
        setOldPrivacyModal(false);
    };

    const closeTermsModal = () => {
        setOldTermsModal(false);
    };
    return (
        <div className="airDrop-SignIn-Footer">
            <span onClick={openPrivacyModal}>Privacy Statement</span>
            <OldLoginPrivacyModal open={oldPrivacyModal} close={closePrivacyModal} />
            <a></a>
            <span onClick={openTermsModal}>Terms of Use</span>
            <OldLoginTermsModal open={oldTermsModal} close={closeTermsModal} />
        </div>
    );
};

export default OldLoginFooter;
