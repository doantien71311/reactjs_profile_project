import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProfileNhanVienType } from "../../../../../model/ProfileNhanVienType";
import { BEContext, BEContextProps } from "../../../BEContext";
import { getRowData, postRowData } from "../../../../../services/HttpServices";
import UrlApi from "../../../../../services/UrlApi";
import CommonPostStatus from "../../../common_ui/CommonPostStatus";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import { v4 as uuidv4 } from "uuid";

//export type ProfileBEEditProps = { children: ReactNode };
export type QTLVEditContextProps = {
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: ProfileNhanVienType;
  setDataApi: (value: ProfileNhanVienType) => void;
  fetchDataApi: () => void;
  //
  postDataApi: () => void;
  //
  id_qtlv: string;
  setQLTVID: (value: string) => void;
  //
  thoigian_qtlv: string;
  setThoigian_qtlv: (value: string) => void;
  //
  thoigian_qtlv_en: string;
  setThoigian_qtlv_en: (value: string) => void;
  //
  congty_qtlv: string;
  setCongty_qtlv: (value: string) => void;
  //
  congty_qtlv_en: string;
  setCongty_qtlv_en: (value: string) => void;
  //
  vitri_qtlv: string;
  setVitri_qtlv: (value: string) => void;
  //
  vitri_qtlv_en: string;
  setVitri_qtlv_en: (value: string) => void;
  //
  dataApiQTLVMoTa: string;
  setDataApiQTLVMoTa: (value: string) => void;
  reactQuillRefQTLVVN: RefObject<ReactQuill | null> | null;
  //
  dataApiQTLVMoTaEN: string;
  setDataApiQTLVMoTaEN: (value: string) => void;
  reactQuillRefQTLVEN: RefObject<ReactQuill | null> | null;
};

