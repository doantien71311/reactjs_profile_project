import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  ProfileDinhHuongType,
  ProfileHinhAnhType,
  ProfileHocVanType,
  ProfileKyNangType,
  ProfileNhanVienType,
  ProfileQuaTrinhLamViecType,
} from "../../../../model/ProfileNhanVienType";
import UrlApi from "../../../../services/UrlApi";
import { getRowData, postRowData } from "../../../../services/HttpServices";
import // ResponseApiType,
// ResponseApiTypeDefault,
"../../../../model/ResponseApiType";
import { BEContext, BEContextProps } from "../../BEContext";
import CommonPostStatus from "../../common_ui/CommonPostStatus";

export type ProfileBEEditProps = { children: ReactNode };
export type ProfileBEEditContextProps = {
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: ProfileNhanVienType;
  setDataApi: (value: ProfileNhanVienType) => void;
  fetchDataApi: () => void;
  //
  postDataApi: () => void;
  // isUseUpdatingApi: boolean;
  // useUpdateApi: ResponseApiType;
  //
  dataApiTenNv: string;
  setDataApiTenNv: (value: string) => void;
  //
  dataApiTenNvEn: string;
  setDataApiTenNvEn: (value: string) => void;
  //
  dataApiDienThoai: string;
  setDataApiDienThoai: (value: string) => void;
  //
  dataApiDienThoaiEn: string;
  setDataApiDienThoaiEn: (value: string) => void;
  //
  dataApiEmail: string;
  setDataApiEmail: (value: string) => void;
  //
  dataApiEmailEn: string;
  setDataApiEmailEn: (value: string) => void;
  //
  dataApiThuongTru: string;
  setDataApiThuongTru: (value: string) => void;
  //
  dataApiThuongTruEn: string;
  setDataApiThuongTruEn: (value: string) => void;
  //
  dataApiMoTa: string;
  setDataApiMoTa: (value: string) => void;
  //
  dataApiMoTaEN: string;
  setDataApiMoTaEN: (value: string) => void;
  //
  dataApiQTLV: ProfileQuaTrinhLamViecType[];
  setDataApiQTLV: (value: ProfileQuaTrinhLamViecType[]) => void;
  //
  dataApiDinhHuong: ProfileDinhHuongType[];
  setDataApiDinhHuong: (value: ProfileDinhHuongType[]) => void;
  //
  dataApiKyNang: ProfileKyNangType[];
  setDataApiKyNang: (value: ProfileKyNangType[]) => void;
  //
  dataApiHocVan: ProfileHocVanType[];
  setDataApiHocVan: (value: ProfileHocVanType[]) => void;
  //
  dataApiHinhAnh: ProfileHinhAnhType[];
  setDataApiHinhAnh: (value: ProfileHinhAnhType[]) => void;
};

