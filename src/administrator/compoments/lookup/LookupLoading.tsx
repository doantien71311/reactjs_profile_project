import { Col, Container, Row, Spinner } from "react-bootstrap";
import BEConstCSS from "../BEConstCSS";

export const LookupLoading = () => {
  return (
    <>
      <div className={BEConstCSS.grid_lookup_loading}></div>
      <Container fluid>
        <Row className="position-absolute bottom-50 end-50">
          <Col className="d-flex align-items-center justify-content-center h-auto w-auto p-0">
            <Spinner animation="border" variant="primary"></Spinner>
            <span className="opacity-100 align-items-center justify-content-center h-auto w-auto p-0 text-info w-100 p-3 fw-bold">
              Đang tải dữ liệu...
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};
