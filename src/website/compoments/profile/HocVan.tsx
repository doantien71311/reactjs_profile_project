import { useContext } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";

export const HocVan = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;

  return (
    <section className="profile-item profile-hocvan">
      <div className="common-title profile_hocvan_tieude">
        <span>HỌC VẤN</span>
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
            <span>-Năm học: {item.thoigian_hocvan ?? ""}</span>
            <span>-Tên trường: {item.tentruong_hocvan ?? ""}</span>
            <span>-Chuyên ngành: {item.chuyennganh_hocvan ?? ""}</span>
            <span>-Bằng cấp: {item.bangcap_hocvan ?? ""}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
