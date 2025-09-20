import "bootstrap/dist/css/bootstrap.css";
import "react-data-grid/lib/styles.css";
import "./BEIndex.css";
import { MenuIndex } from "./menu/MenuIndex";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
// or const { useQuill } = require('react-quilljs');
// import "quill/dist/quill.snow.css"; // Add css for snow theme
//
import { Quill } from "react-quill-new";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);
import "react-quill-new/dist/quill.snow.css";
//
import { HeaderIndex } from "./header/HeaderIndex";
import { BEContext, BEContextProps } from "./BEContext";
import { useContext, useEffect, useRef } from "react";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import "react-datepicker/dist/react-datepicker.css";
//
export const BEIndex = () => {
  const { isShowMenu } = useContext<BEContextProps>(BEContext);
  const initialized = useRef(false);
  //
  useEffect(() => {
    // console.log("useIsShowMenu Menu Index :" + isShowMenu.toString());
    return () => {};
  }, [isShowMenu]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    document.title = "Portal MrTien71311";
    // const link =
    //   document.querySelector("link[rel*='icon']") ||
    //   document.createElement("link");
    // link.setAttribute("link", "image/x-icon");
    // link.setAttribute("rel", "shortcut icon");
    // link.setAttribute(
    //   "href",
    //   "https://lh3.googleusercontent.com/d/1SrX-uEuEFAjjbRBgw6pjucT2gHRW9sgA=w100"
    // );
    // document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  return (
    <>
      <Container fluid className="back_end">
        <Col xs={12} md={12} className={" w-100 h-25" + " header_be"}>
          <HeaderIndex />
        </Col>
        {/* align-items-start */}
        <Row
          //  className="w-100 p-2 h-75 row_body"
          className="w-100 p-1 h-75 row_body"
        >
          <Col
            xs={12}
            md={3}
            style={
              {
                // border: "1px solid red",
              }
            }
            className="h-100 p-1"
            hidden={!isShowMenu}
          >
            <MenuIndex />
          </Col>
          <Col
            xs={12}
            md={isShowMenu ? 9 : 12}
            // className="bg-warning h-100 justify-content-md-center justify-content-center align-items-center align-self-center row_body_main_right"
            className=" p-0 h-100 row_body_main_right"
          >
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
