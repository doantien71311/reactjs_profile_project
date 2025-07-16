import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useContext,
} from "react";
import { ProfileNhanVienType } from "../../../../model/ProfileNhanVienType";
import UrlApi from "../../../../services/UrlApi";
import { getRowData, postRowData } from "../../../../services/HttpServices";
import {
  ResponseApiType,
  ResponseApiTypeDefault,
} from "../../../../model/ResponseApiType";
import { BEContext, BEContextProps } from "../../BEContext";

export type ProfileBEEditProps = { children: ReactNode };
export type ProfileBEEditContextProps = {
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: ProfileNhanVienType;
  setDataApi: (value: ProfileNhanVienType) => void;
  fetchDataApi: () => void;
  //
  postDataApi: () => void;
  isUseUpdatingApi: boolean;
  useUpdateApi: ResponseApiType;
};

export const ProfileBEEditContext = createContext<ProfileBEEditContextProps>({
  isLoadingApi: true,
  setIsLoadingApi: () => {},
  dataApi: {},
  setDataApi: () => {},
  fetchDataApi: () => {},
  //
  postDataApi: () => {},
  isUseUpdatingApi: false,
  useUpdateApi: ResponseApiTypeDefault,
});
//
export const ProfileBEEditProvider = ({ children }: ProfileBEEditProps) => {
  const { setIsCommonLoadingApi, setIsCommonPostingApi } =
    useContext<BEContextProps>(BEContext);
  //
  const initialized = useRef(false);
  const [isUseLoadingApi, setUseIsLoadingApi] = useState<boolean>(true);
  const [isUseUpdatingApi, setUseIsUpdatingApi] = useState<boolean>(false);
  const [useUpdateApi, setUseUpdateApi] = useState<ResponseApiType>(
    ResponseApiTypeDefault
  );
  const [useDataApi, setUseDataApi] = useState<ProfileNhanVienType>({});

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
    setUseDataApi(data);
    setUseIsLoadingApi(false);
  }

  async function updateData() {
    setUseIsUpdatingApi(true);
    setIsCommonPostingApi(true);
    // You can await here
    const data = await postRowData(
      // `${UrlApi.api_profile_nhan_vien_cap_nhat}?ma_nv=ADMIN&ma_nsd=ADMIN`,
      `${UrlApi.api_profile_nhan_vien_cap_nhat}`,
      useDataApi
    );
    console.log("profile nhân viên updateData:");
    // console.log(data);
    // ...
    setUseUpdateApi(data);
    setUseIsUpdatingApi(false);
    setIsCommonPostingApi(false);
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
        isUseUpdatingApi: isUseUpdatingApi,
        useUpdateApi: useUpdateApi,
      }}
    >
      {children}
    </ProfileBEEditContext.Provider>
  );
};
