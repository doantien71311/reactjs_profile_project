import { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  // useTransform,
} from "motion/react";

export const ImageDaiDien = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;
  const isLoadingApi =
    useContext<ProfileContextProps>(ProfileContext).isLoadingApi;

  const initialized = useRef(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  //

  //
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    // layoutEffect: false,
    container: imageContainerRef,
    // offset: ["start end", "end start"],
    offset: ["start start", "end end"],
  });
  // const { scrollY } = useScroll();
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   console.log("Page scroll: ", latest);
  // });
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    console.log("ImageDaiDien scrollXProgress: ", latest);
  });
  // const x = useTransform(scrollXProgress, [0, 1], [0, 10000]);
  // console.log(x);

  const rootFontSize =
    parseFloat(window.getComputedStyle(document.documentElement).fontSize) * 10;
  if (!initialized.current) {
    initialized.current = true;
    // console.log(useData.url_hinhanh);
  }
  // const getMidIndex = () => {
  //   return (useData.profile_nhanvien_hinhanh ?? []).length / 2;
  // };

  useEffect(() => {
    if (!isLoadingApi) {
      const midIndex = Math.round(
        (useData.profile_nhanvien_hinhanh ?? []).length / 2
      );

      setTimeout(() => {
        if (imageContainerRef != null && imageContainerRef.current) {
          // imageContainerRef.current.scrollLeft = calScroll(midIndex);
          onHandImageClick(midIndex);
        }
      }, 2000);
    }
  }, [isLoadingApi, imageContainerRef]);

  //#region các private funtion
  const getImageBottomBorder = (newIndex: number) => {
    let result: string = "2px solid transparent";
    if (newIndex === currentIndex)
      // result = "2px solid var(--primary-color)";
      result = "2px solid var(--primary-second-right-color)";
    // console.log(result);
    return result;
  };
  const getImageBottomBorderRadius = (newIndex: number) => {
    let result: string = "0";
    if (newIndex === currentIndex) result = "5px";
    // console.log(result);
    return result;
  };
  const getScale = (newIndex: number) => {
    const valueIndex = Math.abs(newIndex - currentIndex);
    if (valueIndex == 0) return 1.2;
    if (valueIndex == 1) return 0.8;
    return 0.6;
  };
  const calScroll = (newIndex: number) => {
    if (imageContainerRef.current == null) return 0;
    // const pexScroll: number = newIndex - currentIndex;
    const spaceScroll: number =
      imageContainerRef.current.scrollWidth -
      imageContainerRef.current.clientWidth;
    const itemScroll =
      spaceScroll / (useData.profile_nhanvien_hinhanh ?? []).length;
    //console.log(pexScroll);
    // const curentScroll = imageContainerRef.current.scrollLeft;
    console.log("itemScroll:");
    console.log(itemScroll);
    // const addScroll = newIndex * 10;
    const addScroll = newIndex * 10;
    let miusScroll = 0;
    if (newIndex > 3) {
      miusScroll = 160 * 2 + 50;
    }
    let valueScroll = 160 * newIndex + addScroll - miusScroll;
    if (newIndex < 3) valueScroll = 0;
    console.log("rootFontSize:");
    console.log(rootFontSize);
    console.log("valueScroll:");
    console.log(valueScroll);

    return valueScroll;
  };

  const onHandImageClick = (newIndex: number) => {
    if (imageContainerRef.current == null) return;

    // imageContainerRef.current.scrollLeft += 160;
    imageContainerRef.current.scrollLeft = calScroll(newIndex);
    // setTimeout(() => {
    //   if (imageContainerRef.current == null) return;
    //   imageContainerRef.current.scrollLeft =
    //     imageContainerRef.current.scrollWidth / 2 -
    //     imageContainerRef.current.clientWidth / 2;
    // }, 1000);

    //
    // imageContainerRef.current.scrollLeft -= 250;
    // imageContainerRef.current.scrollLeft += 160;
    // imageContainerRef.current.scrollLeft =
    //   // imageContainerRef.current.clientWidth;
    //   // imageContainerRef.current.scrollWidth;
    //   0;

    // if (imageContainerRef.current.scrollLeft == 0) {
    //   imageContainerRef.current.scrollLeft =
    //     imageContainerRef.current.scrollWidth;
    //   return;
    // }

    // if (imageContainerRef.current.scrollLeft > 0) {
    //   imageContainerRef.current.scrollLeft = 0;
    //   return;
    // }

    setCurrentIndex(newIndex);
  };

  //#endregion các funtion

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
        <motion.div ref={imageContainerRef} className="profile_anhdaidien_top">
          {useData.profile_nhanvien_hinhanh?.map((item, index) => (
            <motion.img
              key={item.id}
              initial={{ scale: 1 }}
              whileInView={{
                scale: getScale(index),
                // scrollLeft: calScroll(index),
                transition: {
                  // delay: 0.3,
                  duration: 0.7,
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
              style={{
                border: `${getImageBottomBorder(index)}`,
                borderRadius: `${getImageBottomBorderRadius(index)}`,
              }}
              role="button"
              onClick={() => onHandImageClick(index)}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};
