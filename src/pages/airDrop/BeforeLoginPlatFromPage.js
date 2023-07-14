import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { HanLogo } from "../../assets/_index";
import "./HanEPlatFromPage.scss";
import { connectAccount } from "../../redux/actions/connectAccount";
import { L2BridgeL1TokenInfoAction } from "../../redux/actions/musikhanActions/L2Actions/L2BridgeL1TokenInfoAction";
import { L2RewardTotalAction } from "../../redux/actions/musikhanActions/L2Actions/L2RewardTotalAction";
import { L2RewardViewAction } from "../../redux/actions/musikhanActions/L2Actions/L2RewardViewAction";
import { L2RewardResultAction } from "../../redux/actions/musikhanActions/L2Actions/L2RewardResultAction";
import { musiAirDropTimeStampAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropTimeStampAction";
import { hanAirDropTimeStampAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropTimeStampAction";
import { musiAirDropBackDataInfoAction } from "../../redux/actions/airdropActions/musiActions/musiAirDropBackDataInfoAction";
import { airDropPriceAction } from "../../redux/actions/airdropActions/wethActions/airDropPriceAction";
import { airDropViewAction } from "../../redux/actions/airdropActions/wethActions/airDropViewAction";
import { airDropTimeStampAction } from "../../redux/actions/airdropActions/wethActions/airDropTimeStampAction";
import { hanAirDropViewAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropViewAction";
import { airDropClaimedAction } from "../../redux/actions/airdropActions/wethActions/airDropClaimedAction";
import { hanAirDropClaimedAction } from "../../redux/actions/airdropActions/hanActions/hanAirDropClaimedAction";
import { rakis6AirDropViewAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropViewAction";
import { tokenListViewAction } from "../../redux/actions/airdropActions/rakis6Actions/tokenListViewAction";
import { rakis6AirDropRewardViewAcion } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropRewardViewAction";
import { rakis6AirDropAprAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6AirDropAprAction";
import { rakis6TotalRewardViewAction } from "../../redux/actions/airdropActions/rakis6Actions/rakis6TotalRewardViewAction";
import { munieStakingViewAction } from "../../redux/actions/munieStakingActions/munieStakingViewAction";
import { munieDepositListAction } from "../../redux/actions/munieStakingActions/munieDepositListAction";
import { munieWithdrawListAction } from "../../redux/actions/munieStakingActions/munieWithdrawListAction";
import { munieStakingResultViewAction } from "../../redux/actions/munieStakingActions/munieStakingResultViewAction";
import { allMunieStakedViewAction } from "../../redux/actions/munieStakingActions/allMunieStakedViewAction";
import { networksAction } from "../../redux/actions/networksAction";
import { oldMunieSingleApproveStateAction } from "../../redux/actions/OldEPlatActions/OldMuineActions/oldMunieSingleApproveStateAction";

const AirDropConnectWalletSection = lazy(() => import("../../components/E-FlatFrom/AirDrop/AirDropConnectWalletSection"));
const AirDropFooter = lazy(() => import("../../components/E-FlatFrom/AirDrop/AirDropFooter"));
const BeforeHanAirDropSection = lazy(() => import("../../components/E-FlatFrom/AirDrop/BeforeLogin/BeforeHanAirDropSection"));
const BeforeL1BridgeL2DepositSection = lazy(() =>
  import("../../components/E-FlatFrom/Musikhan/BeforeLogin/BeforeL1BridgeL2DepositSection")
);
const BeforeL2MintSection = lazy(() => import("../../components/E-FlatFrom/Musikhan/BeforeLogin/BeforeL2MintSection"));
const BeforeL2RewardSection = lazy(() => import("../../components/E-FlatFrom/Musikhan/BeforeLogin/BeforeL2RewardSection"));
const BeforeL2SwapSection = lazy(() => import("../../components/E-FlatFrom/Musikhan/BeforeLogin/BeforeL2SwapSection"));
const BeforeWithdrawSection = lazy(() => import("../../components/E-FlatFrom/Musikhan/BeforeLogin/BeforeWithdrawSection"));
const BeforeMunieAirDropSection = lazy(() => import("../../components/E-FlatFrom/AirDrop/BeforeLogin/BeforeMunieAirDropSection"));
const MunieConnectWalletSection = lazy(() => import("../../components/E-FlatFrom/Munie/MunieConnectWalletSection"));
const BeforeMunieDepositSection = lazy(() => import("../../components/E-FlatFrom/Munie/BeforeLogin/BeforeMunieDepositSection"));
const BeforeMunieRewardSection = lazy(() => import("../../components/E-FlatFrom/Munie/BeforeLogin/BeforeMunieRewardSection"));
const BeforeMunieViewAdsSection = lazy(() => import("../../components/E-FlatFrom/Munie/BeforeLogin/BeforeMunieViewAdsSection"));
const BeforeMunieWithdrawSection = lazy(() => import("../../components/E-FlatFrom/Munie/BeforeLogin/BeforeMunieWithdrawSection"));
const BeforeMusiAirDropSection = lazy(() => import("../../components/E-FlatFrom/AirDrop/BeforeLogin/BeforeMusiAirDropSection"));
const BeforeUSDCAirDropSection = lazy(() => import("../../components/E-FlatFrom/AirDrop/BeforeLogin/BeforeUSDCAirDropSection"));
const MusiCompensationSection = lazy(() => import("../../components/E-FlatFrom/Musikhan/MusiCompensationSection"));
const MusiConnectWalletSection = lazy(() => import("../../components/E-FlatFrom/Musikhan/MusiConnectWalletSection"));
const MusiFooter = lazy(() => import("../../components/E-FlatFrom/Musikhan/MusiFooter"));
const BeforePrivateUniDepositSection = lazy(() =>
  import("../../components/E-FlatFrom/UNIV2Private/BeforeLogin/BeforePrivateUniDepositSection")
);
const BeforePrivateUniWithdrawSection = lazy(() =>
  import("../../components/E-FlatFrom/UNIV2Private/BeforeLogin/BeforePrivateUniWithdrawSection")
);
const BeforePrivateUniRewardSection = lazy(() =>
  import("../../components/E-FlatFrom/UNIV2Private/BeforeLogin/BeforePrivateUniRewardSection")
);
const PrivateUniV2TopSection = lazy(() => import("../../components/E-FlatFrom/UNIV2Private/PrivateUniV2TopSection"));
const PrivateUniConnectWalletSection = lazy(() => import("../../components/E-FlatFrom/UNIV2Private/PrivateUniConnectWalletSection"));
const BeforeRakis6DepositSection = lazy(() => import("../../components/E-FlatFrom/Rakis6/BeforeLogin/BeforeRakis6DepositSection"));
const BeforeRakis6RewardSection = lazy(() => import("../../components/E-FlatFrom/Rakis6/BeforeLogin/BeforeRakis6RewardSection"));
const BeforeRakis6WithdrawSection = lazy(() => import("../../components/E-FlatFrom/Rakis6/BeforeLogin/BeforeRakis6WithdrawSection"));
const SignInUpTopSection = lazy(() => import("../../components/E-FlatFrom/SignInUp/SignInUpTopSection"));
const BeforeWethAirDropSection = lazy(() => import("../../components/E-FlatFrom/AirDrop/BeforeLogin/BeforeWethAirDropSection"));
const HanEpL2ConnectWalletSection = lazy(() => import("../../components/E-FlatFrom/HanEp/HanEpL2ConnectWalletSection"));
const BeforeHanEpL2DepositSection = lazy(() => import("../../components/E-FlatFrom/HanEp/BeforeLogin/BeforeHanEpL2DepositSection"));
const BeforeHanEpL2RewardSection = lazy(() => import("../../components/E-FlatFrom/HanEp/BeforeLogin/BeforeHanEpL2RewardSection"));
const BeforeHanEpL2WithdrawSection = lazy(() => import("../../components/E-FlatFrom/HanEp/BeforeLogin/BeforeHanEpL2WithdrawSection"));

const BeforeLoginPlatFromPage = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
  const [stakingMunieTokenId, setStakingMunieTokenId] = useState(1);

  const { account } = useSelector((state) => state.account);

  const mainTabArr = ["AirDrop", "UNI-V2", "HANeP", "MusiKhan", "Rakis6", "Munie"];

  const musiL2TabArr = ["DEPOSIT", "REWARDS", "WITHDRAW", "MINT", "SWAP"];

  const musiOtherNetTabArr = ["DEPOSIT", "REWARDS", "WITHDRAW", "BRIDGE"];

  const munieTabArr = ["DEPOSIT", "REWARD", "WITHDRAW", "VIEW ADS"];

  const rakis6TabArr = ["DEPOSIT", "REWARD", "WITHDRAW"];

  const setup = () => {
    dispatch(connectAccount.getAccount());
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum?.on("chainChanged", networkChanged);

    return () => {
      window.ethereum?.removeListener("chainChanged", networkChanged);
    };
  }, []);

  useEffect(() => {
    setup();
    window.ethereum?.on("accountsChanged", () => {
      setup();
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum?.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum?.on("accountsChanged", () => {
        window.location.reload();
        setup();
      });
    }
  }, []);

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
    // dispatch(musikhanViewAction.getL1TokenListAct());
    dispatch(networksAction.networksAct());
  }, []);

  useEffect(() => {
    dispatch(L2BridgeL1TokenInfoAction.L2BridgeL1TokenInfoAct(account));
    dispatch(L2RewardTotalAction.L2RewardTotalAct(account));
  }, [account]);

  useEffect(() => {
    dispatch(L2RewardViewAction.L2RewardViewAct());
    dispatch(L2RewardResultAction.L2RewardResultAct());
  }, []);

  useEffect(() => {
    dispatch(airDropPriceAction.airDropPriceAct(account));
    dispatch(airDropViewAction.airDropViewAct(account));
    dispatch(airDropTimeStampAction.airDropTimeStampAct());
    dispatch(hanAirDropViewAction.hanAirDropViewAct(account));
  }, [account]);

  useEffect(() => {
    dispatch(airDropClaimedAction.airDropClaimedAct(account));
    dispatch(hanAirDropClaimedAction.hanAirDropClaimedAct(account));
  }, [account]);

  useEffect(() => {
    dispatch(musiAirDropTimeStampAction.musiAirDropTimeStampAct());
    dispatch(hanAirDropTimeStampAction.hanAirDropTimeStampAct());
  }, []);

  useEffect(() => {
    dispatch(musiAirDropBackDataInfoAction.musiAirDropBackDataInfoAct(account));
  }, [account]);

  // Rakis6 UseEffect
  useEffect(() => {
    dispatch(rakis6AirDropViewAction.rakis6AirDropViewAct(account));
    dispatch(tokenListViewAction.tokenListViewAct(account));
    dispatch(rakis6AirDropRewardViewAcion.rakis6AirDropRewardViewAct(account));
    dispatch(rakis6TotalRewardViewAction.rakis6TotalRewardViewAct(account));
    dispatch(rakis6AirDropAprAction.rakis6AirDropAprAct());
  }, [account]);

  // //Munie UseEffect
  useEffect(() => {
    dispatch(munieStakingViewAction.munieStakingViewAct(account));
    dispatch(munieDepositListAction.munieDepositListAct(account));
    dispatch(munieWithdrawListAction.munieWithdrawListAct(account));
    dispatch(munieStakingResultViewAction.munieStakingResultViewAct(account));
    dispatch(allMunieStakedViewAction.allMunieStakedViewAct());
    dispatch(oldMunieSingleApproveStateAction.oldMunieSingleApproveStateAct(account, Number(stakingMunieTokenId)));
  }, [account, Number(stakingMunieTokenId)]);

  return (
    <div className="platFromPageMainContainer">
      <div className="platFromPageNewChange">
        This is the formally Staking. Old Version is live at <a href="/hanep/old">staking.khans.io/hanep/old</a>
      </div>
      <div className="platFromPageLogoContainer">
        <img className="platFromTopLogo" src={HanLogo} alt="HanLogo" />
        <a>HAN e-Platform</a>
      </div>
      <Tabs forceRenderTabPanel defaultIndex={1} className="mainTabs">
        <SignInUpTopSection />
        <TabList className="mainTabList">
          {mainTabArr?.map((item, index) => {
            return <Tab key={index}>{item}</Tab>;
          })}
        </TabList>
        <TabPanel>
          <Tabs forceRenderTabPanel className="subTabs">
            <AirDropConnectWalletSection />
            <TabList className="subTabList">{/* <Tab>Tab1-1</Tab> */}</TabList>
            {/* AirDrop Section */}
            <TabPanel>
              <div className="airDropTabContainer">
                <div className="airDropTabSection">
                  <BeforeHanAirDropSection />
                  <BeforeMusiAirDropSection />
                  <BeforeUSDCAirDropSection />
                  <BeforeMunieAirDropSection />
                  <BeforeWethAirDropSection />
                </div>
              </div>
              <hr className="airDropTabHrSection" />
              <AirDropFooter />
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          {/* HanEp */}
          <Tabs forceRenderTabPanel className="subTabs">
            <PrivateUniConnectWalletSection />
            <TabList className="subTabList">
              {rakis6TabArr?.map((item, index) => {
                return <Tab key={index}>{item}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <BeforePrivateUniDepositSection />
            </TabPanel>
            <TabPanel>
              <BeforePrivateUniRewardSection />
            </TabPanel>
            <TabPanel>
              <BeforePrivateUniWithdrawSection />
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          {/* UNI-V2 */}
          <Tabs forceRenderTabPanel className="subTabs">
            <HanEpL2ConnectWalletSection />
            <TabList className="subTabList">
              {rakis6TabArr?.map((item, index) => {
                return <Tab key={index}>{item}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <BeforeHanEpL2DepositSection />
            </TabPanel>
            <TabPanel>
              <BeforeHanEpL2RewardSection />
            </TabPanel>
            <TabPanel>
              <BeforeHanEpL2WithdrawSection />
            </TabPanel>
          </Tabs>
        </TabPanel>

        <TabPanel>
          <Tabs forceRenderTabPanel className="subTabs">
            <MusiCompensationSection />
            <MusiConnectWalletSection />
            {checkChainId === "0x1" ? (
              // Ethereum
              <TabList className="subTabList"></TabList>
            ) : checkChainId === "Oxa" ? (
              // Optimsim
              <TabList className="subTabList">
                {musiL2TabArr?.map((item, index) => {
                  return <Tab key={index}>{item}</Tab>;
                })}
              </TabList>
            ) : (
              // Others NetWork
              <TabList className="subTabList">
                {musiOtherNetTabArr?.map((item, index) => {
                  return <Tab key={index}> {item}</Tab>;
                })}
              </TabList>
            )}
            {/* <TabList className="subTabList">
                            <Tab>DEPOSIT</Tab>
                            <Tab>REWARD</Tab>
                            <Tab>WITHDRAW</Tab>
                            <Tab>BRIDGE</Tab>
                            <Tab>SWAP</Tab>
                        </TabList> */}
            <TabPanel>
              {/* Musikhan L1Bridge, L2DePosit Section */}
              <BeforeL1BridgeL2DepositSection />
            </TabPanel>
            <TabPanel>
              {/* Musikhan L1EthX L2Reward Section*/}
              <BeforeL2RewardSection />
            </TabPanel>
            <TabPanel>
              {/* Musikhan L1EthX L2Withdraw Section */}
              <BeforeWithdrawSection />
            </TabPanel>
            <TabPanel>
              {/* Musikhan L2Brdige Section */}
              <BeforeL2MintSection />
            </TabPanel>
            <TabPanel>
              {/* Musikhan L2Swap Section */}
              <BeforeL2SwapSection />
            </TabPanel>
            <MusiFooter />
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel className="subTabs">
            <AirDropConnectWalletSection />
            <TabList className="subTabList">
              {rakis6TabArr?.map((item, index) => {
                return <Tab key={index}>{item}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <BeforeRakis6DepositSection />
            </TabPanel>
            <TabPanel>
              <BeforeRakis6RewardSection />
            </TabPanel>
            <TabPanel>
              <BeforeRakis6WithdrawSection />
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel className="subTabs">
            <MunieConnectWalletSection />
            <TabList className="subTabList">
              {munieTabArr?.map((item, index) => {
                return <Tab key={index}>{item}</Tab>;
              })}
            </TabList>
            <TabPanel>
              <BeforeMunieDepositSection />
            </TabPanel>
            <TabPanel>
              <BeforeMunieRewardSection />
            </TabPanel>
            <TabPanel>
              <BeforeMunieWithdrawSection />
            </TabPanel>
            <TabPanel>
              <BeforeMunieViewAdsSection />
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BeforeLoginPlatFromPage;
