import { useContext, useRef } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileType } from "./ProfileType";
export const ImageDaiDien = () => {
  const useData = useContext<ProfileType>(ProfileContext);
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
    console.log(useData.url_hinhanh);
  }
  return (
    <div className="profile-anhdaidien profile-item">
      <img src={useData.url_hinhanh ?? ""} alt="ảnh đại diện"></img>
    </div>
  );
};
