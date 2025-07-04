import { Route, Routes } from "react-router-dom";
import { BEIndex } from "./compoments/BEIndex";
import { FukudaSonDonDatHangBEIndex } from "./compoments/fukuda_son_dondathang_be/FukudaSonDonDatHangBEIndex";
import { ProfileBEIndex } from "./compoments/profile_nhanvien_edit/profile_temp/ProfileBEIndex";
import ChucNangUrl from "./ChucNangUrl";
import { FukudaSonSanPhamBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamBEIndex";
import { FukudaSonSanPhamEditBEIndex } from "./compoments/fukuda_son_sanpham/FukudaSonSanPhamEditBEIndex";
import { ProfileBEEditIndex } from "./compoments/profile_nhanvien_edit/profile_edit/ProfileBEEditIndex";
import { Col, Container, Row, Image } from "react-bootstrap";
import { NhanVienIndex } from "./compoments/nhanvien/NhanVienIndex";
import { BEProvider } from "./compoments/BEContext";

export const RouteBackEnd = () => {
  return (
    <BEProvider>
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
    </BEProvider>
  );
};

export const RouteBackEndIndex = () => {
  return (
    <Container
      fluid
      style={{
        width: "100%",
        height: "100vh",
        // backgroundColor: "red",
      }}
      // className="align-items-center justify-content-center"
    >
      <Col
        xs={12}
        md={12}
        style={
          {
            //width: "100%",
            // height: "100vh",
            // backgroundColor: "red",
          }
        }
        className="h-100 w-100 align-items-center justify-content-between align-middle"
      >
        <Row
          style={
            {
              //width: "100%",
              // height: "100vh",
              // backgroundColor: "green",
            }
          }
          className="justify-content-center p-2 "
        >
          <Image
            thumbnail
            src="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb"
            style={{
              width: "20rem",
              height: "20rem",
            }}
          ></Image>
        </Row>
        <Row
          style={
            {
              //width: "100%",
              // height: "100vh",
              // backgroundColor: "green",
            }
          }
          className="justify-content-center fw-bold fs-3 text-center p-2 text-warning "
        >
          WEB PORTAL HỆ THỐNG QUẢN TRỊ MRTIEN71311 .NET DEVELOPER
        </Row>
        <Row className="justify-content-center fst-italic fs-3 text-center text-primary">
          Đổi mới-Chăm chỉ-Hòa đồng
        </Row>
      </Col>
    </Container>
  );
};
