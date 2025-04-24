import { useState, createContext, useEffect, useRef } from "react";
import UrlApi from "../../../services/UrlApi";
import { getArrayDataPromise } from "../../../services/HttpServices";
import {
  CommonChildrenProps,
  CommonContextProps,
  CommonParameterProps,
  CommonParamaterPropsDefault,
} from "../common_props/CommonContextProps";
import {
  FukudaSonDonDatHangType,
  FukudaSonDonDatHangTypeDefault,
} from "../../../model/FukudaSonDonDatHangType";
//
export const FukudaSonDonDatHangBEContext = createContext<
  CommonContextProps<FukudaSonDonDatHangType>
>({
  parameterSearch: CommonParamaterPropsDefault,
  setParameterSearch: () => {},
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: [],
  setDataApi: () => {},
  selectRow: FukudaSonDonDatHangTypeDefault,
  setSelectRow: () => {},
  fetchDataApi: () => {},
});

export const FukudaSonDonDatHangBEProvider = ({
  children,
}: CommonChildrenProps) => {
  const initialized = useRef(false);
  const [useParameterSearch, setUseParameterSearch] =
    useState<CommonParameterProps>(CommonParamaterPropsDefault);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<FukudaSonDonDatHangType[]>([]);
  const [useSelectRow, setUseSelectRow] = useState<FukudaSonDonDatHangType>(
    FukudaSonDonDatHangTypeDefault
  );
  async function fetchData() {
    setUseIsLoadingApi(true);
    // You can await here
    const data = await getArrayDataPromise<FukudaSonDonDatHangType>(
      UrlApi.api_fukuda_son_san_pham_lay_ds
    );
    console.log("Cách 2 FukudaSonDonDatHangBEProvider:");
    // ...
    setUseDataApi(data);
    setUseSelectRow(FukudaSonDonDatHangTypeDefault);
    setUseIsLoadingApi(false);
  }
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = false;
    fetchData();
    return () => {
      console.log(
        "Cách 2 FukudaSonSanPhamBEProvider: useEffect - count - cleanup"
      );
    };
  }, []);

  return (
    <FukudaSonDonDatHangBEContext.Provider
      value={{
        parameterSearch: useParameterSearch,
        setParameterSearch: setUseParameterSearch,
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
    </FukudaSonDonDatHangBEContext.Provider>
  );
};
