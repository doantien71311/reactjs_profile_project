import { useNavigate } from "react-router-dom";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { CommonToolbarUI } from "../common_ui/CommonToolbarUI";
import { CommonProps } from "./Props";
import ChucNangUrl from "../../ChucNangUrl";

export const Toolbar = ({ selectRow }: CommonProps) => {
  const navigate = useNavigate();

  const Xem: TCommonToolbar = {
    maChucNang: "Xem",
    tenChucNang: "Xem",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {},
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
      navigate(
        ChucNangUrl.toUrlDanhMuc(
          ChucNangUrl.administrator_fukuda_son_sanpham_edit,
          selectRow.id,
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

  return (
    <>
      <CommonToolbarUI
        Title="Danh sách profile nhân viên"
        Xem={Xem}
        Them={Them}
        Sua={Sua}
        Xoa={Xoa}
        children={
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        }
      ></CommonToolbarUI>
    </>
  );
};
