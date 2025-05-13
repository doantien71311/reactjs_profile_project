import { useContext } from "react";
import { ProfileContext, ProfileContextProps } from "./ProfileContext";
import CountUp from "react-countup";
import { motion } from "motion/react";
import { ProfileKyNangType } from "../../../model/ProfileNhanVienType";

export const NangLuc = () => {
  const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;

  const getJsonStyle = (item: ProfileKyNangType) => {
    const _getJsonStyle = JSON.parse(
      // `{"--nangluc-phantram": ${item.phantram ?? 0}, "maxWidth": "${(
      //   item.phantram ?? 0
      // ).toString()}%"}`

      `{
      "--nangluc-phantram": ${item.phantram_kynang ?? 0}, 
      "maxWidth": "${(item.phantram_kynang ?? 0).toString()}%"
      }`
    );
    // console.log(_getJsonStyle);
    return _getJsonStyle;
  };

  return (
    // <div id={`item-${itemId}`}>{itemContent}</div>

    <section className="profile-item profile-nangluc">
      <div className="common-title">
        <span>KỸ NĂNG</span>
        <i className="fas fa-grin-stars fa-3x"></i>
      </div>
      <div className="profile_nangluc_noidung">
        {useData.profile_nhanvien_kynang?.map((item) => (
          <div className="profile_nangluc_item">
            <div className="profile_nangluc_circle">
              <motion.svg
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: (item.phantram_kynang ?? 0) / 100,
                  transition: {
                    ease: "easeOut",
                    duration: 1.5,
                  },
                }}
                viewport={{ once: false }}
              >
                <circle cx="50%" cy="50%" r="40px"></circle>
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="40px"
                  initial={{
                    // opacity: 0,
                    strokeDashoffset: 250,
                  }}
                  whileInView={{
                    // opacity: (item.phantram ?? 0) / 100,
                    strokeDashoffset:
                      250 - (250 * (item.phantram_kynang ?? 0)) / 100,
                    transition: {
                      ease: "easeOut",
                      // delay: index / 10,
                      duration: 1.5,
                    },
                  }}
                  viewport={{ once: false }}
                ></motion.circle>

                <circle
                  cx="50%"
                  cy="50%"
                  r="40px"
                  style={getJsonStyle(item)}
                ></circle>
              </motion.svg>
              <span>
                {
                  <CountUp
                    end={item.phantram_kynang ?? 0}
                    duration={0.5}
                    enableScrollSpy={true}
                    scrollSpyDelay={100}
                    suffix="%"
                    // preserveValue={true}
                    // redraw={true}
                    // viewport={{ once: true }}
                  />
                }
              </span>
            </div>
            <div className="profile_nangluc_bar">
              <span>{item.ten_kynang ?? ""}</span>
              <div>
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: (item.phantram_kynang ?? 0) / 100,
                    transition: {
                      ease: "easeOut",
                      // delay: index / 5,
                      duration: 1.5,
                    },
                  }}
                  viewport={{ once: false }}
                  className="profile_nangluc_bar_item"
                >
                  <motion.div
                    initial={{
                      width: 0,
                      // opacity: 0,
                    }}
                    whileInView={{
                      // opacity: (item.phantram ?? 0) / 100,
                      width: `${item.phantram_kynang ?? 0}%`,
                      maxWidth: `${item.phantram_kynang ?? 0}%`,
                      transition: {
                        ease: "easeOut",
                        // delay: index / 5,
                        duration: 1.5,
                      },
                    }}
                    // whileHover={{
                    //   scale: 1.2,
                    // }}
                    viewport={{ once: false }}
                    className="profile_nangluc_phantram"
                    data-per-number={item.phantram_kynang ?? 0}
                    data-per={`${(item.phantram_kynang ?? 0).toString()}%`}
                    style={getJsonStyle(item)}
                  ></motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
