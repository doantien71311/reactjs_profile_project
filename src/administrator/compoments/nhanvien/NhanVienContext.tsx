import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useContext,
} from "react";
import { NhanVienType, NhanVienTypeDefault } from "../../../model/NhanVienType";
import UrlApi from "../../../services/UrlApi";
import { getArrayDataPromise } from "../../../services/HttpServices";
import { BEContext, BEContextProps } from "../BEContext";
//

export type NhanVienProps = { children: ReactNode };
export type NhanVienContextProps = {
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: NhanVienType[];
  setDataApi: (value: NhanVienType[]) => void;
  selectRow: NhanVienType;
  setSelectRow: (value: NhanVienType) => void;
  fetchDataApi: () => void;
};
export const NhanVienContext = createContext<NhanVienContextProps>({
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: [],
  setDataApi: () => {},
  selectRow: NhanVienTypeDefault,
  setSelectRow: () => {},
  fetchDataApi: () => {},
});

export const NhanVienProvider = ({ children }: NhanVienProps) => {
  const { setIsCommonLoadingApi } = useContext<BEContextProps>(BEContext);
  //
  const initialized = useRef(false);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<NhanVienType[]>([]);
  const [useSelectRow, setUseSelectRow] =
    useState<NhanVienType>(NhanVienTypeDefault);
  async function fetchData() {
    setUseIsLoadingApi(true);
    //setIsCommonLoadingApi(true);
    // You can await here
    const data = await getArrayDataPromise<NhanVienType>(
      `${UrlApi.api_danh_muc_nhan_vien_lay_ds}?ma_nv=ADMIN`
    );
    const dataMapDate = data.map((item) => ({
      ...item,
      ngaysinh: new Date(item.ngaysinh ?? ""),
    }));
    const dataMap = dataMapDate.map((item) => ({
      ...item,
      ngaysinh_string: item.ngaysinh?.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    }));
    console.log("Cách 2 NhanVienProvider:");
    // console.log(data);
    // ...
    setUseDataApi(dataMap);
    setUseSelectRow(NhanVienTypeDefault);
    setUseIsLoadingApi(false);
    // setIsCommonLoadingApi(false);
  }
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchData();
    return () => {
      console.log("NhanVienProvider: useEffect - count - cleanup");
    };
  }, []);
  //
  useEffect(() => {
    setIsCommonLoadingApi(isUseLoadingApi);
    return () => {
      console.log(
        "NhanVienProvider: useEffect setIsCommonLoadingApi - count - cleanup"
      );
    };
  }, [isUseLoadingApi, setIsCommonLoadingApi]);

  return (
    <NhanVienContext.Provider
      value={{
        isLoadingApi: isUseLoadingApi,
        setIsLoadingApi: setUseIsLoadingApi,
        dataApi: useDataApi,
        setDataApi: setUseDataApi,
        selectRow: useSelectRow,
        setSelectRow: setUseSelectRow,
        fetchDataApi: fetchData,
      }}
    >
      {children}
    </NhanVienContext.Provider>
  );
};
