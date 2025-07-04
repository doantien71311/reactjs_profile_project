import { useContext } from "react";
import { TCommonToolbar } from "../../common_props/CommonToolbarProps";
import { CommonToolbarEditUI } from "../../common_ui/CommonToolbarEditUI";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";

export const ProfileBEEditToolbar = () => {
  const { postDataApi } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);
  // const _postDataApi = async () => postDataApi();

  const CapNhat: TCommonToolbar = {
    maChucNang: "CapNhat",
    tenChucNang: "Lưu",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      postDataApi();
    },
  };

  return (
    <>
      <CommonToolbarEditUI
        Title="Cập nhật Profile"
        CapNhat={CapNhat}
      ></CommonToolbarEditUI>
    </>
  );
};
