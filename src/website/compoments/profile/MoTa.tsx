import { useContext } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { useTranslation } from "react-i18next";
import LanguageTranslation from "../../../LanguageTranslation";

export const MoTa = () => {
  const { t } = useTranslation();
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;
  return (
    <section className="profile-item profile-mota">
      <div className="common-title profile_mota_tieude">
        <span>
          {/* Bản thân */}
          {t(LanguageTranslation.profile_about_me_title)}
        </span>
        <i className="fas fa-smile fa-3x"></i>
      </div>
      <div
        className="profile_mota_noidung"
        dangerouslySetInnerHTML={{ __html: `${useData.mota_translate}` }}
      ></div>
    </section>
  );
};
