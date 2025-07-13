import { Route, Routes } from "react-router-dom";
import { BEIndex } from "./compoments/BEIndex";
import { FukudaSonDonDatHangBEIndex } from "./compoments/fukuda_son_dondathang_be/FukudaSonDonDatHangBEIndex";
import { ProfileBEIndex } from "./compoments/profile_nhanvien_edit/profile_temp/ProfileBEIndex";
import ChucNangUrl from "./ChucNangUrl";
import { FukudaSonSanPhamBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamBEIndex";
import { FukudaSonSanPhamEditBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamEditBEIndex";
import { ProfileBEEditIndex } from "./compoments/profile_nhanvien_edit/profile_edit/ProfileBEEditIndex";

import { NhanVienIndex } from "./compoments/nhanvien/NhanVienIndex";
import { BEProvider } from "./compoments/BEContext";
import { RouteBackEndIndex } from "./RouteBackEndIndex";

export const RouteBackEnd = () => {
  return (
    <BEProvider>
      <Routes>
        <Route element={<BEIndex />}>
          {/* <Route index path="administrator" element={<RouteBackEndIndex />} /> */}
          <Route index element={<RouteBackEndIndex />} />
          <Route
            path={ChucNangUrl.administrator_profile}
            element={<ProfileBEIndex />}
          />
          <Route
            path={ChucNangUrl.administrator_profile_edit}
            element={<ProfileBEEditIndex />}
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

          <Route
            path={ChucNangUrl.administrator_nhanvien}
            element={<NhanVienIndex />}
          />
        </Route>
      </Routes>
    </BEProvider>
  );
};
