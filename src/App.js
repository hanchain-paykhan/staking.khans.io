import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
    MainPage,
    StakingPage,
    SprStakingPage,
    AirDropPage,
    MusikhanStakingPage,
    //  Web3TestPage, MunieStakingPage
} from "./pages/_index";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/rakis6" element={<StakingPage />} />
                <Route path="/spr" element={<SprStakingPage />} />
                <Route path="/airdrop" element={<AirDropPage />} />
                <Route path="/musikhan" element={<MusikhanStakingPage />} />
                {/* <Route path="/test" element={<Web3TestPage />} />
                <Route path="/munie" element={<MunieStakingPage />} /> */}
            </Routes>
        </>
    );
}

export default App;
