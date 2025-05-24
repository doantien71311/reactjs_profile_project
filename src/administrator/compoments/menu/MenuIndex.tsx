import Accordion from "react-bootstrap/Accordion";
// import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// import { useNavigate } from "react-router-dom";
// import { NavLink, useNavigate } from "react-router-dom";

import { MenuType } from "../../../model/MenuType";
import {
  InputGroup,
  Form,
  Button,
  Navbar,
  Image,
  Stack,
} from "react-bootstrap";
import { getArrayDataPromise } from "../../../services/HttpServices";
import UrlApi from "../../../services/UrlApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faFolderOpen,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="menu_left">
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <Button onClick={moRongClick}>
          <FontAwesomeIcon icon={faTimes} className="" />
        </Button>

        <Button onClick={moRongClick}>
          <FontAwesomeIcon icon={faFilter} className="" />
        </Button>
      </InputGroup>
      {isLoadingMenu ? (
        <h6>Loading...</h6>
      ) : (
        <nav
        // style={{
        //   height: "100%",
        //   width: "100%",
        //   backgroundColor: "red",
        // }}
        >
          <>
            <Accordion
              className="p-2 menu_left_accordion"
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
                    className="menu_left_accordion_item"
                    key={item.ma_chucnang}
                    eventKey={item.ma_chucnang}
                  >
                    <Accordion.Header className="menu_left_accordion_header">
                      {/* <i className="fas fa-yen-sign"></i> */}
                      <div
                        className="p-0 ms-auto text-dark text-wrap font-weight-bold"
                        style={{
                          // border: "1px solid red",
                          width: "100%",
                        }}
                      >
                        <Image
                          // src="/src/assets/image/logo_dai_viet.png"
                          src={item.image_url_chucnang ?? ""}
                          style={{
                            width: "40px",
                            height: "40px",
                            // paddingTop: "5px",
                            // paddingBottom: "5px",
                            display: "block",
                            marginRight: "auto",
                            marginLeft: "auto",
                            marginTop: "5px",
                            marginBottom: "5px",
                            objectFit: "cover",
                            // alignItems: "center",
                            // alignContent: "center",
                            // alignSelf: "center",
                          }}
                          thumbnail
                        ></Image>
                        <div className="fs-6 text-center">
                          {item.ten_chucnang}
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body
                      key={`${item.ma_chucnang}"_body"`}
                      className="menu_left_accordion_body"
                    >
                      {getMenuCon(item.ma_chucnang).map((map) => (
                        <div
                          key={`${item.ma_chucnang}_body_div`}
                          // style={{ backgroundColor: "red" }}
                        >
                          {/* <Nav.Item as="li">
                            <Nav.Link href={map.url_chucnang ?? ""}>
                              {" "}
                              {map.ten_chucnang ?? "Chưa có tên"}
                            </Nav.Link>
                          </Nav.Item> */}

                          {/* <Navbar style={{ width: "100%" }}>
                            <NavLink
                              style={{ width: "100%" }}
                              to={map.url_chucnang ?? ""}
                            >
                              <Button
                                variant="link"
                                className="ms-auto w-100"
                                // style={{
                                //   width: "100%",
                                //   position: "absolute",
                                // }}
                              >
                                <FontAwesomeIcon icon={faBookmark} />
                                <span className="p-0 ms-auto text-start text-wrap">
                                  {map.ten_chucnang ?? "Chưa có tên"}
                                </span>
                              </Button>
                            </NavLink>
                          </Navbar> */}
                          <Navbar
                            style={
                              {
                                // border: "1px solid back",
                              }
                            }
                          >
                            <NavLink
                              style={{
                                width: "100%",
                                // , position: "absolute"
                              }}
                              to={map.url_chucnang ?? ""}
                            >
                              <Stack
                                // as="button"
                                direction="horizontal"
                                gap={2}
                                style={
                                  {
                                    // width: "100%",
                                    // , position: "absolute"
                                  }
                                }
                              >
                                {/* <FontAwesomeIcon
                                  className="p-0"
                                  icon={faStickyNote}
                                /> */}
                                {/* <FontAwesomeIcon icon={faBookmark} /> */}
                                <FontAwesomeIcon icon={faFolderOpen} />
                                {/* <FontAwesomeIcon icon={faBook} /> */}
                                <span className="p-0 text-left text-primary text-wrap">
                                  {map.ten_chucnang ?? "Chưa có tên"}
                                </span>
                              </Stack>
                            </NavLink>
                          </Navbar>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )))()}
            </Accordion>
          </>
        </nav>
      )}
    </div>
  );
};
