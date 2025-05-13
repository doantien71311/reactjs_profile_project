import { createContext, useEffect, useState, ReactNode, useRef } from "react";

import {
  ProfileDinhHuongType,
  ProfileHinhAnhType,
  ProfileHocVanType,
  ProfileKyNangType,
  ProfileQuaTrinhLamViecType,
  ProfileType,
} from "./ProfileType";
import { useParams } from "react-router-dom";

export type ProfileProps = { children: ReactNode };
export type ProfileContextProps = {
  isLoadingApi: boolean;
  // setIsLoadingApi: (value: boolean) => void;
  dataApi: ProfileType;
  // setDataApi: (value: ProfileType) => void;
};
export const ProfileContext = createContext<ProfileContextProps>({
  isLoadingApi: true,
  // setIsLoadingApi: () => {},
  dataApi: {},
  // setDataApi: () => {},
});
export const ProfileProvider = ({ children }: ProfileProps) => {
  const initialized = useRef(false);
  const [isUseLoadingApi, setIsUseLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<ProfileType>({});
  const { ma_nv } = useParams();

  //
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log(`ProfileProvider`);
      setTimeout(() => {
        const kn: ProfileKyNangType[] = [
          {
            ten_kynang: "C#, Winform, DevExpress, SQL Server",
            phantram: 90,
          },
          {
            ten_kynang: "Web Blazor, Web API .NET, Postmain",
            phantram: 80,
          },
          {
            ten_kynang: "ReactJS, TypeScript, HTML, CSS",
            phantram: 60,
          },
          {
            ten_kynang: "NodeJs, MySQL, GoogleDrive",
            phantram: 60,
          },
          {
            ten_kynang: "Flutter, Dart",
            phantram: 50,
          },

          {
            ten_kynang: "Làm clip hướng dẫn sử dụng",
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
        const hv: ProfileHocVanType[] = [
          {
            thoigian_daotao: "2011-2015",
            chuyen_nganh:
              "Hệ thống thông tin quản lý ứng dụng trong kinh doanh",
            bang_cap: "Đại học",
            ten_truong: "Trường đại học Tài chính-Markerting",
          },
        ];
        const ha: ProfileHinhAnhType[] = [
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1tqobxV2f7_dvEo_cKcWUgIsJB4XuB7BE&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1tqobxV2f7_dvEo_cKcWUgIsJB4XuB7BE&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1tqobxV2f7_dvEo_cKcWUgIsJB4XuB7BE&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb&sz=w1000",
          },
          {
            url_hinhanh:
              "https://drive.google.com/thumbnail?id=1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r&sz=w1000",
          },
        ];

        const data: ProfileType = {
          ha: ha,
          hv: hv,
          kn: kn,
          qtlv: qtlv,
          dh: dh,
          ma_nv: ma_nv,
          ten_nv: "BÙI ĐOÀN TIẾN",
          email: "mrtien71311@gmail.com",
          dienthoai: "0854266882",
          zalo: "0854266882",
          facebook: "0854266882",
          diachi_thuongtru:
            "10/6, Đường Số 9, Phường Hiệp Bình Chánh, Thủ Đức, Hồ Chí Minh",
          url_hinhanh:
            // "https://drive.google.com/thumbnail?id=1tqobxV2f7_dvEo_cKcWUgIsJB4XuB7BE&sz=w1000",
            "https://drive.google.com/thumbnail?id=1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb&sz=w1000",

          // "https://drive.google.com/thumbnail?id=1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r&sz=w1000",
          // "https://twl-hinhanh.theworldlink.vn/TheWorldLink/WebPortal/NhanVien/DaiDien/logo_twl.jpg",
          mota: `<h4>Xin cám ơn bạn đã ghé thăm trang web profile của tôi!&nbsp;</h4>
<p><img class="image_resized" style="aspect-ratio:3200/4800;width:17.07%;height:30%" src="https://images.pexels.com/photos/31980289/pexels-photo-31980289/free-photo-of-chim-en-cay-tren-m-t-ngoi-nha-chim-m-c-m-c-seneca-falls.jpeg" width="3200" height="4800"></p>
<p>Bằng cách xem thông tin của tôi là cách để chúng ta hiểu nhau nhiều hơn. Hãy dành chút thời gian để đọc một vài dòng miêu tả về tôi nhé!</p>
<p>&nbsp;</p>
<p>&nbsp;</p>`,
        };
        // console.log(data);
        setUseDataApi(data);
        setIsUseLoadingApi(false);
        // console.log(`ProfileProvider 500000`);
        // console.log(useData);
        // console.log(isUseLoadingApi);
        document
          .getElementsByClassName("profile")[0]
          .classList.remove("profile_skeleton_loading");
      }, 1000);
    }
  }, []);
  return (
    <ProfileContext.Provider
      value={{ isLoadingApi: isUseLoadingApi, dataApi: useDataApi }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
