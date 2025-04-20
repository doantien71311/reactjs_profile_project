import { Route, Routes } from "react-router-dom";
import { BEIndex } from "./compoments/BEIndex";
import { FukudaSonDonDatHangBEIndex } from "./compoments/fukuda_son_dondathang_be/FukudaSonDonDatHangBEIndex";
import { ProfileBEIndex } from "./compoments/profile_be/ProfileBEIndex";
import ChucNangUrl from "./ChucNangUrl";
import { FukudaSonSanPhamBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamBEIndex";
import { FukudaSonSanPhamEditBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamEditBEIndex";

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
        <Route
          path={ChucNangUrl.administrator_fukuda_son_sanpham}
          element={<FukudaSonSanPhamBEIndex />}
        />

        <Route
          //  path="fukuda-son-dondathang/:ma_nv
          path={
            ChucNangUrl.administrator_fukuda_son_sanpham_edit +
            ChucNangUrl.toQueryDanhMuc
            // "/:keyString/:isAddNew"
          }
          element={<FukudaSonSanPhamEditBEIndex />}
        />
      </Route>
    </Routes>
  );
};

export const RouteBackEndIndex = () => {
  return <h1>Index</h1>;
};
