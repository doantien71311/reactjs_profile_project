import { createContext, ReactNode, useContext, useEffect } from "react";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
import {
  ResponseApiType,
  ResponseApiTypeDefault,
} from "../../../model/ResponseApiType";
import { BEContext, BEContextProps } from "../BEContext";

export type ContextProps = {
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

export const EditContext = createContext<ContextProps>({
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
  const { setIsCommonLoadingApi, setIsCommonPostingApi } =
    useContext<BEContextProps>(BEContext);

  useEffect(() => {
    setIsCommonLoadingApi(false);
    setIsCommonPostingApi(false);
  }, []);

  return (
    <EditContext.Provider
      value={{
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
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
