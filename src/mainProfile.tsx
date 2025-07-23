import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./website/compoments/profile/Index.tsx";
import App from "./App.tsx";
import "./i18n.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="profile/:ma_nv" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
