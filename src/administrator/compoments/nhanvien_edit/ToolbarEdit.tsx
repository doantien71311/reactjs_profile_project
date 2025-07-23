import { useNavigate } from "react-router-dom";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { CommonToolbarEditUI } from "../common_ui/CommonToolbarEditUI";
import ChucNangUrl from "../../ChucNangUrl";
import { EditContext, EditContextProps } from "./Context";
import { useContext } from "react";

export const ToolbarEdit = () => {
  const navigate = useNavigate();
  const { postDataApi } = useContext<EditContextProps>(EditContext);
  //
  const CapNhat: TCommonToolbar = {
    maChucNang: "CapNhat",
    tenChucNang: "Lưu",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: async () => {
      await postDataApi();
    },
  };

  const TroVe: TCommonToolbar = {
    maChucNang: "TroVe",
    tenChucNang: "",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      navigate(ChucNangUrl.administrator_nhanvien);
    },
  };

  return (
    <>
      <CommonToolbarEditUI
        Title="Cập nhật Nhân viên"
        CapNhat={CapNhat}
        TroVe={TroVe}
      ></CommonToolbarEditUI>
    </>
  );
};
