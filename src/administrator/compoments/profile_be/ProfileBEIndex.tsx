import { CommonTitleBodyUI } from "../common_ui/CommonTitleBodyUI";
import { ProfileBEGrid } from "./ProfileBEGrid";
import { ProfileBEToolbar } from "./ProfileBEToolbar";

export const ProfileBEIndex = () => {
  return (
    <>
      <CommonTitleBodyUI
        title={<ProfileBEToolbar></ProfileBEToolbar>}
        body={<ProfileBEGrid></ProfileBEGrid>}
      ></CommonTitleBodyUI>
    </>
  );
};
