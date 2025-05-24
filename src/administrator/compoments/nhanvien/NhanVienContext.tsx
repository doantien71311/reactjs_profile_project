import { useState, createContext, ReactNode, useEffect, useRef } from "react";
import { NhanVienType, NhanVienTypeDefault } from "../../../model/NhanVienType";
import UrlApi from "../../../services/UrlApi";
import { getArrayDataPromise } from "../../../services/HttpServices";
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
  const initialized = useRef(false);

  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<NhanVienType[]>([]);
  const [useSelectRow, setUseSelectRow] =
    useState<NhanVienType>(NhanVienTypeDefault);
  async function fetchData() {
    setUseIsLoadingApi(true);
    // You can await here
    const data = await getArrayDataPromise<NhanVienType>(
      `${UrlApi.api_danh_muc_nhan_vien_lay_ds}?ma_nv=ADMIN`
    );
    console.log("Cách 2 NhanVienProvider:");
    console.log(data);
    // ...
    setUseDataApi(data);
    setUseSelectRow(NhanVienTypeDefault);
    setUseIsLoadingApi(false);
  }
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = false;
    fetchData();
    return () => {
      console.log("Cách 2 NhanVienProvider: useEffect - count - cleanup");
    };
  }, []);

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
