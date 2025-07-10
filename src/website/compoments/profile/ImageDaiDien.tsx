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
    // if (initialized.current) return;
    initialized.current = true;
    if (isLoadingApi) return;
    // onHandImageClick(dataImage[0]);
    if (!dataImage || dataImage.length < 1) return;
    // const length = dataImage.length;
    // setCurrentImage(dataImage[0]);
    // let indexLeft = length - 1;
    // indexLeft = indexLeft < 0 ? 0 : indexLeft;
    // setLeftImage(dataImage[indexLeft]);
    // let indexRight = 1;
    // indexRight = length < 2 ? 1 : indexRight;
    // setRightImage(dataImage[indexRight]);

    onHandImageClick(dataImage[0]);
  }, [isLoadingApi]);

  // useEffect(() => {
  //   initialized.current = true;
  //   if (isLoadingApi) return;
  //   if (!currentImage) return;
  //   if ((currentImage.id ?? "") == "") return;
  //   onHandImageClick(currentImage);
  // }, [currentImage, isLoadingApi]);

  const onHandImageClick = (item: ProfileHinhAnhType) => {
    const index = dataImage.indexOf(item);
    let indexLeft = index - 1;
    if (indexLeft < 0) {
      indexLeft = dataImage.length - 1;
    }
    let indexRight = index + 1;
    if (indexRight >= dataImage.length) {
      indexRight = 0;
    }
    console.log(index);
    const leftIndex = dataImage[indexLeft];
    // const leftData = leftIndex;
    // leftData.id = leftIndex.id;
    // leftData.id = leftIndex.url_hinhanh;

    setLeftImage(leftIndex);
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
        className="profile_anhdaidien_round"
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
            initial={
              {
                // transform: "translateX(0px) scale(0.8)",
                // transform: "translateX(0px)",
                // boxShadow: "none",
              }
            }
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
              // transform: "translateX(0px)",
              transform: "scale(1)",
              //transform: "translateX(0px) scale(1)",
              // opacity: 0.7,
              // boxShadow: "none",
            }}
            whileInView={{
              transform: "scale(1)",
              zIndex: 10,
              opacity: 1,
              boxShadow: "0px 0px 10x 1px grey",
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
            initial={
              {
                // transform: "scale(0.8)",
                // boxShadow: "none",
              }
            }
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
