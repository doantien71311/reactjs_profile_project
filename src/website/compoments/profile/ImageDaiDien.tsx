import { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import {
  motion,
  // useTransform,
} from "motion/react";
import { ProfileHinhAnhType } from "../../../model/ProfileNhanVienType";

export const ImageDaiDien = () => {
  const { dataApi, isLoadingApi } =
    useContext<ProfileContextProps>(ProfileContext);
  const dataImage =
    useContext<ProfileContextProps>(ProfileContext).dataApi
      .profile_nhanvien_hinhanh ?? [];
  const initialized = useRef(false);
  const [leftImage, setLeftImage] = useState<ProfileHinhAnhType>({});
  // const [midImage, setMidImage] = useState<ProfileHinhAnhType>({});
  const [rightImage, setRightImage] = useState<ProfileHinhAnhType>({});
  const [currentImage, setCurrentImage] = useState<ProfileHinhAnhType>({});
  //
  useEffect(() => {
    initialized.current = true;
    if (isLoadingApi) return;
    // setLeftImage(dataImage[dataImage.length - 1]);
    // setCurrentImage(dataImage[0]);
    // setRightImage(dataImage[1]);
    onHandImageClick(dataImage[0]);
  }, [isLoadingApi]);

  const onHandImageClick = (item: ProfileHinhAnhType) => {
    // if (imageContainerRef.current == null) return;
    // imageContainerRef.current.scrollLeft = calScroll(newIndex);
    // setCurrentIndex(newIndex);
    const index = dataImage.indexOf(item);
    let indexLeft = index - 1;
    if (indexLeft < 0) {
      indexLeft = dataImage.length - 1;
    }
    let indexRight = index + 1;
    if (indexRight >= dataImage.length) {
      indexRight = 0;
    }
    setLeftImage(dataImage[indexLeft]);
    setCurrentImage(dataImage[index]);
    setRightImage(dataImage[indexRight]);
  };

  //#region các private funtion
  const getImageBottomBorder = (newImage: ProfileHinhAnhType) => {
    let result: string = "2px solid transparent";
    if (newImage.id === currentImage.id)
      // result = "2px solid var(--primary-color)";
      result = "2px solid var(--primary-second-right-color)";
    // console.log(result);
    return result;
  };
  const getImageBottomBorderRadius = (newImage: ProfileHinhAnhType) => {
    let result: string = "0";
    if (newImage.id === currentImage.id) result = "5px";
    // console.log(result);
    return result;
  };

  //#endregion các private funtion
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
        <motion.div
          // drag="x"
          // dragConstraints={{ right: 0, left: 0 }}
          className="profile_anhdaidien_top"
        >
          <motion.img
            key={leftImage.id}
            initial={{
              transform: "translateX(0px) scale(1)",
              // boxShadow: "none",
            }}
            whileInView={{
              transform: "translateX(15%) scale(0.8)",
              zIndex: 9,
              opacity: 0.7,
              boxShadow: "0px 0px 5px 0px grey",
              transition: {
                // delay: 0.3,
                duration: 0.7,
              },
            }}
            src={leftImage.url_hinhanh ?? ""}
            alt={leftImage.ten_hinhanh ?? ""}
          />
          <motion.img
            key={currentImage.id}
            initial={{
              transform: "translateX(0px) scale(1)",
              opacity: 0.7,
              // boxShadow: "none",
            }}
            whileInView={{
              transform: "translateX(0px) scale(1)",
              zIndex: 10,
              opacity: 1,
              boxShadow: "0px 0px 30px 1px grey",
              transition: {
                // delay: 0.3,
                duration: 0.7,
              },
            }}
            src={currentImage.url_hinhanh ?? ""}
            alt={currentImage.ten_hinhanh ?? ""}
          />
          <motion.img
            key={rightImage.id}
            initial={{
              transform: "translateX(0px) scale(1)",
              boxShadow: "none",
            }}
            whileInView={{
              transform: "translateX(-15%) scale(0.8)",
              zIndex: 9,
              opacity: 0.7,
              boxShadow: "0px 0px 5px 0px grey",
              transition: {
                // delay: 0.3,
                duration: 0.7,
              },
            }}
            src={rightImage.url_hinhanh ?? ""}
            alt={rightImage.ten_hinhanh ?? ""}
          />
        </motion.div>
        <div className="profile_anhdaidien_bottom">
          {dataApi.profile_nhanvien_hinhanh?.map((item) => (
            <img
              key={`${item.stt}-ct`}
              src={item.url_hinhanh ?? ""}
              alt={item.ten_hinhanh ?? ""}
              style={{
                border: `${getImageBottomBorder(item)}`,
                borderRadius: `${getImageBottomBorderRadius(item)}`,
              }}
              role="button"
              onClick={() => onHandImageClick(item)}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};
