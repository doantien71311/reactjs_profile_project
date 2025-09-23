import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
import { Profile } from "./website/compoments/profile/Index";
// import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";
import { FukudaSonDonDatHangIndex } from "./website/compoments/fukuda_son_dondathang/FukudaSonDonDatHangIndex.tsx";
import App from "./App.tsx";
import { RouteBackEnd } from "./administrator/RouteBackEnd.tsx";
import { BEIndex } from "./administrator/compoments/BEIndex.tsx";
import "./i18n.js";

// const router = createBrowserRouter([
//   {
//     element: <App />,
//     children: [
//       {
//         path: "profile",
//         element: <Home />,
//       },
//       {
//         path: "products",
//         element: <Products />,
//       },
//       {
//         path: "reports",
//         element: <Reports />,
//       },
//     ],
//   },
// ]);

// const getDefault = (): ReactNode => {
//   if (import.meta.env.VITE_web_default == "profile") return <Profile></Profile>;
//   return <BEIndex></BEIndex>;
// };

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <StrictMode>
    {/* <RouterProvider router={router} /> */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/" element={<RouteBackEnd />}> */}
          {/* <Route index element={<Profile />} /> */}
          {/* <Route path="blogs" element={<Blogs />} /> */}
          {/* <Route path="admins" element={<Admin />} /> */}
        </Route>
        {/* <Route path="administrator/*" element={<RouteBackEnd />} /> */}

        <Route index element={<BEIndex />} />
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
