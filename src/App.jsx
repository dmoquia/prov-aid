import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Completed from "./pages/Completed";
import Configured from "./pages/Configured";
import "./index.css";
import Att from "./pages/Att";
import Spectrum from "./pages/Spectrum";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Completed />} />
        <Route path="/comcast" element={<Configured />} />
        <Route path="/att" element={<Att />} />
        <Route path="/spectrum" element={<Spectrum />} />
      </Routes>
    </>
  );
}

export default App;
