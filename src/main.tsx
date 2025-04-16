import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./website/compoments/profile/Index";
import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="blogs" element={<Blogs />} /> */}
          {/* <Route path="admins" element={<Admin />} /> */}
          {/* <Route
            path="count"
            element={<Count count={0} setCount={() => {}} />}
          /> */}
          {/* <Route index element={<Home />} /> */}
        </Route>
        <Route path="administrator/*" element={<RouteBackEnd />} />
        {/* <Route path="administrator/sanpham" element={<SanPhamIndex />} /> */}
        {/* <RouteBackEnd /> */}
        <Route path="profile/:ma_nv" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
