import Accordion from "react-bootstrap/Accordion";
// import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// import { useNavigate } from "react-router-dom";
// import { NavLink, useNavigate } from "react-router-dom";

import { MenuType } from "../../../model/MenuType";

export const MenuIndex = () => {
  // let navigate = useNavigate();
  const [dataMenu, setDataMenu] = useState<MenuType[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const _dataMenu: MenuType[] = [];
      _dataMenu.push({
        ma_chucnang: "HCNS",
        ten_chucnang: "Hành chính nhân sự",
        ma_chucnang_cha: "",
        url_chucnang: "",
        sott: "01",
      });
      _dataMenu.push({
        ma_chucnang: "Profile_Nhan_Vien",
        ten_chucnang: "Profile Nhân viên",
        ma_chucnang_cha: "HCNS",
        url_chucnang: "/administrator/profile",
        sott: "0101",
      });
      _dataMenu.push({
        ma_chucnang: "SonFuKuDa",
        ten_chucnang: "Sơn FuKuDa",
        ma_chucnang_cha: "",
        url_chucnang: "",
        sott: "02",
      });
      _dataMenu.push({
        ma_chucnang: "SonFuKuDa_DDH",
        ten_chucnang: "Đơn đặt hàng",
        ma_chucnang_cha: "SonFuKuDa",
        url_chucnang: "/administrator/fukuda-son-dondathang",
        sott: "0201",
      });
      _dataMenu.push({
        ma_chucnang: "SonFuKuDa_TuyenDung_NPP",
        ten_chucnang: "Tuyển dụng nhà phân phối",
        ma_chucnang_cha: "SonFuKuDa",
        url_chucnang: "/administrator/fukuda-son-tuyendung-npp",
        sott: "0202",
      });

      console.log(_dataMenu);
      setDataMenu(_dataMenu);
    }
    return () => {
      //ComponentWillUnmount (Hủy bỏ)
      //clean up function
      console.log("useEffect - count - cleanup");
    };
  }, [dataMenu]);

  const getMenuCha = () => {
    return dataMenu.filter((f) => (f.ma_chucnang_cha ?? "") == "");
  };
  const getMenuCon = (ma_chucnang?: string) => {
    return dataMenu.filter((f) => (f.ma_chucnang_cha ?? "") == ma_chucnang);
  };

  // console.log("MenuIndex moi");
  // console.log(dataMenu);
  return (
    <>
      <nav
        style={{
          height: "1000px",
          backgroundColor: "red",
        }}
      >
        <>
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen={true}>
            {getMenuCha().map((item) => (
              <Accordion.Item eventKey={item.sott ?? ""}>
                <Accordion.Header>{item.ten_chucnang}</Accordion.Header>
                <Accordion.Body>
                  {getMenuCon(item.ma_chucnang).map((map) => (
                    <div>
                      <NavLink to={map.url_chucnang ?? ""}>
                        {map.ten_chucnang ?? "Chưa có tên"}
                      </NavLink>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      </nav>
    </>
  );
};
