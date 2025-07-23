import { Route, Routes } from "react-router-dom";
import { BEIndex } from "./compoments/BEIndex";
import { ProfileBEIndex } from "./compoments/profile_nhanvien_edit/profile_temp/ProfileBEIndex";
import ChucNangUrl from "./ChucNangUrl";
import { FukudaSonSanPhamBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamBEIndex";
import { ProfileBEEditIndex } from "./compoments/profile_nhanvien_edit/profile_edit/ProfileBEEditIndex";

import { NhanVienIndex } from "./compoments/nhanvien/NhanVienIndex";
import { BEProvider } from "./compoments/BEContext";
import { RouteBackEndIndex } from "./RouteBackEndIndex";
import { FukudaSonSanPhamEditIndex } from "./compoments/fukuda_son_sanpham_edit/FukudaSonSanPhamEditIndex";
import { DangNhapIndex } from "./compoments/login/DangNhapIndex";
import { NhanVienEditIndex } from "./compoments/nhanvien_edit/NhanVienEditIndex";
import { QTLVEditIndex } from "./compoments/profile_nhanvien_edit/profile_edit/profile_edit_qua_trinh_lam_viec/QTLVEditIndex";

export const RouteBackEnd = () => {
  return (
    <BEProvider>
      <Routes>
        <Route
          path={ChucNangUrl.administrator_dang_nhap}
          element={<DangNhapIndex />}
        />
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
            path={
              ChucNangUrl.administrator_profile_qtlv_edit +
              ChucNangUrl.toQueryDanhMuc
            }
            element={<QTLVEditIndex />}
          />

          <Route
            path={ChucNangUrl.administrator_fukuda_son_sanpham}
            element={<FukudaSonSanPhamBEIndex />}
          />
          <Route
            path={
              ChucNangUrl.administrator_fukuda_son_sanpham_edit +
              ChucNangUrl.toQueryDanhMuc
              // "/:keyString/:isAddNew"
            }
            element={<FukudaSonSanPhamEditIndex />}
          />

          {/* <Route
            path={ChucNangUrl.administrator_fukuda_son_sanpham_edit}
            element={<FukudaSonSanPhamEditIndex />}
          /> */}
          <Route
            path={ChucNangUrl.administrator_fukuda_son_dondathang}
            element={<FukudaSonSanPhamBEIndex />}
          />

          <Route
            path={ChucNangUrl.administrator_fukuda_son_tuyendung_npp}
            element={<FukudaSonSanPhamBEIndex />}
          />
          <Route
            path={ChucNangUrl.administrator_fukuda_son_khao_sat}
            element={<FukudaSonSanPhamBEIndex />}
          />

          <Route
            path={ChucNangUrl.administrator_nhanvien}
            element={<NhanVienIndex />}
          />
          <Route
            path={
              ChucNangUrl.administrator_nhanvien_edit +
              ChucNangUrl.toQueryDanhMuc
            }
            element={<NhanVienEditIndex />}
          />
        </Route>
      </Routes>
    </BEProvider>
  );
};
