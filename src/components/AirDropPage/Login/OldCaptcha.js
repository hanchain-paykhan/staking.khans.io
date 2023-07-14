import React, { useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, LoadCanvasTemplateNoReload } from "react-simple-captcha";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../../redux/actions/airdropActions/signUpActions/signUpAction";
import Swal from "sweetalert2";
import "./Captcha.scss";
import { MdOutlineMailIcon, RiLock2LineIcon } from "../../Icons/reactIcons";
const OldCaptcha = () => {
  const { open, close } = props;
  const [userCaptcha, setUserCaptcha] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setUserCaptcha(e.target.value);
  };

  const emailAddress = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (open) {
      loadCaptchaEnginge(4);
    }
  }, [open]);

  const doCaptcha = () => {
    if (validateCaptcha(userCaptcha)) {
      setUserCaptcha("");
      findAccount();
      loadCaptchaEnginge(4);
    } else {
      // alert();
      Swal.fire({
        text: `Captcha Does Not Match`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      setUserCaptcha("");
      loadCaptchaEnginge(4);
    }
  };

  const findAccount = async () => {
    if (await dispatch(signUpAction.checkEmailAct(address))) {
      Swal.fire({
        text: `I sent the wallet address to ${address} .`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      await dispatch(signUpAction.findMetaMailAct(address));
      setAddress("");
      loadCaptchaEnginge(4);
    } else {
      Swal.fire({
        text: `${address} is the unregistered address`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      loadCaptchaEnginge(4);
    }
  };
  return (
    <div className={open ? "openModal catpcath" : "catpcath"}>
      {open ? (
        <section>
          <header>
            <div className="musikhan-ModalTopTitleContainer">
              <div className="checkId-ModalTopTitleSection">
                <b>Find Account</b>
                <button className="close" onClick={close}></button>
              </div>

              {/* <div className="checkId-ModalTokensTxtSection">
                            <a>Tokens</a>
                        </div> */}
            </div>
          </header>
          <div className="captchaEmailContainer">
            <div className="captchaEmailSection">
              <h3>Email</h3>
            </div>
            <div className="checkId-ModalTokensSearchInputSection">
              <MdOutlineMailIcon className="checkId-ModalSearchIcon" />
              <input
                onChange={emailAddress}
                value={address}
                type="email"
                placeholder="Please enter your email."
                required
                className="checkId-ModalTokensSearchInput"
                // onChange={(e) => setSearchDepositTokenData(e.target.toLowerCase())}
              ></input>
            </div>
            <div className="checkId-captchaSection">
              {/* <div className="checkId-captchaSection-Txt">
                                <a>Captcha</a>
                            </div> */}
              {/* <canvas id="captcha_canvas" className="captchaCanvas" /> */}
              <div className="checkId-captcahRefreshIconSection">
                <LoadCanvasTemplate reloadText="`" reloadColor="white" />
              </div>
              {/* <input ></input> */}
              <div className="checkId-captchaInputSection">
                <RiLock2LineIcon className="checkId-captchaIcon" />
                <input
                  placeholder="Type the text"
                  value={userCaptcha}
                  onChange={handleInputChange}
                  className="checkId-captchaInput"
                  // onChange={(e) => setSearchDepositTokenData(e.target.toLowerCase())}
                ></input>
              </div>
            </div>

            <div className="captchaSendBtnSection">
              <button onClick={doCaptcha}>Send Email</button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default OldCaptcha;
