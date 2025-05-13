import { useContext } from "react";
import { splitStringToArray } from "../../../utils/utilsFunction";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";

export const ThongTinCacNhan = () => {
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
        <span>THÔNG TIN CÁ NHÂN</span>
        <i className="fas fa-address-card fa-3x"></i>
      </div>
      <div className="profile_thongtincanhan_noidung">
        <motion.div 
        className="profile_thongtincanhan_item">
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
            {splitStringToArray(useData.ten_nv ?? "").map((item) => (
              <motion.text
                key={item}
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
              delayChildren: (useData.ten_nv ?? "").length * staggerChildrenCus,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.dienthoai ?? "").map((item) => (
              <motion.text
                // key={item}
                transition={transitionCus}
                variants={charVariants}
              >
                {item ?? ""}
              </motion.text>
            ))}
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
                ((useData.ten_nv ?? "").length +
                  (useData.dienthoai ?? "").length) *
                staggerChildrenCus,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.email ?? "").map((item) => (
              <motion.text
                key={item}
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
                ((useData.ten_nv ?? "").length +
                  (useData.dienthoai ?? "").length +
                  (useData.email ?? "").length) *
                staggerChildrenCus,
              staggerChildren: staggerChildrenCus,
            }}
            viewport={viewportCus}
          >
            {splitStringToArray(useData.diachi_thuongtru ?? "").map((item) => (
              <motion.text
                // key={item}
                transition={transitionCus}
                variants={charVariants}
              >
                {item ?? ""}
              </motion.text>
            ))}
          </motion.span>
        </div>
      </div>
    </section>
  );
};
