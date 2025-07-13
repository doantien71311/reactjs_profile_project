import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
// import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";
import App from "./App.tsx";
import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";
// import { BEIndex } from "./administrator/compoments/BEIndex.tsx";
// import { RouteBackEndIndex } from "./administrator/RouteBackEndIndex.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route index element={<RouteBackEnd></RouteBackEnd>} />
        <Route path="*" element={<RouteBackEnd />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
