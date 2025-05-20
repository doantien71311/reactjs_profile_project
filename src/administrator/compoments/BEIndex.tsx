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
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export const BEIndex = () => {
  return (
    <Container fluid className="back_end">
      <Col xs={12} md={12} className={" w-100 p-3 h-25" + " be-header"}>
        <header>Đây là header</header>
      </Col>
      <Row className="w-100 p-2 h-75 align-items-start row_body">
        <Col xs={12} md={3} className="h-100">
          <MenuIndex />
        </Col>
        <Col
          xs={12}
          md={9}
          // className="bg-warning h-100 justify-content-md-center justify-content-center align-items-center align-self-center row_body_main_right"
          className=" p-0 h-100 row_body_main_right"
        >
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
