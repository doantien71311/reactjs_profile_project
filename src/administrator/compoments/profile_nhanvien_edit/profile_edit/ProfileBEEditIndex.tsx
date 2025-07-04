// import { CommonTitleBodyUI } from "../common_ui/CommonTitleBodyUI";
import { useContext, useEffect } from "react";
import { CommonTitleBodyEditUI } from "../../common_ui/CommonTitleBodyEditUI";
import { ProfileBEEditForm } from "./ProfileBEEditForm";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
  ProfileBEEditProvider,
} from "./ProfileBEEditContext";
import { ProfileBEEditToolbar } from "./ProfileBEEditToolbar";

export const ProfileBEEditIndex = () => {
  const isUseUpdatingApi =
    useContext<ProfileBEEditContextProps>(
      ProfileBEEditContext
    ).isUseUpdatingApi;

  useEffect(() => {
    return () => {
      console.log("ProfileBEEditIndex: useEffect - count - cleanup");
    };
  }, [isUseUpdatingApi]);

  return (
    <>
      <ProfileBEEditProvider>
        <CommonTitleBodyEditUI
          title={<ProfileBEEditToolbar />}
          body={<ProfileBEEditForm />}
        ></CommonTitleBodyEditUI>
      </ProfileBEEditProvider>
    </>
  );
};
