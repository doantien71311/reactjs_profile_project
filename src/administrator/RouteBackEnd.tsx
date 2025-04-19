import { Route, Routes } from "react-router-dom";
import { BEIndex } from "./compoments/BEIndex";
import { FukudaSonDonDatHangBEIndex } from "./compoments/fukuda_son_dondathang_be/FukudaSonDonDatHangBEIndex";
import { ProfileBEIndex } from "./compoments/profile_be/ProfileBEIndex";
import ChucNangUrl from "./ChucNangUrl";

export const RouteBackEnd = () => {
  return (
    <Routes>
      <Route element={<BEIndex />}>
        <Route index path="administrator" element={<RouteBackEndIndex />} />
        <Route
          path={ChucNangUrl.administrator_profile}
          element={<ProfileBEIndex />}
        />
        <Route
          path={ChucNangUrl.administrator_fukuda_son_dondathang}
          element={<FukudaSonDonDatHangBEIndex />}
        />
      </Route>
    </Routes>
  );
};

export const RouteBackEndIndex = () => {
  return <h1>Index</h1>;
};
