import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MunieWithdrawSection.scss";
import { HanLogo } from "../../../../assets/_index";
import Carousel from "react-multi-carousel";
import { munieUnstakeAction } from "../../../../redux/actions/munieStakingActions/munieUnstakeAction";
import { networksAction } from "../../../../redux/actions/networksAction";
import { munieWithdrawListAction } from "../../../../redux/actions/munieStakingActions/munieWithdrawListAction";
import Loading from "../../../SprStakingPage/Loading";
import { munieStakingViewAction } from "../../../../redux/actions/munieStakingActions/munieStakingViewAction";
import { SlArrowRightIcon, SlArrowLeftIcon } from "../../../Icons/reactIcons";

const MunieWithdrawSection = () => {
  const dispatch = useDispatch();

  const [checkChainId, setCheckChainId] = useState("");
  const [myStakedMunieTokenId, setMyStakedMunieTokenId] = useState("");
  const { account } = useSelector((state) => state.account);
  const { withdrawStakedAmount, stakedMunieTokenId, munieStakedTokenIds, munieAmountStaked } = useSelector(
    (state) => state.munieStakingView
  );
  const { mainTabArr } = useSelector((state) => state.networks);

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

  const munieUnStaking = () => {
    dispatch(munieUnstakeAction.munieUnstakeAct(Number(myStakedMunieTokenId), account));
  };

  const unStakingMuniecheckOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("munieUnstakeName");
    // console.log(checkboxes)
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else {
        setMyStakedMunieTokenId(checkThis.value);
        // console.log(checkThis.value);
      }
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // partialVisibilityGutter: 96,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        <div className="sliderRightBtn">
          <SlArrowRightIcon id="sliderRightBtn" onClick={() => next()} />
        </div>
        <div className="sliderLeftBtn">
          <SlArrowLeftIcon id="sliderLeftBtn" className={currentSlide === 0 ? "disable" : ""} onClick={() => previous()} />
        </div>
        {/* <ButtonThree onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </ButtonThree> */}
      </div>
    );
  };

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

  useEffect(() => {
    if (account) {
      dispatch(munieStakingViewAction.munieStakingViewAct(account));
      dispatch(munieWithdrawListAction.munieWithdrawListAct(account));
    }
  }, [mainTabArr]);

  return (
    <div>
      <div className="stakingMunieAmountContainer">
        <div className="stakingMunieAmountTitle">
          <div className="stakingMunieAmountTxt">
            <a>0.000001157407407407 HANeP</a>
          </div>

          {/* <div className="tooltip-container">
                            <i className="info-icon material-icons">
                                <HelpIcon />
                            </i>
                            <div className="tooltip-content">
                                <span>
                                    The right to possess digital content forever and get yourself a Sheepoori card -Ms. Caring one of three sheep siblings
                                    characters from Sewoori Union for AdKhan: Advertising Platform
                                </span>
                                <span className="align-right">
                                    {" "}
                                    <a href="https://medium.com/@HanIdentity/as-the-second-staking-of-the-hanchain-project-e29da8da25e3" target="_blank">
                                        Read More
                                    </a>
                                </span>
                            </div>
                        </div> */}
        </div>
        <div className="stakingMunieAmountNum">
          <a>for each NFT per second</a>
        </div>
      </div>
      <div className="stakedMunieCanAmountSection">
        <p>STAKED : {munieAmountStaked}</p>
      </div>
      {munieStakedTokenIds !== null ? (
        munieStakedTokenIds.length === 0 ? (
          <div className="munieStakingWithdrawContainer">
            <div className="munieStakingCantChoiceContainer">
              <div className="munieStakingCantChoiceSection">
                <a className="cantStakingMunieBtn" disabled={true}>
                  INSUFFICIENT BALANCE
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="munieStakingWithdrawContainer">
            <div className="munieUnStakingChoiceImgContainer">
              {stakedMunieTokenId !== "" ? (
                <Carousel
                  responsive={responsive}
                  arrows={false}
                  className="mainUnSlider"
                  partialVisible
                  customButtonGroup={<ButtonGroup />}
                  renderButtonGroupOutside
                >
                  {stakedMunieTokenId.map((item, index) => {
                    return (
                      <div className="munieUnStakingSlider" key={index}>
                        <div className="munieUnStakingImgContainer" id="munieUnStakingImgIdCardContainer">
                          <div
                            className="munieUnStakingImgCard"
                            style={{
                              // backgroundImage: `url(https://gateway.pinata.cloud/ipfs/QmcTcBbZtNRbwnDSjGjwfYXt8SiWahPtMFSL77dgfzHPUX)`,
                              backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${item.image})`,
                            }}
                          >
                            <input
                              className="imgUnCheckBox"
                              name="munieUnstakeName"
                              type="radio"
                              // key={index}
                              value={item.tokenId}
                              // onClick={() =>
                              //   selectUnStakingCheckButton(item.tokenId)
                              // }
                              onChange={(e) => unStakingMuniecheckOnlyOne(e.target)}
                            />
                          </div>
                          <div className="munieStakingImgTokenId">
                            <p>{item.name} </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              ) : null}
            </div>
            {stakedMunieTokenId.map((item, index) => {
              <div>
                <p>{item.tokenId}</p>
              </div>;
            })}
            <div className="munieUnStakeBtnSection">
              <button onClick={munieUnStaking} className="munie-learn-more">
                UNSTAKE
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="munieStakingDepositContainer">
          <div className="munieStakingCantChoiceImgContainer">
            <Loading />
          </div>
        </div>
      )}
      <div className="logoContainer">
        <img
          src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
          onClick={changeEthereumNetWork}
          className="opIcon"
          alt="EthereumIcon"
        />
        <div className="HanEpTxtContinaer">
          <span className="HanEpTxt" onClick={addRewardToken}>
            HANeP
          </span>
        </div>
      </div>
    </div>
  );
};

export default MunieWithdrawSection;
