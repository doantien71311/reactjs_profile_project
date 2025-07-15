import { useNavigate } from "react-router-dom";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { CommonToolbarUI } from "../common_ui/CommonToolbarUI";
import ChucNangUrl from "../../ChucNangUrl";
import { useContext } from "react";
import {
  FukudaSonSanPhamBEContext,
  FukudaSonSanPhamBEContextProps,
} from "./FukudaSonSanPhamBEContext";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import BEConstCSS from "../BEConstCSS";

export const Toolbar = () => {
  const navigate = useNavigate();
  const context = useContext<FukudaSonSanPhamBEContextProps>(
    FukudaSonSanPhamBEContext
  );

  const {
    fetchDataApi,
    textFilterNhomSon,
    setTextFilterNhomSon,
    textSort,
    setTextSort,
  } = useContext<FukudaSonSanPhamBEContextProps>(FukudaSonSanPhamBEContext);

  //#region các nút thêm xóa sửa
  const Xem: TCommonToolbar = {
    maChucNang: "Xem",
    tenChucNang: "Xem",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      fetchDataApi();
    },
  };
  const Them: TCommonToolbar = {
    maChucNang: "Them",
    tenChucNang: "Thêm",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      navigate(
        ChucNangUrl.toUrlDanhMuc(
          ChucNangUrl.administrator_fukuda_son_sanpham_edit,
          "*",
          true
        )
      );
    },
  };
  const Sua: TCommonToolbar = {
    maChucNang: "Sua",
    tenChucNang: "Sửa",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      if (!context.selectRow) return;
      if (!context.selectRow.id) return;
      if (context.selectRow.id === "") return;
      navigate(
        ChucNangUrl.toUrlDanhMuc(
          ChucNangUrl.administrator_fukuda_son_sanpham_edit,
          context.selectRow.id ?? "",
          false
        )
      );

      // navigate(
      //   ChucNangUrl.administrator_fukuda_son_sanpham_edit +
      //     "/" +
      //     selectRow.id +
      //     "/" +
      //     "false",
      //   {
      //     replace: false,
      //   }
      // );
      // <Navigate
      //   to={ChucNangUrl.administrator_fukuda_son_sanpham_edit + "/sadasd"}
      // />;

      // window.location.href =
      //   ChucNangUrl.administrator_fukuda_son_sanpham_edit + "/sadasd";
    },
  };
  const Xoa: TCommonToolbar = {
    maChucNang: "Xoa",
    tenChucNang: "Xóa",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {},
  };

  //#endregion các nút thêm xóa sửa

  const handleClickNhomSonFilter = (status: string) => {
    setTextFilterNhomSon(status);
  };

  const handleClickSort = (status: string) => {
    setTextSort(status);
  };

  const getBorderNhomSon = (value: string) => {
    if (value == textFilterNhomSon) return "border-info";
    else return "";
  };
  const getBorderSapXep = (value: string) => {
    if (value == textSort) return "border-info";
    else return "";
  };

  return (
    <>
      <CommonToolbarUI
        Title="Fukuda Sơn Sản phẩm"
        Xem={Xem}
        Them={Them}
        Sua={Sua}
        Xoa={Xoa}
        children={
          <Form
            className={
              BEConstCSS.row_body_toolbar_top_accordion_car_header_form
            }
            style={{
              position: "relative",
            }}
          >
            <Form.Group as={Row} className="m-2 align-items-center ">
              <Form.Label
                as={Col}
                sm={12}
                md={2}
                xl={1}
                className="h-100 align-middle align-text-middle"
              >
                Nhóm sơn:
              </Form.Label>
              <Stack
                as={Col}
                sm={12}
                md={10}
                xl={11}
                direction="horizontal"
                style={{
                  overflowX: "auto",
                  overflowBlock: "hidden",
                  whiteSpace: "nowrap",
                  // display: "inline !important",
                  // position: "absolute",
                  // transform: "translateX(100px)",
                  // translateX: "",
                  // top: "auto",
                  // left: "120px",
                  // right: "100px",
                  // minWidth: "100%",
                }}
                // className="position-absolute translate-middle-x"
                gap={1}
              >
                <Button
                  variant="outline-secondary"
                  className={getBorderNhomSon("")}
                  onClick={() => handleClickNhomSonFilter("")}
                >
                  <span>Tất cả</span>
                </Button>
                <Button
                  variant="outline-secondary"
                  className={getBorderNhomSon("CHONGTHAM")}
                  onClick={() => handleClickNhomSonFilter("CHONGTHAM")}
                >
                  <span>Chống thấm</span>
                </Button>
                <Button
                  variant="outline-secondary"
                  className={getBorderNhomSon("SON_NOITHAT")}
                  onClick={() => handleClickNhomSonFilter("SON_NOITHAT")}
                >
                  <span>Sơn nội thất</span>
                </Button>
                <Button
                  variant="outline-secondary"
                  className={getBorderNhomSon("SON_NGOAITHAT")}
                  onClick={() => handleClickNhomSonFilter("SON_NGOAITHAT")}
                >
                  <span>Sơn ngoại thất</span>
                </Button>
                <Button
                  variant="outline-secondary"
                  className={getBorderNhomSon("SON_LOTKHANGKIEM")}
                  onClick={() => handleClickNhomSonFilter("SON_LOTKHANGKIEM")}
                >
                  <span>Sơn lót kháng kiềm</span>
                </Button>
                <Button
                  variant="outline-secondary"
                  className={getBorderNhomSon("BOBA")}
                  onClick={() => handleClickNhomSonFilter("BOBA")}
                >
                  <span>Bột bã</span>
                </Button>
              </Stack>
            </Form.Group>

            <Form.Group as={Row} className="m-2 align-items-center">
              <Form.Label
                as={Col}
                sm={12}
                md={2}
                xl={1}
                className="h-100 align-middle align-text-middle"
              >
                Sắp sếp:
              </Form.Label>
              <Stack
                as={Col}
                sm={12}
                md={10}
                xl={11}
                direction="horizontal"
                style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                gap={1}
              >
                <Button
                  variant="outline-secondary"
                  className={getBorderSapXep("GIA_TANG")}
                  onClick={() => handleClickSort("GIA_TANG")}
                >
                  <span>Giá tăng</span>
                </Button>
                <Button
                  variant="outline-secondary"
                  className={getBorderSapXep("GIA_GIAM")}
                  onClick={() => handleClickSort("GIA_GIAM")}
                >
                  <span>Giá giảm</span>
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        }
      ></CommonToolbarUI>
    </>
  );
};
