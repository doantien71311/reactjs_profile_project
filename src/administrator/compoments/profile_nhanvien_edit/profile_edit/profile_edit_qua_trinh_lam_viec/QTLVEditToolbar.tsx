import { useContext } from "react";
import { QTLVEditContext, QTLVEditContextProps } from "./QTLVEditContext";
import { TCommonToolbar } from "../../../common_props/CommonToolbarProps";
import { CommonToolbarEditUI } from "../../../common_ui/CommonToolbarEditUI";
import ChucNangUrl from "../../../../ChucNangUrl";
import { useNavigate } from "react-router-dom";

export const QTLVEditToolbar = () => {
  //
  const navigate = useNavigate();
  const { postDataApi } = useContext<QTLVEditContextProps>(QTLVEditContext);
  //
  const CapNhat: TCommonToolbar = {
    maChucNang: "CapNhat",
    tenChucNang: "Lưu",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      postDataApi();
    },
  };

  const TroVe: TCommonToolbar = {
    maChucNang: "TroVe",
    tenChucNang: "",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      navigate(ChucNangUrl.administrator_profile_edit);
    },
  };

  return (
    <>
      <CommonToolbarEditUI
        Title="Cập nhật Profile quá trình làm việc"
        CapNhat={CapNhat}
        TroVe={TroVe}
      ></CommonToolbarEditUI>
    </>
  );
};
