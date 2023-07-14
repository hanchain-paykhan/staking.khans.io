import React, { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./HanStakingPage.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connectAccount } from "../redux/actions/connectAccount";
import { networksAction } from "../redux/actions/networksAction";
import {
  HanStakingPageTopSection,
  HanStakingConnectWalletSection,
  HanDepositSection,
  HanRewardSection,
  HanWithdrawSection,
} from "../components";

const HanStakingPage = () => {
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
    if (window.ethereum?.chainId === "0x5") {
      setCheckChainId("0x5");
    }
    if (window.ethereum?.chainId === "0x1a4") {
      setCheckChainId("0x1a4");
    }
  }, [window.ethereum?.chainId]);
  return (
    <div className="hanChainStakingMainContainer">
      <HanStakingPageTopSection />
      <Tabs className="Tabs">
        <HanStakingConnectWalletSection />
        <TabList>
          <Tab>DEPOSIT</Tab>
          <Tab>REWARDS</Tab>
          <Tab>WITHDRAW</Tab>
        </TabList>
        <TabPanel>
          <HanDepositSection />
        </TabPanel>
        <TabPanel>
          <HanRewardSection />
        </TabPanel>
        <TabPanel>
          <HanWithdrawSection />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HanStakingPage;
