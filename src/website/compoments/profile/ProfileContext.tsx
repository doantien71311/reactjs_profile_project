import { createContext, useEffect, useState, ReactNode, useRef } from "react";

import { ProfileDinhHuongType, ProfileType } from "./ProfileType";
import { useParams } from "react-router-dom";

export type ProfileProps = { children: ReactNode };
// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<ProfileType>({});
export const ProfileProvider = ({ children }: ProfileProps) => {
  //   const [isLoading, setLoading] = useState<boolean>(true);
  const initialized = useRef(false);
  const [useData, setUseData] = useState<ProfileType>({});
  const { ma_nv } = useParams();
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => {
        const dh: ProfileDinhHuongType[] = [
          {
            noidung:
              "Thay đổi và nâng cao kỹ năng lập trình cũng như tìm kiếm công việc",
          },
          {
            noidung:
              "Tìm hiểu và phát triển sản phẩm phần mềm trên nền tảng web ",
          },
          {
            noidung:
              "Tìm hiểu và phát triển sản phẩm phần mềm trên nền tảng app moblie ",
          },
        ];
        const data: ProfileType = {
          dh: dh,
          ma_nv: ma_nv,
          ten_nv: "NGUYỄN VĂN NAM",
          email: "nguyenvannam123@gmail.com",
          dienthoai: "099887435",
          zalo: "099887435",
          facebook: "099887435",
          diachi_thuongtru:
            "Số 123, Đường Nguyễn Văn Nam, Phường Hiệp Bỉnh Chánh, Thủ Đức, Hồ Chí Minh",
          url_hinhanh:
            // "https://drive.google.com/thumbnail?id=1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r",
            "https://drive.google.com/thumbnail?id=1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r&sz=w1000",
          // "https://drive.google.com/thumbnail?id=10hhX4pIZr0NhuusN4eHvf4ghah5d6yAG",
          // "https://drive.google.com/file/d/1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r/view",
          // "https://drive.google.com/file/d/1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r/view?usp=drive_link",
          // "https://twl-hinhanh.theworldlink.vn/TheWorldLink/WebPortal/NhanVien/DaiDien/logo_twl.jpg",
        };
        console.log(data);
        setUseData(data);
      }, 1000);
    }
  }, []);
  return (
    <ProfileContext.Provider value={useData}>
      {children}
    </ProfileContext.Provider>
  );
};
