import { ReactNode, useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { BEContext, BEContextProps } from "../BEContext";
import BEConstCSS from "../BEConstCSS";
import CommonPostStatus from "./CommonPostStatus";

// export type CommonTitleBodyEditUIProps = { title: ReactNode; body: ReactNode };
export const CommonTitleBodyEditUI = ({
  title,
  body,
}: {
  title: ReactNode;
  body: ReactNode;
}) => {
  const {
    isCommonLoadingApi,
    commonPostingApi,
    setCommonPostingApi,
    responseApiCommon,
  } = useContext<BEContextProps>(BEContext);
  const [show, setShow] = useState(false);
  //
  useEffect(() => {
    if (commonPostingApi === CommonPostStatus.saved) {
      setShow(true);
      setCommonPostingApi("");
    }
    return () => {
      // console.log(
      //   "ProfileBEEditProvider: useEffect setIsCommonLoadingApi - count - cleanup"
      // );
    };
  }, [commonPostingApi]);

  const getStatus = () => {
    let text_status = "text-danger";
    if ((responseApiCommon.status ?? "") == "200") text_status = "text-success";
    return `${text_status} fw-bold`;
  };

  return (
    <>
      <ToastContainer
        className="p-3"
        position="top-center"
        style={{ zIndex: 1 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          {/* <Toast.Body>Lưu thành công</Toast.Body> */}
          <Toast.Body className={getStatus()}>
            {responseApiCommon.message ?? ""}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Col
        md={12}
        className="w-100 h-100 row_body_edit_toolbar_top"
        // style={{ width: "100%" }}
      >
        {title}
      </Col>

      <Col md={12} className="w-100 h-100 row_body_edit_grid_bottom">
        {body}
        {isCommonLoadingApi ? (
          <>
            <div className={BEConstCSS.edit_fill_loading}></div>
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
        {commonPostingApi === CommonPostStatus.saving ? (
          <>
            <div
              // style={{ width: "100%", height: "100%" }}
              className={BEConstCSS.edit_fill_loading}
            ></div>
            <Container fluid>
              <Row className="bottom-50 end-50">
                <Col className="d-flex align-items-center justify-content-center h-auto w-auto p-0">
                  <Spinner animation="border" variant="primary"></Spinner>
                  <span className="opacity-100 align-items-center justify-content-center h-auto w-auto p-0 text-info w-100 p-3 fw-bold">
                    Đang lưu dữ liệu...
                  </span>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <></>
        )}
      </Col>
    </>
  );
};
