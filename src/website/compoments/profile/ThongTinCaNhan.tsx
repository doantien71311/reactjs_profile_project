import { useContext } from "react";
import { ProfileType } from "./ProfileType";
import { ProfileContext } from "./ProfileContext";

export const ThongTinCacNhan = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useData = useContext<ProfileType>(ProfileContext);

  return (
    <div className="profile-thongtincanhan profile-item">
      <div className="profile_thongtincanhan">
        <div className="profile_thongtincanhan_item">
          <i className="fa-solid fa-user"></i>
          <span>
            <b>{useData.ten_nv}</b>
          </span>
        </div>

        <div className="profile_thongtincanhan_item">
          <i className="fa-solid fa-user"></i>
          <span>
            <b>{useData.dienthoai}</b>
          </span>
        </div>

        <div className="profile_thongtincanhan_item">
          <i className="fa-solid fa-user"></i>
          <span>
            <b>{useData.zalo}</b>
          </span>
        </div>

        <div className="profile_thongtincanhan_item">
          <i className="fa-solid fa-user"></i>
          <span>
            <b>{useData.facebook}</b>
          </span>
        </div>
        <div className="profile_thongtincanhan_item">
          <i className="fa-solid fa-user"></i>
          <span>
            <b>{useData.email}</b>
          </span>
        </div>

        <div className="profile_thongtincanhan_item">
          <i className="fa-solid fa-user"></i>
          <span>
            <b>{useData.diachi_thuongtru}</b>
          </span>
        </div>
      </div>
    </div>
  );
};
