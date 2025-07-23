import { useState, createContext, ReactNode, useEffect, useRef } from "react";
import {
  ResponseApiType,
  ResponseApiTypeDefault,
} from "../../model/ResponseApiType";
// import { useNavigate } from "react-router-dom";
// import ChucNangUrl from "../ChucNangUrl";
// import SessionStorageKey from "../SessionStorageKey";
//
export type BEContextProps = {
  isShowMenu: boolean;
  setIsShowMenu: (value: boolean) => void;
  isMobile: boolean;
  isCommonLoadingApi: boolean;
  setIsCommonLoadingApi: (value: boolean) => void;
  commonPostingApi: string;
  setCommonPostingApi: (value: string) => void;
  responseApi: ResponseApiType;
  setResponseApiType: (value: ResponseApiType) => void;
};
export const BEContext = createContext<BEContextProps>({
  isShowMenu: true,
  setIsShowMenu: () => {},
  isMobile: false,
  isCommonLoadingApi: false,
  setIsCommonLoadingApi: () => {},
  commonPostingApi: "",
  setCommonPostingApi: () => {},
  responseApi: ResponseApiTypeDefault,
  setResponseApiType: () => {},
});

export const BEProvider = ({ children }: { children: ReactNode }) => {
  const initialized = useRef(false);

  const [useIsShowMenu, setUseIsShowMenu] = useState<boolean>(true);
  const [isUseMobile, setIsUseMobile] = useState(false);
  const [isUseLoadingApi, setUseIsLodingApi] = useState(false);
  const [commonPostingApi, setCommonPostingApi] = useState("");
  const [responseApi, setResponseApiType] = useState<ResponseApiType>(
    ResponseApiTypeDefault
  );
  //
  // const navigate = useNavigate();

  // const handleResize = () => {
  //   setIsUseMobile(window.innerWidth <= 767);
  // };
  // window.innerWidth <= 767

  //   // `sm` applies to x-small devices (portrait phones, less than 576px)
  // @media (max-width: 575.98px) { ... }

  // // `md` applies to small devices (landscape phones, less than 768px)
  // @media (max-width: 767.98px) { ... }

  // // `lg` applies to medium devices (tablets, less than 992px)
  // @media (max-width: 991.98px) { ... }

  // // `xl` applies to large devices (desktops, less than 1200px)
  // @media (max-width: 1199.98px) { ... }

  // // `xxl` applies to x-large devices (large desktops, less than 1400px)
  // @media (max-width: 1399.98px) { ... }

  const updateUseIsShowMenu = (newValue: boolean) => {
    setUseIsShowMenu(newValue);
  };

  // useEffect(() => {
  //   if (!initialized.current) return;
  //   initialized.current = true;
  //   //
  //   setIsUseMobile(window.innerWidth <= 767);

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    // //Kiểm tra đăng nhập và chuyển trang
    // const username = sessionStorage.getItem(SessionStorageKey.username);
    // console.log(
    //   "sessionStorage.getItem(SessionStorageKey.username) :" + username
    // );
    // if (!username || username == null || username == "") {
    //   navigate(ChucNangUrl.administrator_dang_nhap);
    //   return;
    // }

    setIsUseMobile(window.innerWidth <= 767);
    return () => {
      console.log("BEProvider: useEffect - count - cleanup");
    };
  }, []);

  return (
    <BEContext.Provider
      value={{
        isShowMenu: useIsShowMenu,
        setIsShowMenu: updateUseIsShowMenu,
        isMobile: isUseMobile,
        isCommonLoadingApi: isUseLoadingApi,
        setIsCommonLoadingApi: setUseIsLodingApi,
        commonPostingApi: commonPostingApi,
        setCommonPostingApi: setCommonPostingApi,
        responseApi: responseApi,
        setResponseApiType: setResponseApiType,
      }}
    >
      {children}
    </BEContext.Provider>
  );
};
