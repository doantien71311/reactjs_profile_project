import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  FukudaSonSanPhamType,
  FukudaSonSanPhamTypeDefault,
} from "../../../model/FukudaSonSanPhamType";
import UrlApi from "../../../services/UrlApi";
import { getArrayDataPromise } from "../../../services/HttpServices";
import { BEContext, BEContextProps } from "../BEContext";
//

export type FukudaSonSanPhamBEProps = { children: ReactNode };
export type FukudaSonSanPhamBEContextProps = {
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: FukudaSonSanPhamType[];
  setDataApi: (value: FukudaSonSanPhamType[]) => void;
  selectRow: FukudaSonSanPhamType;
  setSelectRow: (value: FukudaSonSanPhamType) => void;
  fetchDataApi: () => void;
  textFilterNhomSon: string;
  setTextFilterNhomSon: (value: string) => void;
  textSort: string;
  setTextSort: (value: string) => void;
};
export const FukudaSonSanPhamBEContext =
  createContext<FukudaSonSanPhamBEContextProps>({
    isLoadingApi: true,
    setIsLoadingApi: () => {},
    dataApi: [],
    setDataApi: () => {},
    selectRow: FukudaSonSanPhamTypeDefault,
    setSelectRow: () => {},
    fetchDataApi: () => {},
    textFilterNhomSon: "",
    setTextFilterNhomSon: () => {},
    //
    textSort: "",
    setTextSort: () => {},
    //
  });

export const FukudaSonSanPhamBEProvider = ({
  children,
}: FukudaSonSanPhamBEProps) => {
  const { setIsCommonLoadingApi } = useContext<BEContextProps>(BEContext);
  //

  const initialized = useRef(false);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<FukudaSonSanPhamType[]>([]);
  const [useSelectRow, setUseSelectRow] = useState<FukudaSonSanPhamType>(
    FukudaSonSanPhamTypeDefault
  );
  const [textFilterNhomSon, setTextFilterNhomSon] = useState("");
  const [textSort, setTextSort] = useState("");

  async function fetchData() {
    setUseIsLoadingApi(true);
    // You can await here
    const data = await getArrayDataPromise<FukudaSonSanPhamType>(
      UrlApi.api_fukuda_son_san_pham_lay_ds
    );
    console.log("Cách 2 FukudaSonSanPhamBEProvider:");
    // ...
    console.log(data);
    setUseDataApi(data);
    setUseSelectRow(FukudaSonSanPhamTypeDefault);
    setUseIsLoadingApi(false);
  }
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchData();
    return () => {
      console.log("FukudaSonSanPhamBEProvider: useEffect - count - cleanup");
    };
  }, []);
  useEffect(() => {
    setIsCommonLoadingApi(isUseLoadingApi);
    return () => {
      console.log("FukudaSonSanPhamBEProvider: useEffect - count - cleanup");
    };
  }, [isUseLoadingApi, setIsCommonLoadingApi]);

  return (
    <FukudaSonSanPhamBEContext.Provider
      value={{
        isLoadingApi: isUseLoadingApi,
        setIsLoadingApi: setUseIsLoadingApi,
        dataApi: useDataApi,
        setDataApi: setUseDataApi,
        selectRow: useSelectRow,
        setSelectRow: setUseSelectRow,
        fetchDataApi: fetchData,
        //
        textFilterNhomSon: textFilterNhomSon,
        setTextFilterNhomSon: setTextFilterNhomSon,
        //
        textSort: textSort,
        setTextSort: setTextSort,
      }}
    >
      {children}
    </FukudaSonSanPhamBEContext.Provider>
  );
};
