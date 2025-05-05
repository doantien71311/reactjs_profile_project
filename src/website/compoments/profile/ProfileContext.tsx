import { createContext, useEffect, useState, ReactNode, useRef } from "react";

import {
  ProfileDinhHuongType,
  ProfileKyNangType,
  ProfileQuaTrinhLamViecType,
  ProfileType,
} from "./ProfileType";
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
        const kn: ProfileKyNangType[] = [
          {
            ten_kynang: "C#, Winform, DevExpress",
            phantram: 90,
          },
          {
            ten_kynang: "SQL Server",
            phantram: 70,
          },
          {
            ten_kynang: "XML, JSON",
            phantram: 70,
          },
          {
            ten_kynang: "Web API .NET",
            phantram: 80,
          },
          {
            ten_kynang: "Web Blazor, DevExpress",
            phantram: 90,
          },
          {
            ten_kynang: "Adobe Premiere",
            phantram: 50,
          },
        ];
        const qtlv: ProfileQuaTrinhLamViecType[] = [
          {
            thoigian: "08/2023 - 01/2025",
            chucvu: "Cộng tác viên phát triển phần mềm .NET",
            cty: "CÔNG TY TNHH THE WORLDLINK VIỆT NAM",
            mota:
              "<p>-Golive chức năng bán bảo hiểm xe máy, ô tô: kết nối api BSH,  ACB one connect.</p>" +
              "<p>-Phát triển Web portal (api, blazor, devexpress): quản lý nhân viên, tính thu nhập thành viên, khảo sát thông tin ...</p>" +
              "<p>-Tham gia app kết nối giao thương bằng Flutter-Dart.</p>" +
              "<p>-Làm các video clip hướng dẫn sử dụng.</p>",
          },
          {
            thoigian: "06/2022 - 07/2023",
            chucvu: "Nhân viên lập trình C#, Winform",
            cty: "CÔNG TY CỔ PHẦN THÀNH CÔNG SOFTWARE",
            mota: "<p>-Tham gia dự án phần mềm mini ERP gia công sắt thép (kho, sản xuất).</p>",
          },
          {
            thoigian: "02/2021 - 05/2022",
            chucvu: "Nhân viên Lập trình C#, Winform, Web Blazor, Web Api",
            cty: "CÔNG TY TNHH GIẢI PHÁP DNCS",
            mota: "<p>-Tham gia dự án quản lý nhà hàng: phát triển web api kết nối sql server, code back end.</p><p>-Tham gia dự án phần mềm dịch vụ thuế:  Kết nối hóa đơn điện tử Easyinvoice; Import file hóa đơn xml vào phần mềm.</p> <p>-Bảo trì, chỉnh sửa lỗi trên phần mềm.</p>",
          },
          {
            thoigian: "08/2017 - 01/2021",
            chucvu: "Chuyên viên lập trình C#, Winform, Devexpress, Sql server",
            cty: "CÔNG TY CỔ PHẦN GIẢI PHÁP PHẦN MỀM  ENTERSOFT",
            mota: "<p>-Tham gia dự án phần mềm ERP trên nền tảng .Net framework (chủ yếu về phân hệ kho, sản xuất) cho khách hàng trong các lĩnh vục:  In bao bì; Gia công thuốc bảo vệ thực vật; Dược thú y.</p><p>-Làm việc qua sky với khách hàng để hỗ trợ và chỉnh sửa phần mềm</p><p>-Phối hợp với quản lý để chỉnh sửa và phát triển chức năng phần mềm</p>",
          },
        ];
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
          kn: kn,
          qtlv: qtlv,
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
