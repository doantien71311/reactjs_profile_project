import { useContext } from "react";
import { ProfileType } from "./ProfileType";
import { ProfileContext } from "./ProfileContext";

export const ThongTinCacNhan = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useData = useContext<ProfileType>(ProfileContext);

  return (
    <div className="profile-item profile-thongtincanhan ">
      <div className="common-title">
        <span>THÔNG TIN CÁ NHÂN</span>
        <i className="fas fa-address-card fa-3x"></i>
      </div>
      <div className="profile_thongtincanhan_noidung">
        <div className="profile_thongtincanhan_item">
          <i className="fas fa-user fa-lg"></i>
          <span>{useData.ten_nv}</span>
        </div>
        <div className="profile_thongtincanhan_item">
          <i className="fas fa-mobile fa-lg"></i>
          <span>{useData.dienthoai}</span>
        </div>
        <div className="profile_thongtincanhan_item">
          <i className="fas fa-envelope fa-lg"></i>
          <span>{useData.email}</span>
        </div>

        <div className="profile_thongtincanhan_item">
          <i className="fas fa-map-marker fa-lg"></i>
          <span>{useData.diachi_thuongtru}</span>
        </div>
      </div>
    </div>
  );
};
