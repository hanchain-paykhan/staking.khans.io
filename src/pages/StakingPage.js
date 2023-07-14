import React, { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./StakingPage.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connectAccount } from "../redux/actions/connectAccount";
import { networksAction } from "../redux/actions/networksAction";
const Rakis6TopSection = lazy(() => import("../components/Rakis6StakingPage/Rakis6TopSection"));
const Rakis6ConnectWalletSection = lazy(() => import("../components/Rakis6StakingPage/Rakis6ConnectWalletSection"));
const Rakis6DepositSection = lazy(() => import("../components/Rakis6StakingPage/Rakis6DepositSection"));
const Rakis6RewardSection = lazy(() => import("../components/Rakis6StakingPage/Rakis6RewardSection"));
const Rakis6FooterSection = lazy(() => import("../components/Rakis6StakingPage/Rakis6FooterSection"));
const Rakis6WithdrawSection = lazy(() => import("../components/Rakis6StakingPage/Rakis6WithdrawSection"));

const StakingPage = () => {
  const dispatch = useDispatch();
  const [checkChainId, setCheckChainId] = useState("");
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
    // dispatch(musikhanViewAction.getL1TokenListAct());
    dispatch(networksAction.networksAct());
  }, []);

  useEffect(() => {
    if (window.ethereum?.chainId === "0x1") {
      setCheckChainId("0x1");
    }
    if (window.ethereum?.chainId === "0xa") {
      setCheckChainId("Oxa");
    }
  }, [window.ethereum?.chainId]);
  return (
    <div className="stakingPageContainer">
      <Rakis6TopSection />
      <Tabs className="Tabs">
        <Rakis6ConnectWalletSection />
        <TabList>
          <Tab>DEPOSIT</Tab>
          <Tab>REWARDS</Tab>
          <Tab>WITHDRAW</Tab>
        </TabList>
        <TabPanel>
          <Rakis6DepositSection />
        </TabPanel>
        <TabPanel className="allTokenRewardsContainer">
          <Rakis6RewardSection />
        </TabPanel>
        <TabPanel>
          <Rakis6WithdrawSection />
        </TabPanel>
        <Rakis6FooterSection />
      </Tabs>
    </div>
  );
};

export default StakingPage;
