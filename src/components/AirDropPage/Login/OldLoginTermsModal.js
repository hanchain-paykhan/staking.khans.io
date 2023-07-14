import React from "react";
import "./LoginTermsModal.scss";

const OldLoginTermsModal = (props) => {
  const { open, close } = props;
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="musikhan-ModalTopTitleContainer">
              <div className="musikhan-SignIn-ModalTopTitleSection">
                <b>Terms of Use</b>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="musikhan-ModalTokensTxtSection">
                            <b>Tokens</b>
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
                      <h2>Article 1 [Purpose)</h2>
                      <b>
                        These terms and conditions relate to the transfer of rights to the music publisher, the rights relationship between
                        the MusiKhan-related copyright fee token payer (hereinafter referred to as “transferrer”) and the MusiKhan-related
                        copyright fee Cy-token receiver (hereinafter referred to as “transferee”) within the PayKhan Wallet function.
                        intended to signal.
                      </b>
                      <h2>Article 2 (Subject of Terms and Conditions)</h2>
                      <b>
                        The rights of the copyrighted works (hereinafter referred to as “targeted works”) and record producers subject to
                        these terms and conditions are as follows.
                        <br /> 1. Title (title): Substitute the title (title) with the token name to be distributed
                        <br /> 2.Performer: The performer of the work in clause 1.
                        <br /> 3. Category: Musical works
                        <br /> 4.Right Re: All rights to record producers Right of reproduction, right of exhibition, right of distribution,
                        right of rental
                        <br /> 5. Share rate: The ratio of the paid amount out of the total number of token contracts corresponding to
                        paragraph 1. is replaced by the share rate
                      </b>
                      <h2>Article 3 (How to Use Target Works)</h2>
                      <b>
                        (1) Even if the transferor transfers only a part of the rights to the record producer to the transferee in
                        accordance with Article 2.4 and 5., the transferor uses the entire subject work for the period specified in Article
                        4 (License Period).
                        <br />
                        (2) The transferor uses the subject work exclusively and exclusively in relation to the transferee and the third
                        party.
                      </b>
                      <h2>Article 4 (Permission Period)</h2>
                      <b>
                        This permission period is valid for the period during which the transferor, that is, Han Identity Korea Co., Ltd.,
                        is engaged in music-related business. However, the transferor may terminate the transfer by notifying the transferee
                        in writing of the intention to terminate three months prior to the date the transferor wishes to terminate the
                        transfer, and the effect of termination occurs three months after the transferee's intention to terminate is
                        reached.
                      </b>
                      <h2>Article 5 (Obligations of Transferor)</h2>
                      <b>
                        (1) The assignor assigns to the assignee all rights to the producer of the phonogram of the subject work specified
                        in Article 2.
                        <br />
                        (2) The transferor shall provide without delay if the transferee requests all documents of rights to the producer of
                        the phonogram.
                        <br />
                        (3) The transferor is free to exclusively and exclusively use the subject work within the scope of permission for
                        use under Article 2 during the license period under Article 4. The usage fee is determined in the following way.
                        <br /> 1. Payment method Payment Method ◻ PayKhan (PKN) ◻ PayKhan deduction amount Token contract that falls under
                        Article 2.1. Percentage of paid quantity out of total quantity (%)
                        <br /> 2. Time of payment Payment period ◻ PayKhan (PKN) PayKan deduction and simultaneous payment
                        <br /> (4) The criteria for the copyright token (blockchain) that the transferor pays to the transferee are as
                        follows. 1. Total number of copyright tokens of the target works as specified in Article 2: 2,000 2. Payment amount:
                        The amount paid to the ETH wallet address out of the total amount
                      </b>
                      <h2>Article 6 (Obligation of Assignee)</h2>
                      <b>
                        (1) The transferee must ensure that the copyright tokens received from the transferor can be transferred to a third
                        party. However, the transferee must notify the transferee of the transfer of the copyright token to the third party
                        10 days prior to the date the transferee transfers the copyright token to the third party. At this time, the right
                        to receive PayKan, which is paid simultaneously with the deduction of PayKan, is transferred to the third party
                        together with the copyright token, and the transferee can no longer demand the payment of PayKan from the
                        transferor.
                        <br />
                        (2) When the transferee transfers the copyright tokens to a third party, the transferee must also transfer the right
                        to the record producer in proportion to the relevant share ratio (transferred quantity relative to the total number
                        of tokens) to the third party that has been transferred. However, the transferor, that is, Han Identity Korea Co.,
                        Ltd.'s exclusive right to use must be recognized by the third party who received the transfer.
                        <br />
                        (3) After the transfer of all rights to the record producer of the target work, the assignee produces a record
                        identical or similar to all or part of the title and contents of the target work and uses it himself, establishes a
                        pledge to a third party, or grants permission to use the target work. shall not establish terms and conditions for
                      </b>
                      <h2> Article 7 (Confirmation and Representation/Guarantee)</h2>
                      <b>
                        (1) The transferor confirms and guarantees the transferee the following matters.
                        <br />
                        1. Legally possess the right and authority necessary to conclude the copyright transfer agreement of the target work
                        that there is
                        <br />
                        2. That the content of the target work does not infringe on any private rights, including copyrights, moral rights,
                        and trademark rights of third parties;
                        <br />
                        3. There is no fact that the title and contents of the subject work have been transferred to a third party or a work
                        that is similar to all or part of the title and contents of the subject work has been transferred to a third party
                        or a pledge has been established
                        <br />
                        4. Presence or absence of established terms and conditions for permission to use the target work
                        <br />
                        (2) The transferee shall confirm and state the matters in each of the following subparagraphs to the transferor.
                        <br />
                        1. The transferee understands that PayKhan (PKN) will not be paid by converting it into cash.
                        <br />
                        2. I am aware that PKN can be used in the form of points on platforms such as shopping malls operated by Han
                        Identity Korea.
                        <br />
                        (3) If the transferee transfers the copyright token to a third party, the following information must be explained to
                        the third party, and the transferee must compensate the transferee for damages caused by the transferee's failure to
                        explain it to the third party.
                        <br />
                        1. The rights to the record producer equal to the corresponding share ratio (transferred amount compared to the
                        total number of tokens) are also transferred to the third party that has been transferred.
                        <br />
                        2. In relation to the rights to the record producer transferred by the third party, the transferor, that is, Han
                        Identity Korea Co., Ltd., has the exclusive right to use the subject right.
                      </b>
                      <h2>Article 8 (Change of terms and conditions)</h2>
                      <b>
                        If there is an important reason to change some of the contents of these Terms and Conditions, the contents of these
                        Terms and Conditions may be changed without prior notice, and the changed Terms and Conditions will be notified
                        through the service.
                      </b>
                      <h2>Article 9 (Cancellation of Terms and Conditions)</h2>
                      <b>
                        (1) The parties may cancel this agreement if the agreement cannot be maintained due to natural disasters or other
                        force majeure.
                        <br />
                        (2) If the other party violates this Agreement without justifiable reason, the other party may set a reasonable
                        period to urge the other party to correct it, and if the other party fails to comply within the period, the contract
                        may be canceled. However, if the other party expresses a clear intention to refuse correction or if it is clearly
                        recognized that correction is impossible due to the nature of the violation, can be unlocked
                        <br />
                        (3) The exercise of the right to cancel this agreement does not affect the exercise of the right to claim damages
                        against the other party.
                      </b>
                      <h2>Article 10 (Compensation for Damages)</h2>
                      <b>
                        If a party violates these Terms and Conditions without a justifiable reason, he/she is responsible for compensating
                        for all damages caused to the other party. However, if you fail to comply with these Terms and Conditions due to the
                        reasons in Article 9, Paragraph 1, you will be exempted from liability for damages.
                      </b>
                      <h2>Article 11 (Payment of Expenses)</h2>
                      <b>The cost of concluding the contract shall be borne equally by the parties.</b>
                      <h2>Article 12 (Dispute Resolution)</h2>
                      <b>
                        (1) For all disputes arising from these terms and conditions, the transferor and the transferee must endeavor to
                        reach an amicable agreement, and if the dispute is not resolved satisfactorily, the Korea Copyright Commission may
                        apply for mediation prior to filing a lawsuit.
                        <br />
                        (2) If it is not resolved according to Paragraph 1, it shall be resolved by a lawsuit in a competent court according
                        to the Civil Procedure Act of the Republic of Korea.
                      </b>
                      <h2>Article 13 (Other Ancillary Agreements)</h2>
                      <b>
                        (1) The transferor and transferee may supplement the contents of this Agreement or prepare an annexed agreement to
                        stipulate matters not specified in this Agreement.
                        <br />
                        (2) The supplementary agreement under Paragraph 1 is effective within the scope of not contradicting or violating
                        the contents of these Terms and Conditions.
                      </b>
                      <h2>Article 14 (Interpretation and Supplement of Terms and Conditions)</h2>
                      <b>
                        If it is not specified in these terms and conditions or there is a difference in interpretation, the copyright law,
                        civil law, etc. shall be applied mutatis mutandis and it shall be resolved in accordance with social norms and
                        reasoning.
                      </b>
                      <h2>Article 15 (Effective Date of Terms and Conditions)</h2>
                      <b>
                        These Terms and Conditions shall come into effect from the date of transfer of the copyright tokens related to
                        MusiKhan.
                      </b>
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

export default OldLoginTermsModal;
