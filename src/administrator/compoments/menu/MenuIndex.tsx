import Accordion from "react-bootstrap/Accordion";
// import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// import { useNavigate } from "react-router-dom";
// import { NavLink, useNavigate } from "react-router-dom";

import { MenuType } from "../../../model/MenuType";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getArrayDataPromise } from "../../../services/HttpServices";
import UrlApi from "../../../services/UrlApi";

export const MenuIndex = () => {
  //
  const [dataMenu, setDataMenu] = useState<MenuType[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(true);
  const [isExpandMenu, setIsExpandgMenu] = useState<boolean>(true);
  const [activeKeyMenu, setActiveKeyMenu] = useState<string[]>([]);
  const initialized = useRef(false);
  //
  async function fetchData() {
    setIsLoadingMenu(true);
    // You can await here
    const _dataMenu = await getArrayDataPromise<MenuType>(
      `${UrlApi.api_he_thong_chuc_nang_lay_ds}?ma_nv=ADMIN`
    );
    // ...
    setIsLoadingMenu(false);
    setActiveKeyMenu(getActiveKey(_dataMenu));
    setDataMenu(_dataMenu);
  }
  //
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      //#region khóa lại//
      // const _dataMenu: MenuType[] = [];
      // _dataMenu.push({
      //   ma_chucnang: "HCNS",
      //   ten_chucnang: "Hành chính nhân sự",
      //   ma_chucnang_cha: "",
      //   url_chucnang: "",
      //   sott: "01",
      // });
      // _dataMenu.push({
      //   ma_chucnang: "Nhan_Vien",
      //   ten_chucnang: "Nhân viên",
      //   ma_chucnang_cha: "HCNS",
      //   url_chucnang: "/administrator/nhanvien",
      //   sott: "0101",
      // });
      // _dataMenu.push({
      //   ma_chucnang: "Profile_Nhan_Vien",
      //   ten_chucnang: "Profile Nhân viên",
      //   ma_chucnang_cha: "HCNS",
      //   url_chucnang: "/administrator/profile-edit",
      //   sott: "0102",
      // });
      // _dataMenu.push({
      //   ma_chucnang: "SonFuKuDa",
      //   ten_chucnang: "Sơn FuKuDa",
      //   ma_chucnang_cha: "",
      //   url_chucnang: "",
      //   sott: "02",
      // });
      // _dataMenu.push({
      //   ma_chucnang: "SonFuKuDa_DDH",
      //   ten_chucnang: "Đơn đặt hàng",
      //   ma_chucnang_cha: "SonFuKuDa",
      //   url_chucnang: "/administrator/fukuda-son-dondathang",
      //   sott: "0201",
      // });
      // _dataMenu.push({
      //   ma_chucnang: "SonFuKuDa_TuyenDung_NPP",
      //   ten_chucnang: "Tuyển dụng nhà phân phối",
      //   ma_chucnang_cha: "SonFuKuDa",
      //   url_chucnang: "/administrator/fukuda-son-tuyendung-npp",
      //   sott: "0202",
      // });
      // _dataMenu.push({
      //   ma_chucnang: "SonFuKuDa_SanPham",
      //   ten_chucnang: "Sản phẩm",
      //   ma_chucnang_cha: "SonFuKuDa",
      //   url_chucnang: "/administrator/fukuda-son-sanpham",
      //   sott: "0203",
      // });
      // setIsLoadingMenu(false);
      // setActiveKeyMenu(getActiveKey(_dataMenu));
      // setDataMenu(_dataMenu);
      //#endregion khóa lại//

      fetchData();
    }
    return () => {
      //ComponentWillUnmount (Hủy bỏ)
      //clean up function
      console.log("useEffect - count - cleanup");
    };
  }, []);

  const moRongClick = () => {
    // setIsLoadingMenu(true);
    setTimeout(() => {
      // setIsLoadingMenu(false);
      setIsExpandgMenu(!isExpandMenu);
      setActiveKeyMenu(isExpandMenu ? getActiveKey(dataMenu) : []);
    }, 1);
  };

  const getMenuCha = () => {
    console.log("getMenuCha");
    return dataMenu.filter((f) => (f.ma_chucnang_cha ?? "") == "");
  };

  // const getMenuCha = useMemo(() => {
  //   console.log("getMenuCha");
  //   return dataMenu.filter((f) => (f.ma_chucnang_cha ?? "") == "");
  // }, [dataMenu]);

  // const sad = useMemo(() => {
  //   return "sad";
  // }, []);

  // const getMenuCon = useMemo((ma_chucnang?: string): MenuType[] => {
  //   return dataMenu.filter((f) => (f.ma_chucnang_cha ?? "") == ma_chucnang);
  // }, []);

  const getMenuCon = (ma_chucnang?: string): MenuType[] => {
    console.log("getMenuCon");
    return dataMenu.filter((f) => (f.ma_chucnang_cha ?? "") == ma_chucnang);
  };

  const getActiveKey = (arrayMenu: MenuType[]): string[] => {
    const result = arrayMenu
      .filter((f) => (f.ma_chucnang_cha ?? "") === "")
      .map((map) => {
        return map.ma_chucnang;
      });
    // console.log("getActiveKey:");
    // console.log(result);

    // const result = ["HCNS", "SonFuKuDa"];
    console.log(result);
    return result;
  };

  // console.log("MenuIndex moi");
  // console.log(dataMenu);
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <Button onClick={moRongClick}>{isExpandMenu ? "MO" : "Thu"}</Button>
      </InputGroup>
      {isLoadingMenu ? (
        <h6>Loading...</h6>
      ) : (
        <nav
          className="menu_left"
          // style={{
          //   height: "100%",
          //   width: "100%",
          //   backgroundColor: "red",
          // }}
        >
          <>
            <Accordion
              // ref={accordionMenu}
              // defaultActiveKey={["HCNS", "SonFuKuDa"]}
              key={"accordion_menu_left"}
              defaultActiveKey={activeKeyMenu}
              alwaysOpen={true}
              flush
            >
              {(() =>
                getMenuCha().map((item) => (
                  <Accordion.Item
                    key={item.ma_chucnang}
                    eventKey={item.ma_chucnang}
                  >
                    <Accordion.Header>{item.ten_chucnang}</Accordion.Header>
                    <Accordion.Body key={`${item.ma_chucnang}"_body"`}>
                      {getMenuCon(item.ma_chucnang).map((map) => (
                        <div key={`${item.ma_chucnang}_body_div`}>
                          <NavLink to={map.url_chucnang ?? ""}>
                            {map.ten_chucnang ?? "Chưa có tên"}
                          </NavLink>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )))()}
            </Accordion>
          </>
        </nav>
      )}
    </>
  );
};
