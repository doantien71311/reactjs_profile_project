import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileType } from "./ProfileType";

export const QuaTrinhLamViec = () => {
  const useData = useContext<ProfileType>(ProfileContext);

  return (
    <div className="profile-item profile-quatrinhlamviec">
      <div className="profile_quatrinhlamviec_collapsible">
        <input
          type="checkbox"
          id="collapsible-head-checkbox"
          name="wrapper-checkbox-name"
        />
        <div className="common-title profile_quatrinhlamviec_tieude">
          <label htmlFor="collapsible-head-checkbox">QUÁ TRÌNH LÀM VIỆC</label>
          <i className="fas fa-address-card fa-3x"></i>
        </div>

        <div className="profile_quatrinhlamviec_item_collapsible">
          {useData.qtlv?.map((item) => (
            <div className="profile-quatrinhlamviec-item">
              <div className="profile-quatrinhlamviec-item-left">
                <span>{item.thoigian ?? ""}</span>
                <span>{item.cty ?? ""}</span>
              </div>
              <div className="profile-quatrinhlamviec-item-right">
                <span>{item.chucvu ?? ""}</span>
                <div
                  className="profile-quatrinhlamviec-item-right-mota"
                  dangerouslySetInnerHTML={{ __html: `${item.mota}` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
