import { useNavigate } from "react-router-dom";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { CommonToolbarEditUI } from "../common_ui/CommonToolbarEditUI";
import ChucNangUrl from "../../ChucNangUrl";

export const ToolbarEdit = () => {
  const navigate = useNavigate();
  //
  const CapNhat: TCommonToolbar = {
    maChucNang: "CapNhat",
    tenChucNang: "Lưu",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      //   postDataApi();
    },
  };

  const TroVe: TCommonToolbar = {
    maChucNang: "TroVe",
    tenChucNang: "",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      navigate(ChucNangUrl.administrator_fukuda_son_sanpham);
    },
  };

  return (
    <>
      <CommonToolbarEditUI
        Title="Cập nhật Fukuda Sơn sản phẩm"
        CapNhat={CapNhat}
        TroVe={TroVe}
      ></CommonToolbarEditUI>
    </>
  );
};
