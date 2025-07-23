import { useContext } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import LanguageTranslation from "../../../LanguageTranslation";

export const HocVan = () => {
  const { t } = useTranslation();
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;

  return (
    <section className="profile-item profile-hocvan">
      <div className="common-title profile_hocvan_tieude">
        <span>
          {/* HỌC VẤN  */}
          {t(LanguageTranslation.profile_education_title)}
        </span>
        <i className="fas fa-user-graduate fa-3x"></i>
      </div>
      <div className="profile_hocvan_noidung">
        {useData.profile_nhanvien_hocvan?.map((item) => (
          <motion.div
            initial={{
              opacity: 0,
              transform: "translateY(100%)",
            }}
            whileInView={{
              opacity: [0.2, 0.5, 0.8, 1],
              transform: "translateY(0%)",
              transition: {
                type: "spring",
                duration: 2.5,
              },
            }}
            viewport={{ once: false }}
            className="profile_hocvan_noidung_item"
          >
            <span>
              {`-${t(LanguageTranslation.academic_year_title)}`}:{" "}
              {item.thoigian_hocvan ?? ""}
            </span>
            <span>
              {`-${t(LanguageTranslation.university_title)}`}:{" "}
              {item.tentruong_hocvan_translate ?? ""}
            </span>
            <span>
              {`-${t(LanguageTranslation.major_title)}`}:{" "}
              {item.chuyennganh_hocvan_translate ?? ""}
            </span>
            <span>
              {`-${t(LanguageTranslation.degree_title)}`}:{" "}
              {item.bangcap_hocvan_translate ?? ""}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
