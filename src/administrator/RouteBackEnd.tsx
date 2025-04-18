import { Route, Routes } from "react-router-dom";
import { AdministratorNav } from "./compoments/index";
import { FukudaSonDonDatHangBEIndex } from "./compoments/fukuda_son_dondathang_be/FukudaSonDonDatHangBEIndex";
import { ProfileBEIndex } from "./compoments/profile_be/ProfileBEIndex";

export const RouteBackEnd = () => {
  return (

    <Routes>
      <Route element={<AdministratorNav />}>
        <Route index element={<RouteBackEndIndex />} />
        <Route path="profile" element={<ProfileBEIndex />} />
        <Route
          path="fukuda-son-dondathang"
          element={<FukudaSonDonDatHangBEIndex />}
        />
      </Route>
    </Routes>
  );
  return <h1>Đang là trang admin</h1>;
};

export const RouteBackEndIndex = () => {
  return <h1>Index</h1>;
};
