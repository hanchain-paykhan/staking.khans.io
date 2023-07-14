import React from "react";
import "./InspectionPage.scss";
import { HanLogo } from "../assets/_index";

const InspectionPage = () => {
    return (
        <div className="inspectionPageContainer">
            <div className="section-padding">
                <div className="breadcrumb-section">
                    <div className="section-1">
                        <div className="logo-img">
                            <a>
                                <img src={HanLogo} alt="logo" classclassName="paykhan-logo" />
                            </a>
                        </div>
                    </div>
                    <div className="breadcrumb-content">
                        <h1 className="pointfont">페이지 오류 안내</h1>
                        <hr />
                    </div>
                    <div>
                        <span>
                            홈페이지 이용에 불편을 드려 죄송합니다.
                            <br />
                            비정상적인 요청으로 인하여 정상적인 화면이 호출되지 않고 있습니다.
                            <br />
                            추후에 공지 하겠습니다.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspectionPage;
