import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileKyNangType, ProfileType } from "./ProfileType";

export const NangLuc = () => {
  const useData = useContext<ProfileType>(ProfileContext);
  const getJsonStyle = (item: ProfileKyNangType) => {
    const _getJsonStyle = JSON.parse(
      // `{"--nangluc-phantram": ${item.phantram ?? 0}, "maxWidth": "${(
      //   item.phantram ?? 0
      // ).toString()}%"}`

      `{
      "--nangluc-phantram": ${item.phantram ?? 0}, 
      "maxWidth": "${(item.phantram ?? 0).toString()}%"
      }`
    );
    console.log(_getJsonStyle);
    return _getJsonStyle;
  };

  return (
    // <div id={`item-${itemId}`}>{itemContent}</div>

    <div className="profile-item  profile-nangluc">
      <div className="common-title">
        <span>KỸ NĂNG</span>
        <i className="fas fa-address-card fa-3x"></i>
      </div>
      <div className="profile_nangluc_noidung">
        {useData.kn?.map((item) => (
          <div className="profile_nangluc_item">
            <div className="profile_nangluc_circle">
              <svg>
                <circle cx="50%" cy="50%" r="40px"></circle>
                <circle
                  cx="50%"
                  cy="50%"
                  r="40px"
                  style={getJsonStyle(item)}
                ></circle>

                <circle
                  cx="50%"
                  cy="50%"
                  r="40px"
                  style={getJsonStyle(item)}
                ></circle>
              </svg>
              <span>{`${item.phantram}%`}</span>
            </div>
            <div className="profile_nangluc_bar">
              <span>{item.ten_kynang ?? ""}</span>
              <div className="profile_nangluc_bar_item">
                <div
                  className="profile_nangluc_phantram"
                  // data-wow-delay="0.5s"
                  // per={(item.phantram ?? 0).toString()}
                  data-per-number={item.phantram ?? 0}
                  data-per={`${(item.phantram ?? 0).toString()}%`}
                  style={getJsonStyle(item)}
                  // style={JSON.parse(
                  //   `{"--nangluc-phantram": ${
                  //     item.phantram ?? 0
                  //   }, "max-width": "${(item.phantram ?? 0).toString()}%"}`
                  // )}
                  // style={{
                  //   maxWidth: `${(item.phantram ?? 0).toString()}%`,
                  // }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
