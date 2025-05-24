import "bootstrap/dist/css/bootstrap.css";
import "react-data-grid/lib/styles.css";
import "./BEIndex.css";
import { MenuIndex } from "./menu/MenuIndex";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
import { HeaderIndex } from "./header/HeaderIndex";
import { BEContext, BEContextProps } from "./BEContext";
import { useContext, useEffect } from "react";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export const BEIndex = () => {
  const { isShowMenu } = useContext<BEContextProps>(BEContext);
  useEffect(() => {
    console.log("useIsShowMenu Menu Index :" + isShowMenu.toString());
    return () => {};
  }, [isShowMenu]);
  return (
    <>
      <Container fluid className="back_end">
        <Col xs={12} md={12} className={" w-100 h-25" + " header_be"}>
          <HeaderIndex />
        </Col>
        {/* align-items-start */}
        <Row className="w-100 p-2 h-75 row_body">
          <Col xs={12} md={3} className="h-100 p-1" hidden={!isShowMenu}>
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
