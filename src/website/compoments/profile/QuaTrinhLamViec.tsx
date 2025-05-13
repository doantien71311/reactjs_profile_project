import { useContext } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";

export const QuaTrinhLamViec = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;

  return (
    <section className="profile-item profile-quatrinhlamviec">
      <div className="profile_quatrinhlamviec_collapsible">
        <input
          type="checkbox"
          id="collapsible-head-checkbox"
          name="wrapper-checkbox-name"
        />
        <div className="common-title profile_quatrinhlamviec_tieude">
          <label htmlFor="collapsible-head-checkboxDD">
            QUÁ TRÌNH LÀM VIỆC
          </label>
          <i className="fas fa-building fa-3x"></i>
        </div>

        <div className="profile_quatrinhlamviec_item_collapsible">
          {useData.profile_nhanvien_quatrinhlamviec?.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0.5,
                scale: 0.5,
              }}
              // whileHover={{ scale: 1.2 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  // ease: "backInOut",
                  // delay: index / 10,
                  duration: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="profile_quatrinhlamviec_item"
            >
              <div className="profile_quatrinhlamviec_item_left">
                <span>{item.thoigian_qtlv ?? ""}</span>
                <span>{item.congty_qtlv ?? ""}</span>
              </div>
              <div className="profile_quatrinhlamviec_item_right">
                <span>{item.vitri_qtlv ?? ""}</span>
                <div
                  className="profile_quatrinhlamviec_item_right_mota"
                  dangerouslySetInnerHTML={{ __html: `${item.mota_qtlv}` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
