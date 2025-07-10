// import { useContext } from "react";
// import { ProfileContext, ProfileContextProps } from "./ProfileContext";
// import { motion } from "motion/react";

export const Slogan = () => {
  // const useData = useContext<ProfileContextProps>(ProfileContext).dataApi;

  return (
    <section className="profile-item profile-slogan">
      <div className="profile_slogan_chucvu">
        <h1>.Net Developer</h1>
        {/* <svg viewBox="0 0 700 50" style={{ backgroundColor: "green" }}>
          <path d="M7.45 50.95Q7.45 51.68 7.17 51.97Q6.88 52.25 6.18 52.25L1.27 52.25Q0.59 52.25 0.29 51.97Q0 51.68 0 50.95L0 20.02Q0 18.58 0.56 17.91Q1.12 17.24 2.54 17.24L4.81 17.24Q6.05 17.24 7.17 17.57Q8.28 17.90 9.53 19.04Q10.79 20.19 12.46 22.60Q14.14 25 16.50 29.15Q18.77 33.11 20.15 35.47Q21.53 37.84 22.29 39.09Q23.05 40.33 23.43 40.87Q23.80 41.41 24.05 41.75L24.05 21.14Q24.05 20.43 24.27 20.07Q25.32 18.46 27.17 16.67Q27.54 16.38 27.78 16.38Q28.05 16.38 28.37 16.67Q29.37 17.60 30.07 18.44Q30.76 19.29 31.27 20.07Q31.49 20.46 31.49 21.14L31.49 50.22Q31.49 51.32 31.08 51.78Q30.66 52.25 29.57 52.25L27.22 52.25Q26.17 52.25 25.07 51.89Q23.97 51.54 22.58 50.28Q21.19 49.02 19.29 46.36Q17.38 43.70 14.70 39.09Q12.43 35.16 11.07 32.84Q9.72 30.52 9.01 29.33Q8.30 28.15 7.98 27.67Q7.67 27.20 7.45 26.95L7.45 50.95Z" />
        </svg> */}
        <div className="profile_slogan_line"></div>
      </div>
      <div className="profile_slogan_text">
        {/* <svg viewBox="0 0 350 50">
          <text x="0px" y="35px" className="profile_slogan_text_abc">
            Đổi mới-Chăm chỉ-Hòa đồng
          </text>
        </svg> */}
        <strong>Đổi mới-Chăm chỉ-Hòa đồng</strong>
      </div>
    </section>
  );
};
