import { useContext } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";

export const MoTa = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;
  return (
    <section className="profile-item profile-mota">
      <div className="common-title profile_mota_tieude">
        <span>Bản thân</span>
        <i className="fas fa-smile fa-3x"></i>
      </div>
      <div
        className="profile_mota_noidung"
        dangerouslySetInnerHTML={{ __html: `${useData.mota}` }}
      ></div>
    </section>
  );
};
