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
import {
  // DeleteRowData,
  getArrayDataPromise,
} from "../../../services/HttpServices";
import { BEContext, BEContextProps } from "../BEContext";
import CommonStatus from "../common_props/CommonStatus";
import { ResponseApiType } from "../../../model/ResponseApiType";
import { sleep } from "../../../utils/utilsFunction";
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
  //
  setStatusDeleteQuestionComponent: (value: string) => void;
};
export const NhanVienContext = createContext<NhanVienContextProps>({
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: [],
  setDataApi: () => {},
  selectRow: NhanVienTypeDefault,
  setSelectRow: () => {},
  fetchDataApi: () => {},
  //
  setStatusDeleteQuestionComponent: () => {},
});

export const NhanVienProvider = ({ children }: NhanVienProps) => {
  const {
    setIsCommonLoadingApi,
    statusDeleteQuestionCommon,
    setStatusDeleteQuestionCommon,
    setStatusApi,
    setRowDataCommon,
    setResponseApiTypeCommon,
  } = useContext<BEContextProps>(BEContext);
  //
  const initialized = useRef(false);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<NhanVienType[]>([]);
  const [useSelectRow, setUseSelectRow] =
    useState<NhanVienType>(NhanVienTypeDefault);
  const [statusDeleteRowQuestionComponent, setStatusDeleteQuestionComponent] =
    useState("");
  //
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
  //
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
    setRowDataCommon({
      id: useSelectRow.soid,
      ma: useSelectRow.ma_nv,
      title: `${useSelectRow.ma_nv ?? ""}, ${useSelectRow.ten_nv ?? ""}`,
    });
    console.log(
      "statusDeleteRowQuestionComponent: " + statusDeleteRowQuestionComponent
    );
    setStatusDeleteQuestionCommon(statusDeleteRowQuestionComponent);
    // setStatusDeleteQuestionComponent("");
    return () => {};
  }, [statusDeleteRowQuestionComponent]);

  useEffect(() => {
    if (statusDeleteQuestionCommon === CommonStatus.question_delete_yes) return;
    setStatusDeleteQuestionComponent(statusDeleteQuestionCommon);

    return () => {};
  }, [statusDeleteQuestionCommon]);

  //
  useEffect(() => {
    setIsCommonLoadingApi(isUseLoadingApi);
    return () => {
      console.log(
        "NhanVienProvider: useEffect setIsCommonLoadingApi - count - cleanup"
      );
    };
  }, [isUseLoadingApi, setIsCommonLoadingApi]);
  //
  useEffect(() => {
    if (statusDeleteQuestionCommon !== CommonStatus.question_delete_yes) return;
    if ((useSelectRow.soid ?? "") === "") return;
    let ignore = false;
    //
    async function deleteDataApi(id: string) {
      setStatusApi(CommonStatus.deleting);
      // const data = await DeleteRowData(
      //   `${UrlApi.api_danh_muc_nhan_vien_xoa}`,
      //   id ?? ""
      // );
      const data: ResponseApiType = {
        status: "200",
        message: "Xóa thành công",
      };
      await sleep(5000);
      //
      setStatusDeleteQuestionCommon("");
      //console.log("deleteDataApi");
      // console.log(data);
      if (!ignore) {
        if ((data.status ?? "") == "200") {
          const useDataApiDelete = [...useDataApi].filter((f) => f.soid !== id);
          //
          setUseDataApi(useDataApiDelete);
          //
          setResponseApiTypeCommon(data);
          //
          setUseSelectRow(NhanVienTypeDefault);
        }
      }
      setStatusApi(CommonStatus.deleted);
    }
    //
    deleteDataApi(useSelectRow.soid ?? "");
    //
    return () => {
      ignore = true;
    };
  }, [useSelectRow.soid ?? "", statusDeleteQuestionCommon]);

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
        //
        setStatusDeleteQuestionComponent: setStatusDeleteQuestionComponent,
      }}
    >
      {children}
    </NhanVienContext.Provider>
  );
};
