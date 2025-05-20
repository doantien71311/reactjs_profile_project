// import { CommonTitleBodyUI } from "../common_ui/CommonTitleBodyUI";
import { useContext, useEffect, useState } from "react";
import { CommonTitleBodyEditUI } from "../../common_ui/CommonTitleBodyEditUI";
import { ProfileBEEditForm } from "../ProfileBEEditForm";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("ProfileBEEditIndex: useEffect - count - cleanup");
    setIsLoading(isUseUpdatingApi);
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
          isSavingData={isLoading}
        ></CommonTitleBodyEditUI>
      </ProfileBEEditProvider>
    </>
  );
};