export const QTLVEditContext = createContext<QTLVEditContextProps>({
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: {},
  setDataApi: () => {},
  fetchDataApi: () => {},
  //
  postDataApi: () => {},
  //
  id_qtlv: "",
  setQLTVID: () => {},
  //
  thoigian_qtlv: "",
  setThoigian_qtlv: () => {},
  //
  thoigian_qtlv_en: "",
  setThoigian_qtlv_en: () => {},
  //
  congty_qtlv: "",
  setCongty_qtlv: () => {},
  //
  congty_qtlv_en: "",
  setCongty_qtlv_en: () => {},
  //
  vitri_qtlv: "",
  setVitri_qtlv: () => {},
  //
  vitri_qtlv_en: "",
  setVitri_qtlv_en: () => {},
  //
  dataApiQTLVMoTa: "",
  setDataApiQTLVMoTa: () => {},
  reactQuillRefQTLVVN: null,
  //
  dataApiQTLVMoTaEN: "",
  setDataApiQTLVMoTaEN: () => {},
  reactQuillRefQTLVEN: null,
});
//
export const QTLVEditProvider = ({ children }: { children: ReactNode }) => {
  const {
    setIsCommonLoadingApi,
    setCommonPostingApi,
    setResponseApiTypeCommon,
  } = useContext<BEContextProps>(BEContext);
  //
  const { keyString, isAddNew } = useParams();
  const reactQuillRefQTLVVN = useRef<ReactQuill>(null);
  const reactQuillRefQTLVEN = useRef<ReactQuill>(null);
  //
  const initialized = useRef(false);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [dataApi, setUseDataApi] = useState<ProfileNhanVienType>({});
  //
  const [id_qtlv, setQLTVID] = useState("");
  //
  const [thoigian_qtlv, setThoigian_qtlv] = useState("");
  const [thoigian_qtlv_en, setThoigian_qtlv_en] = useState("");
  //
  const [congty_qtlv, setCongty_qtlv] = useState("");
  //
  const [congty_qtlv_en, setCongty_qtlv_en] = useState("");
  //
  const [vitri_qtlv, setVitri_qtlv] = useState("");
  //
  const [vitri_qtlv_en, setVitri_qtlv_en] = useState("");
  //
  const [dataApiQTLVMoTa, setDataApiQTLVMoTa] = useState("");
  const [dataApiQTLVMoTaEN, setDataApiQTLVMoTaEN] = useState("");

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
    const qltv = data.profile_nhanvien_quatrinhlamviec;
    if (!qltv) return;
    //
    let pKeyString = keyString;
    if (isAddNew?.toUpperCase() == "TRUE") {
      pKeyString = uuidv4();
      data.profile_nhanvien_quatrinhlamviec?.push({
        id: pKeyString,
      });
    }
    const row =
      data.profile_nhanvien_quatrinhlamviec?.find((f) => f.id === pKeyString) ??
      {};
    setQLTVID(row.id ?? "");
    setThoigian_qtlv(row.thoigian_qtlv ?? "");
    setThoigian_qtlv_en(row.thoigian_qtlv_en ?? "");
    setCongty_qtlv(row.congty_qtlv ?? "");
    setCongty_qtlv_en(row.congty_qtlv_en ?? "");
    setVitri_qtlv(row.vitri_qtlv ?? "");
    setVitri_qtlv_en(row.vitri_qtlv_en ?? "");
    setDataApiQTLVMoTa(row.mota_qtlv ?? "");
    setDataApiQTLVMoTaEN(row.mota_qtlv_en ?? "");
    //
    setUseDataApi(data);
    //
    setUseIsLoadingApi(false);
  }

  async function updateData() {
    setCommonPostingApi(CommonPostStatus.saving);

    // console.log(reactQuillRefQTLVVN.current?.getEditor());
    // console.log(reactQuillRefQTLVVN.current?.value);
    // console.log(reactQuillRefQTLVEN.current?.value);

    let mota_qtlv = "";
    if (reactQuillRefQTLVVN.current) {
      mota_qtlv = reactQuillRefQTLVVN.current?.value.toString();
    }
    let mota_qtlv_en = "";
    if (reactQuillRefQTLVEN.current) {
      mota_qtlv_en = reactQuillRefQTLVEN.current?.value.toString();
    }

    const dataPostApi = { ...dataApi };
    if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
    dataPostApi.profile_nhanvien_quatrinhlamviec?.map((row) => {
      if (row.id == id_qtlv) {
        row.mota_qtlv = mota_qtlv === "" ? row.mota_qtlv : mota_qtlv;
        row.mota_qtlv_en =
          mota_qtlv_en === "" ? row.mota_qtlv_en : mota_qtlv_en;
      }
    });
    console.log(dataPostApi);
    // You can await here
    const data = await postRowData(
      // `${UrlApi.api_profile_nhan_vien_cap_nhat}?ma_nv=ADMIN&ma_nsd=ADMIN`,
      `${UrlApi.api_profile_nhan_vien_cap_nhat}`,
      // dataApi
      dataPostApi
    );
    //
    setUseDataApi(dataPostApi);
    setDataApiQTLVMoTa(mota_qtlv);
    setDataApiQTLVMoTaEN(mota_qtlv_en);
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
    <QTLVEditContext.Provider
      value={{
        isLoadingApi: isUseLoadingApi,
        setIsLoadingApi: setUseIsLoadingApi,
        dataApi: dataApi,
        setDataApi: setUseDataApi,
        fetchDataApi: fetchData,
        //
        postDataApi: updateData,
        //
        id_qtlv: id_qtlv,
        setQLTVID: setQLTVID,
        //
        thoigian_qtlv: thoigian_qtlv,
        setThoigian_qtlv: setThoigian_qtlv,
        //
        thoigian_qtlv_en: thoigian_qtlv_en,
        setThoigian_qtlv_en: setThoigian_qtlv_en,
        //
        congty_qtlv: congty_qtlv,
        setCongty_qtlv: setCongty_qtlv,
        //
        congty_qtlv_en: congty_qtlv_en,
        setCongty_qtlv_en: setCongty_qtlv_en,
        //
        vitri_qtlv: vitri_qtlv,
        setVitri_qtlv: setVitri_qtlv,
        //
        vitri_qtlv_en: vitri_qtlv_en,
        setVitri_qtlv_en: setVitri_qtlv_en,
        //
        dataApiQTLVMoTa: dataApiQTLVMoTa,
        setDataApiQTLVMoTa: setDataApiQTLVMoTa,
        reactQuillRefQTLVVN: reactQuillRefQTLVVN,
        //
        dataApiQTLVMoTaEN: dataApiQTLVMoTaEN,
        setDataApiQTLVMoTaEN: setDataApiQTLVMoTaEN,
        reactQuillRefQTLVEN: reactQuillRefQTLVEN,
      }}
    >
      {children}
    </QTLVEditContext.Provider>
  );
};
