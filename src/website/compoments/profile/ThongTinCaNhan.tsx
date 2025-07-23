import { useContext } from "react";
import { splitStringToArray } from "../../../utils/utilsFunction";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import LanguageTranslation from "../../../LanguageTranslation";
import { v4 as uuidv4 } from "uuid";

export const ThongTinCacNhan = () => {
  const { t } = useTranslation();
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };
  const staggerChildrenCus: number = 0.03;
  const transitionCus = {
    duration: 0.3,
  };
  const viewportCus = {
    once: false,
  };
  return (
    <section className="profile-item profile-thongtincanhan ">
      <div className="common-title profile_thongtincanhan_tieude">
        <span>
          {/* THÔNG TIN CÁ NHÂN */}
          {t(LanguageTranslation.profile_personal_information_title)}
        </span>
        <i className="fas fa-address-card fa-3x"></i>
      </div>
      <div className="profile_thongtincanhan_noidung">
        <motion.div className="profile_thongtincanhan_item">
          <i className="fas fa-user fa-lg"></i>
          <motion.span
            initial="hidden"
            whileInView="reveal"
            variants={charVariants}
            transition={{
              delayChildren: 0,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.ten_nv_translate ?? "").map((item) => (
              <motion.text
                key={uuidv4()}
                transition={transitionCus}
                variants={charVariants}
              >
                {item ?? ""}
              </motion.text>
            ))}
          </motion.span>
        </motion.div>
        <div className="profile_thongtincanhan_item">
          <i className="fas fa-mobile fa-lg"></i>
          <motion.span
            initial="hidden"
            whileInView="reveal"
            variants={charVariants}
            transition={{
              delayChildren:
                (useData.ten_nv_translate ?? "").length * staggerChildrenCus,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.dienthoai_translate ?? "").map(
              (item) => (
                <motion.text
                  key={uuidv4()}
                  transition={transitionCus}
                  variants={charVariants}
                >
                  {item ?? ""}
                </motion.text>
              )
            )}
          </motion.span>
        </div>
        <div className="profile_thongtincanhan_item">
          <i className="fas fa-envelope fa-lg"></i>
          <motion.span
            initial="hidden"
            whileInView="reveal"
            variants={charVariants}
            transition={{
              delayChildren:
                ((useData.ten_nv_translate ?? "").length +
                  (useData.dienthoai_translate ?? "").length) *
                staggerChildrenCus,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.email_translate ?? "").map((item) => (
              <motion.text
                key={uuidv4()}
                transition={transitionCus}
                variants={charVariants}
              >
                {item ?? ""}
              </motion.text>
            ))}
          </motion.span>
        </div>

        <div className="profile_thongtincanhan_item">
          <i className="fas fa-map-marker fa-lg"></i>
          <motion.span
            initial="hidden"
            whileInView="reveal"
            variants={charVariants}
            transition={{
              delayChildren:
                ((useData.ten_nv_translate ?? "").length +
                  (useData.dienthoai_translate ?? "").length +
                  (useData.email_translate ?? "").length) *
                staggerChildrenCus,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.diachi_thuongtru_translate ?? "").map(
              (item) => (
                <motion.text
                  key={uuidv4()}
                  transition={transitionCus}
                  variants={charVariants}
                >
                  {item ?? ""}
                </motion.text>
              )
            )}
          </motion.span>
        </div>
      </div>
    </section>
  );
};
