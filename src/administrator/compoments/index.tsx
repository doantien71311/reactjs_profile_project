import "bootstrap/dist/css/bootstrap.css";
// import "react-data-grid/lib/styles.css";
import { MenuIndex } from "./menu/MenuIndex";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";

export const AdministratorNav = () => {
  return (
    <Container fluid>
      <Row></Row>
      <Row>
        <Col xs={3} className="col align-self-start">
          <MenuIndex />
        </Col>
        <Col xs={9} className="col align-self-start">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
