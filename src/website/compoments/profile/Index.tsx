import { ImageDaiDien } from "./ImageDaiDien";
import { QuaTrinhLamViec } from "./QuaTrinhLamViec";
import { MoTa } from "./MoTa";
import { ThongTinCacNhan } from "./ThongTinCaNhan";
import { HocVan } from "./HocVan";
import { ProfileProvider } from "./ProfileContext";
import "./ProfileIndex.css";
import { DinhHuong } from "./DinhHuong";
import { NangLuc } from "./NangLuc";



export const Profile = () => {
  return (
    <div className="profile">
      <ProfileProvider>
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
