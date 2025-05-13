import { useContext, useRef, useState } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import { motion } from "motion/react";

export const ImageDaiDien = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;
  const initialized = useRef(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  if (!initialized.current) {
    initialized.current = true;
    console.log(useData.url_hinhanh);
  }
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const onHandImageClick = (newIndex: number) => {
    setCurrentIndex(newIndex);
    if (imageContainerRef.current == null) return;
    // imageContainerRef.current.scrollLeft -= 250;
    imageContainerRef.current.scrollLeft += 250;
    console.log(imageContainerRef.current.scrollLeft);
  };
  const getScale = (newIndex: number) => {
    if (newIndex == currentIndex) return 1;
    return 0.7;
  };
  return (
    <motion.section className="profile-item profile-anhdaidien">
      <motion.div
      // initial={{
      //   scale: 0,
      // }}
      // whileInView={{
      //   scale: 1,
      //   // rotate: 360,
      //   // opacity: 1,
      //   transition: {
      //     ease: "easeOut",
      //     // ease: "backInOut",
      //     delay: 1,
      //     duration: 1.5,
      //   },
      // }}
      // viewport={{ once: true }}
      >
        <motion.div className="profile_anhdaidien_top" ref={imageContainerRef}>
          {useData.profile_nhanvien_hinhanh?.map((item, index) => (
            <motion.img
              key={item.id}
              initial={{ scale: 0.7 }}
              whileInView={{
                scale: getScale(index),
                transition: {
                  delay: 0.3,
                  duration: 0.5,
                },
              }}
              src={item.url_hinhanh ?? ""}
              alt={item.ten_hinhanh ?? ""}
            />
          ))}
        </motion.div>
        <div className="profile_anhdaidien_bottom">
          {useData.profile_nhanvien_hinhanh?.map((item, index) => (
            <img
              key={`${item.stt}-ct`}
              src={item.url_hinhanh ?? ""}
              alt={item.ten_hinhanh ?? ""}
              role="button"
              onClick={() => onHandImageClick(index)}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};
