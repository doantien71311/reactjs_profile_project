import { ImageDaiDien } from "./ImageDaiDien";
import { QuaTrinhLamViec } from "./QuaTrinhLamViec";
import { MoTa } from "./MoTa";
import { ThongTinCacNhan } from "./ThongTinCaNhan";
import { HocVan } from "./HocVan";
import { ProfileProvider } from "./ProfileContext";
import "./ProfileIndex.css";
import { DinhHuong } from "./DinhHuong";
import { NangLuc } from "./NangLuc";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Slogan } from "./Slogan";
gsap.registerPlugin(ScrollTrigger);

export const Profile = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    document.title = ".Net Developer of Mrtien71311";
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.setAttribute("link", "image/x-icon");
    link.setAttribute("rel", "shortcut icon");
    link.setAttribute(
      "href",
      "https://lh3.googleusercontent.com/d/1tqobxV2f7_dvEo_cKcWUgIsJB4XuB7BE=w100"
    );
    document.getElementsByTagName("head")[0].appendChild(link);
    initialized.current = false;
  }, []);
  return (
    <div className="profile profile_skeleton_loading">
      {/* <div className={classNameProfile}> */}
      <ProfileProvider>
        <Slogan></Slogan>
        <ImageDaiDien></ImageDaiDien>
        <DinhHuong></DinhHuong>
        <NangLuc></NangLuc>
        <QuaTrinhLamViec></QuaTrinhLamViec>
        <ThongTinCacNhan></ThongTinCacNhan>
        <HocVan></HocVan>
        <MoTa></MoTa>
      </ProfileProvider>
    </div>
  );
};
