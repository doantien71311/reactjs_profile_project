import { useNavigate } from "react-router-dom";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { CommonToolbarUI } from "../common_ui/CommonToolbarUI";
import ChucNangUrl from "../../ChucNangUrl";
import { useContext } from "react";
import { NhanVienContext, NhanVienContextProps } from "./NhanVienContext";

export const NhanVienToolbar = () => {
  const navigate = useNavigate();
  const context = useContext<NhanVienContextProps>(NhanVienContext);

  const Xem: TCommonToolbar = {
    maChucNang: "Xem",
    tenChucNang: "Xem",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      context.fetchDataApi();
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
      if (!context.selectRow.soid) return;
      if (context.selectRow.soid === "") return;
      navigate(
        ChucNangUrl.toUrlDanhMuc(
          ChucNangUrl.administrator_fukuda_son_sanpham_edit,
          context.selectRow.soid ?? "",
          false
        )
      );

      // navigate(
      //   ChucNangUrl.administrator_fukuda_son_sanpham_edit +
      //     "/" +
      //     selectRow.soid +
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

  return (
    <>
      <CommonToolbarUI
        Title="Danh sách nhân viên"
        Xem={Xem}
        Them={Them}
        Sua={Sua}
        Xoa={Xoa}
        children={<div></div>}
      ></CommonToolbarUI>
    </>
  );
};
