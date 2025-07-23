import { createContext, useEffect, useState, ReactNode, useRef } from "react";
import { useParams } from "react-router-dom";
import { getRowData } from "../../../services/HttpServices";
import { ProfileNhanVienType } from "../../../model/ProfileNhanVienType";
import UrlApi from "../../../services/UrlApi";
import { useTranslation } from "react-i18next";

export type ProfileProps = { children: ReactNode };
export type ProfileContextProps = {
  isLoadingApi: boolean;
  // setIsLoadingApi: (value: boolean) => void;
  dataApi: ProfileNhanVienType;
  setDataApi: (value: ProfileNhanVienType) => void;
  //
  languageValue: string;
  setLanguageValue: (value: string) => void;
};
export const ProfileContext = createContext<ProfileContextProps>({
  isLoadingApi: true,
  // setIsLoadingApi: () => {},
  dataApi: {},
  setDataApi: () => {},
  //
  languageValue: "",
  setLanguageValue: () => {},
});
export const ProfileProvider = ({ children }: ProfileProps) => {
  const initialized = useRef(false);
  const [isUseLoadingApi, setIsUseLoadingApi] = useState<boolean>(true);
  const [languageValue, setLanguageValue] = useState<string>("vn");
  const [useDataApi, setUseDataApi] = useState<ProfileNhanVienType>({});
  const { ma_nv } = useParams();
  const { i18n } = useTranslation();

  function ChangeLanguage(value: string | undefined) {
    i18n.changeLanguage(value);
    if (value == "vn" || value == null || value == undefined) {
      const dinhhuong_vn = useDataApi.profile_nhanvien_dinhhuong?.map(
        (item) => {
          return { ...item, noidung_translate: item.noidung };
        }
      );
      const kynang_vn = useDataApi.profile_nhanvien_kynang?.map((item) => {
        return { ...item, ten_kynang_translate: item.ten_kynang };
      });
      const qtlv_vn = useDataApi.profile_nhanvien_quatrinhlamviec?.map(
        (item) => {
          return {
            ...item,
            thoigian_qtlv_translate: item.thoigian_qtlv,
            congty_qtlv_translate: item.congty_qtlv,
            vitri_qtlv_translate: item.vitri_qtlv,
            mota_qtlv_translate: item.mota_qtlv,
          };
        }
      );
      const hocvan_vn = useDataApi.profile_nhanvien_hocvan?.map((item) => {
        return {
          ...item,
          bangcap_hocvan_translate: item.bangcap_hocvan,
          thoigian_hocvan_translate: item.thoigian_hocvan,
          chuyennganh_hocvan_translate: item.chuyennganh_hocvan,
          tentruong_hocvan_translate: item.tentruong_hocvan,
        };
      });
      setUseDataApi({
        ...useDataApi,
        ten_nv_translate: useDataApi.ten_nv,
        email_translate: useDataApi.email,
        dienthoai_translate: useDataApi.dienthoai,
        diachi_thuongtru_translate: useDataApi.diachi_thuongtru,
        profile_nhanvien_dinhhuong: dinhhuong_vn,
        profile_nhanvien_kynang: kynang_vn,
        profile_nhanvien_quatrinhlamviec: qtlv_vn,
        profile_nhanvien_hocvan: hocvan_vn,
        mota_translate: useDataApi.mota,
      });
    } else if (value == "en") {
      const dinhhuong_en = useDataApi.profile_nhanvien_dinhhuong?.map(
        (item) => {
          return { ...item, noidung_translate: item.noidung_en };
        }
      );
      const kynang_en = useDataApi.profile_nhanvien_kynang?.map((item) => {
        return { ...item, ten_kynang_translate: item.ten_kynang_en };
      });
      const qtlv_en = useDataApi.profile_nhanvien_quatrinhlamviec?.map(
        (item) => {
          return {
            ...item,
            thoigian_qtlv_translate: item.thoigian_qtlv_en,
            congty_qtlv_translate: item.congty_qtlv_en,
            vitri_qtlv_translate: item.vitri_qtlv_en,
            mota_qtlv_translate: item.mota_qtlv_en,
          };
        }
      );
      const hocvan_en = useDataApi.profile_nhanvien_hocvan?.map((item) => {
        return {
          ...item,
          bangcap_hocvan_translate: item.bangcap_hocvan_en,
          chuyennganh_hocvan_translate: item.chuyennganh_hocvan_en,
          tentruong_hocvan_translate: item.tentruong_hocvan_en,
        };
      });
      setUseDataApi({
        ...useDataApi,
        ten_nv_translate: useDataApi.ten_nv_en,
        email_translate: useDataApi.email_en,
        dienthoai_translate: useDataApi.dienthoai_en,
        diachi_thuongtru_translate: useDataApi.diachi_thuongtru_en,
        profile_nhanvien_dinhhuong: dinhhuong_en,
        profile_nhanvien_kynang: kynang_en,
        profile_nhanvien_quatrinhlamviec: qtlv_en,
        profile_nhanvien_hocvan: hocvan_en,
        mota_translate: useDataApi.mota_en,
      });
    }
  }

  async function fetchData() {
    console.log(ma_nv);
    setIsUseLoadingApi(true);
    // You can await here
    const data = await getRowData<ProfileNhanVienType>(
      `${UrlApi.api_profile_nhan_vien_lay_ds}?soid=b37f37db-1b72-4177-b1f6-7429ff2c6fd6&ma_nv=ADMIN`
    );
    console.log(data);
    const dinhhuong_vn = data.profile_nhanvien_dinhhuong?.map((item) => {
      return { ...item, noidung_translate: item.noidung };
    });
    setUseDataApi({
      ...data,
      ten_nv_translate: data.ten_nv,
      email_translate: data.email,
      dienthoai_translate: data.dienthoai,
      diachi_thuongtru_translate: data.diachi_thuongtru,
      profile_nhanvien_dinhhuong: dinhhuong_vn,
    });
    setIsUseLoadingApi(false);
    document
      .getElementsByClassName("profile")[0]
      .classList.remove("profile_skeleton_loading");
  }
  //
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    console.log(`ProfileNhanVienProvider`);
    fetchData();
    return () => {
      console.log("Cách 2 ProfileNhanVienType: useEffect - count - cleanup");
    };

    // setTimeout(() => {}, 0);
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    if (isUseLoadingApi) return;
    ChangeLanguage(languageValue);
    return () => {
      // console.log("Cách 2 ProfileNhanVienType: useEffect - count - cleanup");
    };

    // setTimeout(() => {}, 0);
  }, [languageValue, isUseLoadingApi]);

  return (
    <ProfileContext.Provider
      value={{
        isLoadingApi: isUseLoadingApi,
        dataApi: useDataApi,
        setDataApi: setUseDataApi,
        //
        languageValue: languageValue,
        setLanguageValue: setLanguageValue,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
