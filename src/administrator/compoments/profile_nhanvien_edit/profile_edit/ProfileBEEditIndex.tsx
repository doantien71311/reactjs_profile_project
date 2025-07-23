// import { CommonTitleBodyUI } from "../common_ui/CommonTitleBodyUI";

import { CommonTitleBodyEditUI } from "../../common_ui/CommonTitleBodyEditUI";
import { ProfileBEEditForm } from "./ProfileBEEditForm";
import {
  ProfileBEEditProvider,
} from "./ProfileBEEditContext";
import { ProfileBEEditToolbar } from "./ProfileBEEditToolbar";

export const ProfileBEEditIndex = () => {



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
