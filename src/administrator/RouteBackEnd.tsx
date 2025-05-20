import { Route, Routes } from "react-router-dom";
import { BEIndex } from "./compoments/BEIndex";
import { FukudaSonDonDatHangBEIndex } from "./compoments/fukuda_son_dondathang_be/FukudaSonDonDatHangBEIndex";
import { ProfileBEIndex } from "./compoments/profile_be/ProfileBEIndex";
import ChucNangUrl from "./ChucNangUrl";
import { FukudaSonSanPhamBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamBEIndex";
import { FukudaSonSanPhamEditBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamEditBEIndex";
import { ProfileBEEditIndex } from "./compoments/profile_be/profile_edit/ProfileBEEditIndex";
import { Col, Container, Row } from "react-bootstrap";
import { NhanVienIndex } from "./compoments/nhanvien/NhanVienIndex";

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
  );
};

export const RouteBackEndIndex = () => {
  return (
    <Container
      fluid
      style={{ width: "100%", height: "500px", backgroundColor: "red" }}
    >
      <Row>
        <Col xs={12} md={12}>
          .NET DEVELOPER WEB PORTAL HỆ THỐNG QUẢN TRỊ MRTIEN71311
        </Col>
      </Row>
      <Row>MrTien71311-Đổi mới-Chăm chỉ-Hòa đồng</Row>
    </Container>
  );
};
