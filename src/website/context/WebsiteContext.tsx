// import { createContext, useEffect, useState, ReactNode, useRef } from "react";
// import { ProfileType } from "./ProfileType";
// import { useParams } from "react-router-dom";

// export type ProfileProps = { children: ReactNode };
// // eslint-disable-next-line react-refresh/only-export-components
// export const ProfileContext = createContext<ProfileType>({});
// export const ProfileProvider = ({ children }: ProfileProps) => {
//   //   const [isLoading, setLoading] = useState<boolean>(true);
//   const initialized = useRef(false);
//   const [useData, setUseData] = useState<ProfileType>({});
//   const { ma_nv } = useParams();
//   useEffect(() => {
//     if (!initialized.current) {
//       initialized.current = true;
//       setTimeout(() => {
//         const data: ProfileType = {
//           ma_nv: ma_nv,
//           ten_nv: "NGUYỄN VĂN NAM",
//           email: "nguyenvannam123@gmail.com",
//           dienthoai: "099887435",
//           zalo: "099887435",
//           facebook: "099887435",
//           diachi_thuongtru:
//             "Số 123, Đường Nguyễn Văn Nam, Phường Hiệp Bỉnh Chánh, Thủ Đức, Hồ Chí Minh",
//           url_hinhanh:
//             "https://twl-hinhanh.theworldlink.vn/TheWorldLink/WebPortal/NhanVien/DaiDien/logo_twl.jpg",
//         };
//         console.log(data);
//         setUseData(data);
//       }, 1000);
//     }
//   }, []);
//   return (
//     <ProfileContext.Provider value={useData}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };
