import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
import {
  ResponseApiType,
  ResponseApiTypeDefault,
} from "../../../model/ResponseApiType";
import { BEContext, BEContextProps } from "../BEContext";
import { useParams } from "react-router-dom";
import UrlApi from "../../../services/UrlApi";
import { getRowFromListData } from "../../../services/HttpServices";
import { ParameterApiType } from "../../../model/ParameterApiType";
import { v4 as uuidv4 } from "uuid";
import CommonPostStatus from "../common_ui/CommonPostStatus";

export type EditContextProps = {
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: FukudaSonSanPhamType;
  setDataApi: (value: FukudaSonSanPhamType) => void;
  fetchDataApi: () => void;
  //
  postDataApi: () => void;
  isUseUpdatingApi: boolean;
  useUpdateApi: ResponseApiType;
};

export const EditContext = createContext<EditContextProps>({
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: {
    id: "",
    ma_hh: "",
  },
  setDataApi: () => {},
  fetchDataApi: () => {},
  //
  postDataApi: () => {},
  isUseUpdatingApi: false,
  useUpdateApi: ResponseApiTypeDefault,
});

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const { isCommonLoadingApi, setIsCommonLoadingApi, setCommonPostingApi } =
    useContext<BEContextProps>(BEContext);
  const { keyString, isAddNew } = useParams();
  const intialized = useRef(false);
  const [dataApi, setDataApi] = useState<FukudaSonSanPhamType>({
    id: uuidv4(),
    ma_hh: "",
  });
  //

  useEffect(() => {
    if (intialized.current) return;
    intialized.current = true;
    fechDataApi(keyString ?? "", isAddNew ?? "true");
  }, [keyString, isAddNew]);

  //#region các hàm
  async function fechDataApi(keyString: string, isAddNew: string) {
    setIsCommonLoadingApi(true);

    if (isAddNew?.toUpperCase() == "TRUE") {
      //dùng cho trường hợp thêm mới
      setDataApi({
        ...dataApi,
        ma_dvt: "KG",
        ten_dvt: "Kg",
      });
    } else {
      //dùng cho trường hợp edit
      const parameter: ParameterApiType[] = [];
      parameter.push({ name: "soid", value: keyString });
      parameter.push({ name: "ma_nv", value: "ADMIN" });
      const data = await getRowFromListData<FukudaSonSanPhamType>(
        `${UrlApi.api_fukuda_son_san_pham_lay_ds}`,
        parameter
      );
      setDataApi(data);
    }
    setIsCommonLoadingApi(false);
  }

  async function postDataApi() {
    setCommonPostingApi(CommonPostStatus.saving);

    setCommonPostingApi(CommonPostStatus.saved);
  }
  //#endregion các hàm

  return (
    <EditContext.Provider
      value={{
        isLoadingApi: isCommonLoadingApi,
        setIsLoadingApi: setIsCommonLoadingApi,
        dataApi: dataApi,
        setDataApi: setDataApi,
        fetchDataApi: () => {},
        //
        postDataApi: postDataApi,
        isUseUpdatingApi: false,
        useUpdateApi: ResponseApiTypeDefault,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