export const ProfileBEEditContext = createContext<ProfileBEEditContextProps>({
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: {},
  setDataApi: () => {},
  fetchDataApi: () => {},
  //
  postDataApi: () => {},
  // isUseUpdatingApi: false,
  // useUpdateApi: ResponseApiTypeDefault,
  //
  dataApiTenNv: "",
  setDataApiTenNv: () => {},
  //
  dataApiTenNvEn: "",
  setDataApiTenNvEn: () => {},
  //
  dataApiDienThoai: "",
  setDataApiDienThoai: () => {},
  //
  dataApiDienThoaiEn: "",
  setDataApiDienThoaiEn: () => {},
  //
  dataApiEmail: "",
  setDataApiEmail: () => {},
  //
  dataApiEmailEn: "",
  setDataApiEmailEn: () => {},
  //
  dataApiThuongTru: "",
  setDataApiThuongTru: () => {},
  //
  dataApiThuongTruEn: "",
  setDataApiThuongTruEn: () => {},
  //
  dataApiMoTa: "",
  setDataApiMoTa: () => {},
  //
  dataApiMoTaEN: "",
  setDataApiMoTaEN: () => {},
  //
  dataApiQTLV: [],
  setDataApiQTLV: () => {},
  //
  dataApiDinhHuong: [],
  setDataApiDinhHuong: () => {},
  //
  dataApiKyNang: [],
  setDataApiKyNang: () => {},
  //
  dataApiHocVan: [],
  setDataApiHocVan: () => {},
  //
  dataApiHinhAnh: [],
  setDataApiHinhAnh: () => {},
});
//
export const ProfileBEEditProvider = ({ children }: ProfileBEEditProps) => {
  const {
    setIsCommonLoadingApi,
    setCommonPostingApi,
    setResponseApiTypeCommon,
  } = useContext<BEContextProps>(BEContext);
  //
  const initialized = useRef(false);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  // const [isUseUpdatingApi, setUseIsUpdatingApi] = useState<boolean>(false);
  // const [useUpdateApi, setUseUpdateApi] = useState<ResponseApiType>(
  //   ResponseApiTypeDefault
  // );
  const [useDataApi, setUseDataApi] = useState<ProfileNhanVienType>({});
  const [dataApiTenNv, setDataApiTenNv] = useState("");
  const [dataApiTenNvEn, setDataApiTenNvEn] = useState("");
  const [dataApiDienThoai, setDataApiDienThoai] = useState("");
  const [dataApiDienThoaiEn, setDataApiDienThoaiEn] = useState("");
  const [dataApiEmail, setDataApiEmail] = useState("");
  const [dataApiEmailEn, setDataApiEmailEn] = useState("");
  const [dataApiThuongTru, setDataApiThuongTru] = useState("");
  const [dataApiThuongTruEn, setDataApiThuongTruEn] = useState("");
  const [dataApiMoTa, setDataApiMoTa] = useState("");
  const [dataApiMoTaEN, setDataApiMoTaEN] = useState("");
  const [dataApiQTLV, setDataApiQTLV] = useState<ProfileQuaTrinhLamViecType[]>(
    []
  );
  const [dataApiDinhHuong, setDataApiDinhHuong] = useState<
    ProfileDinhHuongType[]
  >([]);
  const [dataApiKyNang, setDataApiKyNang] = useState<ProfileKyNangType[]>([]);
  const [dataApiHocVan, setDataApiHocVan] = useState<ProfileHocVanType[]>([]);
  const [dataApiHinhAnh, setDataApiHinhAnh] = useState<ProfileHinhAnhType[]>(
    []
  );

  //#region cách hàm thao tác
  async function fetchData() {
    setUseIsLoadingApi(true);
    // // You can await here
    const data = await getRowData<ProfileNhanVienType>(
      `${UrlApi.api_profile_nhan_vien_lay_ds}?soid=b37f37db-1b72-4177-b1f6-7429ff2c6fd6&ma_nv=ADMIN`
    );
    // console.log("Cách 2 ProfileBEEditProvider: api_profile_nhan_vien_lay_ds");
    // // ...

    // const data = {};
    console.log(data);
    //
    setDataApiTenNv(data.ten_nv ?? "");
    setDataApiTenNvEn(data.ten_nv_en ?? "");
    setDataApiDienThoai(data.dienthoai ?? "");
    setDataApiDienThoaiEn(data.dienthoai_en ?? "");
    setDataApiEmail(data.email ?? "");
    setDataApiEmailEn(data.email_en ?? "");
    setDataApiThuongTru(data.diachi_thuongtru ?? "");
    setDataApiThuongTruEn(data.diachi_thuongtru_en ?? "");
    setDataApiMoTa(data.mota ?? "");
    setDataApiMoTaEN(data.mota_en ?? "");
    setDataApiQTLV(data.profile_nhanvien_quatrinhlamviec ?? []);
    setDataApiDinhHuong(data.profile_nhanvien_dinhhuong ?? []);
    setDataApiKyNang(data.profile_nhanvien_kynang ?? []);
    setDataApiHocVan(data.profile_nhanvien_hocvan ?? []);
    setDataApiHinhAnh(data.profile_nhanvien_hinhanh ?? []);
    setUseDataApi(data);
    setUseIsLoadingApi(false);
  }

  async function updateData() {
    // setUseIsUpdatingApi(true);
    setCommonPostingApi(CommonPostStatus.saving);
    //
    const postDataApi = {
      ...useDataApi,
      ten_nv: dataApiTenNv,
      ten_nv_en: dataApiTenNvEn,
      email: dataApiEmail,
      email_en: dataApiEmailEn,
      dienthoai: dataApiDienThoai,
      dienthoai_en: dataApiDienThoaiEn,
      diachi_thuongtru: dataApiThuongTru,
      diachi_thuongtru_en: dataApiThuongTruEn,
      profile_nhanvien_quatrinhlamviec: dataApiQTLV,
      profile_nhanvien_dinhhuong: dataApiDinhHuong,
      profile_nhanvien_kynang: dataApiKyNang,
      profile_nhanvien_hocvan: dataApiHocVan,
      profile_nhanvien_hinhanh: dataApiHinhAnh,
    };
    console.log(postDataApi);
    // You can await here
    const data = await postRowData(
      // `${UrlApi.api_profile_nhan_vien_cap_nhat}?ma_nv=ADMIN&ma_nsd=ADMIN`,
      `${UrlApi.api_profile_nhan_vien_cap_nhat}`,
      postDataApi
    );
    console.log("profile nhân viên updateData:");
    // console.log(data);
    // ...
    // setUseUpdateApi(data);
    setResponseApiTypeCommon(data);
    setCommonPostingApi(CommonPostStatus.saved);
  }
  //#endregion cách hàm thao tác

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchData();

    return () => {
      console.log("Cách 2 ProfileBEEditProvider: useEffect - count - cleanup");
    };
  }, []);

  useEffect(() => {
    setIsCommonLoadingApi(isUseLoadingApi);
    return () => {
      console.log(
        "ProfileBEEditProvider: useEffect setIsCommonLoadingApi - count - cleanup"
      );
    };
  }, [isUseLoadingApi, setIsCommonLoadingApi]);

  return (
    <ProfileBEEditContext.Provider
      value={{
        isLoadingApi: isUseLoadingApi,
        setIsLoadingApi: setUseIsLoadingApi,
        dataApi: useDataApi,
        setDataApi: setUseDataApi,
        fetchDataApi: fetchData,
        //
        postDataApi: updateData,
        // isUseUpdatingApi: isUseUpdatingApi,
        // useUpdateApi: useUpdateApi,
        //
        dataApiTenNv: dataApiTenNv,
        setDataApiTenNv: setDataApiTenNv,
        //
        dataApiTenNvEn: dataApiTenNvEn,
        setDataApiTenNvEn: setDataApiTenNvEn,
        //
        dataApiDienThoai: dataApiDienThoai,
        setDataApiDienThoai: setDataApiDienThoai,
        //
        dataApiDienThoaiEn: dataApiDienThoaiEn,
        setDataApiDienThoaiEn: setDataApiDienThoaiEn,
        //
        dataApiEmail: dataApiEmail,
        setDataApiEmail: setDataApiEmail,
        //
        dataApiEmailEn: dataApiEmailEn,
        setDataApiEmailEn: setDataApiEmailEn,
        //
        dataApiThuongTru: dataApiThuongTru,
        setDataApiThuongTru: setDataApiThuongTru,
        //
        dataApiThuongTruEn: dataApiThuongTruEn,
        setDataApiThuongTruEn: setDataApiThuongTruEn,
        //
        dataApiMoTa: dataApiMoTa,
        setDataApiMoTa: setDataApiMoTa,
        //
        dataApiMoTaEN: dataApiMoTaEN,
        setDataApiMoTaEN: setDataApiMoTaEN,
        //
        dataApiQTLV: dataApiQTLV,
        setDataApiQTLV: setDataApiQTLV,
        //
        dataApiDinhHuong: dataApiDinhHuong,
        setDataApiDinhHuong: setDataApiDinhHuong,
        //
        dataApiKyNang: dataApiKyNang,
        setDataApiKyNang: setDataApiKyNang,
        //
        dataApiHocVan: dataApiHocVan,
        setDataApiHocVan: setDataApiHocVan,
        //
        dataApiHinhAnh: dataApiHinhAnh,
        setDataApiHinhAnh: setDataApiHinhAnh,
      }}
    >
      {children}
    </ProfileBEEditContext.Provider>
  );
};
