import { useContext, useRef } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileType } from "./ProfileType";
export const DinhHuong = () => {
  const useData = useContext<ProfileType>(ProfileContext);
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
    console.log(useData.url_hinhanh);
  }
  return (
    <div className="profile-dinhhuong profile-item">
      <div className="profile-dinhhuong-item">
        <i className="fa-solid fa-user"></i>
        <span>
          Thay đổi và nâng cao kỹ năng lập trình cũng như tìm kiếm công việc
        </span>
      </div>
    </div>
  );
};
