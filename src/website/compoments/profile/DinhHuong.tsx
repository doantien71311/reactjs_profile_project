import { useContext, useRef } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileType } from "./ProfileType";
export const DinhHuong = () => {
  const useData = useContext<ProfileType>(ProfileContext);
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }
  return (
    <div className="profile-dinhhuong profile-item">
      {useData.dh?.map((item) => (
        <div className="profile-dinhhuong-item">
          <i className="fas fa-star fa-2x"></i>
          <span>{item.noidung}</span>
        </div>
      ))}
    </div>
  );
};
