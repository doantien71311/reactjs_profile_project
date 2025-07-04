import { ReactNode, useContext } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { BEContext, BEContextProps } from "../BEContext";
import BEConstCSS from "../BEConstCSS";

export type CommonTitleBodyUIProps = { title: ReactNode; body: ReactNode };
export const CommonTitleBodyUI = ({ title, body }: CommonTitleBodyUIProps) => {
  const { isCommonLoadingApi } = useContext<BEContextProps>(BEContext);
  return (
    <>
      {/* <Container fluid className="bg-success" style={{ height: "100wh" }}> */}
      <Col
        md={12}
        className="w-100 align-self-end row_body_toolbar_top"
        style={{ width: "100%" }}
      >
        {title}
      </Col>
      <Col
        md={12}
        className="w-100 p-0 row_body_grid_bottom"
        // style={{
        //   width: "1fr",
        //   height: "1000px",
        //   backgroundColor: "green",
        // }}
      >
        {body}
        {isCommonLoadingApi ? (
          <>
            <div className={BEConstCSS.grid_fill_loading}></div>
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
        ) : (
          <></>
        )}
      </Col>
      {/* </Container> */}
    </>
  );
};
