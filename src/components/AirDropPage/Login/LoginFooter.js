import React, { useState } from "react";
import "./LoginFooter.scss";
import LoginTermsModal from "./LoginTermsModal";
import LoginPrivacyModal from "./LoginPrivacyModal";

const LoginFooter = () => {
    const [privacyModal, setPrivacyModal] = useState(false);
    const [termsModal, setTermsModal] = useState(false);

    const openPrivacyModal = () => {
        setPrivacyModal(true);
    };
    const openTermsModal = () => {
        setTermsModal(true);
    };

    const closePrivacyModal = () => {
        setPrivacyModal(false);
    };

    const closeTermsModal = () => {
        setTermsModal(false);
    };
    return (
        <div className="airDrop-SignIn-Footer">
            <span onClick={openPrivacyModal}>Privacy Statement</span>
            <LoginPrivacyModal open={privacyModal} close={closePrivacyModal} />
            <a></a>
            <span onClick={openTermsModal}>Terms of Use</span>
            <LoginTermsModal open={termsModal} close={closeTermsModal} />
        </div>
    );
};

export default LoginFooter;
