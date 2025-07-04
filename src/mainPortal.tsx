import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
import { Profile } from "./website/compoments/profile/Index.tsx";
// import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";
import { FukudaSonDonDatHangIndex } from "./website/compoments/fukuda_son_dondathang/FukudaSonDonDatHangIndex.tsx";
import App from "./App.tsx";
import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";
import { BEIndex } from "./administrator/compoments/BEIndex.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route index element={<BEIndex></BEIndex>} />
        <Route path="*" element={<RouteBackEnd />}></Route>
        <Route path="profile/:ma_nv" element={<Profile />} />
        <Route
          path="fukuda-son-dondathang/:ma_nv"
          element={<FukudaSonDonDatHangIndex />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
