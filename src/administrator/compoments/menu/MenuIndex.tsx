import Accordion from "react-bootstrap/Accordion";
// import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useTransition,
} from "react";

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
import { BEContext, BEContextProps } from "../BEContext";

export const MenuIndex = () => {
  //
  const { isMobile } = useContext<BEContextProps>(BEContext);
  const { setIsShowMenu } = useContext<BEContextProps>(BEContext);
  const [dataMenu, setDataMenu] = useState<MenuType[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(true);
  const [isExpandMenu, setIsExpandgMenu] = useState<boolean>(true);
  const [activeKeyMenu, setActiveKeyMenu] = useState<string[]>([]);
  const initialized = useRef(false);
  //
  const [textSearch, setTextSearch] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isPending, startTransition] = useTransition();
  //
  const filterData = useMemo<MenuType[]>(() => {
    return dataMenu.filter(
      (f) =>
        (f.search_chucnang ?? "")
          .toLowerCase()
          .includes(textSearch.toLowerCase()) ||
        (f.ten_chucnang ?? "").toLowerCase().includes(textSearch.toLowerCase())
    );
  }, [dataMenu, textSearch]);

  async function fetchData() {
    setIsLoadingMenu(true);
    // You can await here
    const _dataMenuApi = await getArrayDataPromise<MenuType>(
      `${UrlApi.api_he_thong_chuc_nang_lay_ds}?ma_nv=ADMIN`
    );
    // ...
    const _dataMenu = _dataMenuApi.map((item) => {
      const search_chucnang = _dataMenuApi
        .filter((f) => f.ma_chucnang_cha == item.ma_chucnang)
        .map((m) => m.ten_chucnang)
        .join(";");
      return { ...item, search_chucnang: search_chucnang };
    });
    console.log(_dataMenu);
    setIsLoadingMenu(false);
    setActiveKeyMenu(getActiveKey(_dataMenu));
    setDataMenu(_dataMenu);
  }
  //
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    fetchData();

    return () => {
      //ComponentWillUnmount (Hủy bỏ)
      //clean up function
      console.log("MenuIndex useEffect - count - cleanup");
    };
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    initialized.current = true;

    setIsShowMenu(!isMobile);

    return () => {
      //ComponentWillUnmount (Hủy bỏ)
      //clean up function
      console.log("MenuIndex useEffect Check IsMobile - count - cleanup");
    };
  }, [isMobile]);

  //#region các hàm private
  const moRongClick = () => {
    // setIsLoadingMenu(true);
    setTimeout(() => {
      // setIsLoadingMenu(false);
      setIsExpandgMenu(!isExpandMenu);
      setActiveKeyMenu(isExpandMenu ? getActiveKey(dataMenu) : []);
    }, 1);
  };

  const noFilterClick = () => {
    setTextInput("");
    setTextSearch("");
  };

  const getActiveKey = (arrayMenu: MenuType[]): string[] => {
    const result = arrayMenu
      .filter((f) => (f.ma_chucnang_cha ?? "") === "")
      .map((map) => {
        return map.ma_chucnang;
      });
    // console.log(result);
    return result;
  };

  const menuItemHandleClick = () => {
    if (isMobile) {
      setIsShowMenu(false);
    }
  };

  const handleTextSearchMenuChange = (value: string) => {
    setTextInput(value);
    startTransition(() => {
      setTextSearch(value);
    });
    console.log(isPending);
  };

  //#endregion các hàm private

  return (
    <div className="menu_left">
      <InputGroup className="mb-3">
        <Form.Control
          // readOnly={isLoadingMenu}
          disabled={isLoadingMenu}
          aria-label="Default"
          value={textInput}
          onChange={(event) => handleTextSearchMenuChange(event.target.value)}
          aria-describedby="inputGroup-sizing-default"
        />
        <Button disabled={isLoadingMenu} onClick={noFilterClick}>
          <FontAwesomeIcon icon={faTimes} className="" />
        </Button>

        <Button disabled={isLoadingMenu} onClick={moRongClick}>
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
                //getMenuCha()

                filterData
                  .filter((f) => (f.ma_chucnang_cha ?? "") == "")
                  .map((item) => (
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
                              // objectFit: "cover",
                              objectFit: "scale-down",
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
                        {
                          // getMenuCon(item.ma_chucnang)
                          filterData
                            .filter(
                              (fC) =>
                                (fC.ma_chucnang_cha ?? "") == item.ma_chucnang
                            )
                            .map((mapC) => (
                              <div
                                key={`${mapC.ma_chucnang}_body_div`}
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
                                    // style={{
                                    //   width: "100%",
                                    //   // , position: "absolute"
                                    // }}
                                    style={({ isActive }) => ({
                                      textDecoration: "none",
                                      borderBottom: isActive
                                        ? "#15b0ab solid 2px"
                                        : "",
                                      opacity: isActive ? 1 : "",
                                    })}
                                    to={mapC.url_chucnang ?? ""}
                                    onClick={menuItemHandleClick}
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
                                        {mapC.ten_chucnang ?? "Chưa có tên"}
                                      </span>
                                    </Stack>
                                  </NavLink>
                                </Navbar>
                              </div>
                            ))
                        }
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
