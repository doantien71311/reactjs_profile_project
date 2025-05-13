import { createContext, useEffect, useState, ReactNode, useRef } from "react";
import { useParams } from "react-router-dom";
import { getRowData } from "../../../services/HttpServices";
import { ProfileNhanVienType } from "../../../model/ProfileNhanVienType";
import UrlApi from "../../../services/UrlApi";

export type ProfileProps = { children: ReactNode };
export type ProfileContextProps = {
  isLoadingApi: boolean;
  // setIsLoadingApi: (value: boolean) => void;
  dataApi: ProfileNhanVienType;
  // setDataApi: (value: ProfileType) => void;
};
export const ProfileContext = createContext<ProfileContextProps>({
  isLoadingApi: true,
  // setIsLoadingApi: () => {},
  dataApi: {},
  // setDataApi: () => {},
});
export const ProfileProvider = ({ children }: ProfileProps) => {
  const initialized = useRef(false);
  const [isUseLoadingApi, setIsUseLoadingApi] = useState<boolean>(true);
  const [useDataApi, setUseDataApi] = useState<ProfileNhanVienType>({});
  const { ma_nv } = useParams();

  async function fetchData() {
    console.log(ma_nv);
    setIsUseLoadingApi(true);
    // You can await here
    const data = await getRowData<ProfileNhanVienType>(
      `${UrlApi.api_profile_nhan_vien_lay_ds}?soid=b37f37db-1b72-4177-b1f6-7429ff2c6fd6&ma_nv=ADMIN`
    );
    console.log(data);
    setUseDataApi(data);
    setIsUseLoadingApi(false);
    document
      .getElementsByClassName("profile")[0]
      .classList.remove("profile_skeleton_loading");
  }
  //
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log(`ProfileNhanVienProvider`);
      setTimeout(() => {
        fetchData();
        return () => {
          console.log(
            "Cách 2 ProfileNhanVienType: useEffect - count - cleanup"
          );
        };
      }, 0);
    }
  }, []);
  return (
    <ProfileContext.Provider
      value={{ isLoadingApi: isUseLoadingApi, dataApi: useDataApi }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
