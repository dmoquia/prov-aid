import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Comcast from "./pages/Comcast";
import "./index.css";
import Att from "./pages/Att";
import Spectrum from "./pages/Spectrum";
// import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comcast" element={<Comcast />} />
        <Route path="/att" element={<Att />} />
        <Route path="/spectrum" element={<Spectrum />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
