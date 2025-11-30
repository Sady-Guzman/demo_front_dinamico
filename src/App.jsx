import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerVideos from "./pages/VerVideos";
import SubirVideo from "./pages/SubirVideo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubirVideo />} />
        <Route path="/videos" element={<VerVideos />} />
      </Routes>
    </BrowserRouter>
  );
}
