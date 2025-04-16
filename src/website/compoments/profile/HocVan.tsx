import { useContext } from "react";
import { ProfileType } from "./ProfileType";
import { ProfileContext } from "./ProfileContext";

export const HocVan = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useData = useContext<ProfileType>(ProfileContext);
  console.log(useData);

  return (
    <div className="profile-hocvan profile-item">
      <h1> Đây là học vấn</h1>
    </div>
  );
};
