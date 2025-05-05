import { useContext, useRef } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileType } from "./ProfileType";
export const ImageDaiDien = () => {
  const useData = useContext<ProfileType>(ProfileContext);
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
    console.log(useData.url_hinhanh);
  }
  return (
    <div className="profile-item profile-anhdaidien">
      <div data-wow-delay="1.5s" className="wow bounceInRight">
        <img
          src="http://www.detectiveconanworld.com/wiki/images/9/92/Ran_Mouri_Profile.jpg"
          height="200"
        />
        {/* <img src={useData.url_hinhanh ?? ""} alt="ảnh đại diện" role="img"></img> */}
      </div>
    </div>
  );
};
