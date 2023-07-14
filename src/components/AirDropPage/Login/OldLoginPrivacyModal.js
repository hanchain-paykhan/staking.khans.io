import React from "react";
import "./LoginPrivacyModal.scss";

const OldLoginPrivacyModal = (props) => {
  const { open, close } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="musikhan-ModalTopTitleContainer">
              <div className="musikhan-SignIn-ModalTopTitleSection">
                <b>Privacy Statement</b>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="musikhan-ModalTokensTxtSection">
                            <a>Tokens</a>
                        </div> */}
            </div>
          </header>
          <div className="musikhan-SignIn-ModalTokenInfoContainer">
            {/* <div className="musikhan-ModalTokensSearchInputSection">
                            <FaSearch className="musikhan-ModalSearchIcon" />
                            <input placeholder="Search name or symbol" className="musikhan-ModalTokensSearchInput"></input>
                        </div> */}
            <div>
              {/* <div className="airDrop-SignUp-Agree-Personal-Section">
                                <label>I agree to the collection and use of personal information.</label>
                            </div> */}
              <div className="airDrop-SignIn-Modal-Agree-Personal-ScrollBox-Section">
                <div className="airDrop-SignIn-Modal-Agree-Personal-scrollBox">
                  <div className="airDrop-SignIn-Modal-Agree-Personal-scrollBoxInner">
                    <h1>『Khans』 Terms of Service</h1>
                    <hr />
                    <div className="airDrop-SignIn-Modal-Personal-Content">
                      <h2>Article 1 [What information do we collect?)</h2>
                      <b>
                        We collect information from you when you register on our site and gather data when you participate in the forum by
                        reading, writing, and evaluating the content shared here. When registering on our site, you may be asked to enter
                        your name and e-mail address. You may, however, visit our site without registering. Your e-mail address will be
                        verified by an email containing a unique link. If that link is visited, we know that you control the e-mail address.
                        When registered and posting, we record the IP address that the post originated from. We also may retain server logs
                        which include the IP address of every request to our server.
                      </b>
                      <h2>Article 2 (What do we use your information for?)</h2>
                      <b>
                        Any of the information we collect from you may be used in one of the following ways: To personalize your experience
                        — your information helps us to better respond to your individual needs. To improve our site — we continually strive
                        to improve our site offerings based on the information and feedback we receive from you. To improve customer service
                        — your information helps us to more effectively respond to your customer service requests and support needs. To send
                        periodic emails — The email address you provide may be used to send you information, notifications that you request
                        about changes to topics or in response to your user name, respond to inquiries, and/or other requests or questions.
                      </b>
                      <h2>Article 3 (How do we protect your information?)</h2>
                      <b>
                        We implement a variety of security measures to maintain the safety of your personal information when you enter,
                        submit, or access your personal information.
                      </b>
                      <h2>Article 4 ( What is your data retention policy?)</h2>
                      <b>
                        We will make a good faith effort to: Retain server logs containing the IP address of all requests to this server no
                        more than 90 days. Retain the IP addresses associated with registered users and their posts no more than 5 years.
                      </b>
                      <h2>Article 5 ( Do we use cookies?)</h2>
                      <b>
                        Yes. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through
                        your Web browser (if you allow). These cookies enable the site to recognize your browser and, if you have a
                        registered account, associate it with your registered account. We use cookies to understand and save your
                        preferences for future visits and compile aggregate data about site traffic and site interaction so that we can
                        offer better site experiences and tools in the future. We may contract with third-party service providers to assist
                        us in better understanding our site visitors. These service providers are not permitted to use the information
                        collected on our behalf except to help us conduct and improve our business.
                      </b>
                      <h2>Article 6 ( Do we disclose any information to outside parties?)</h2>
                      <b>
                        We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does
                        not include trusted third parties who assist us in operating our site, conducting our business, or servicing you, so
                        long as those parties agree to keep this information confidential. We may also release your information when we
                        believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights,
                        property, or safety. However, non-personally identifiable visitor information may be provided to other parties for
                        marketing, advertising, or other uses.
                      </b>
                      <h2>Article 7 ( Third party links)</h2>
                      <b>
                        Occasionally, at our discretion, we may include or offer third party products or services on our site. These third
                        party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the
                        content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome
                        any feedback about these sites.
                      </b>
                      <h2>Article 8 ( Children’s Online Privacy Protection Act Compliance)</h2>
                      <b>
                        Our site, products and services are all directed to people who are at least 13 years old or older. If this server is
                        in the USA, and you are under the age of 13, per the requirements of COPPA (Children’s Online Privacy Protection
                        Act), do not use this site.
                      </b>
                      <h2>Article 9 ( Online Privacy Policy Only)</h2>
                      <b>
                        This online privacy policy applies only to information collected through our site and not to information collected
                        offline.
                      </b>
                      <h2>Article 10 ( Your Consent)</h2>
                      <b>By using our site, you consent to our web site privacy policy.</b>
                      <h2>Article 11 ( Changes to our Privacy Policy)</h2>
                      <b>If we decide to change our privacy policy, we will post those changes on this page.</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default OldLoginPrivacyModal;
