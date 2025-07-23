import { useContext, useRef } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";

export const DinhHuong = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }
  return (
    <section className="profile-item profile-dinhhuong ">
      <div>
        {useData.profile_nhanvien_dinhhuong?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              margin: "10px 10px 25px 100%",
              opacity: 0,
            }}
            whileInView={{
              margin: "10px 10px 25px 0%",
              opacity: 1,
              transition: {
                ease: "easeOut",
                delay: index / 10,
                duration: 0.7,
              },
            }}
            viewport={{ once: false }}
            className="profile-dinhhuong-item"
          >
            <i className="fas fa-star fa-2x"></i>
            <span>{item.noidung_translate}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
