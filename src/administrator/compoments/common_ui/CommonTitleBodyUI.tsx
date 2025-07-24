import { ReactNode, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Spinner,
  Stack,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { BEContext, BEContextProps } from "../BEContext";
import CommonStatus from "../common_props/CommonStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CommonLoading } from "./CommonLoading";

export type CommonTitleBodyUIProps = { title: ReactNode; body: ReactNode };
export const CommonTitleBodyUI = ({ title, body }: CommonTitleBodyUIProps) => {
  const {
    isCommonLoadingApi,
    responseApiCommon,
    statusApi,
    rowDataCommon,
    statusDeleteQuestionCommon,
    setStatusDeleteQuestionCommon,
  } = useContext<BEContextProps>(BEContext);
  //
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [show, setShow] = useState(false);
  //
  useEffect(() => {
    console.log("statusApi: ");
    console.log(statusApi);
    if (statusApi === CommonStatus.deleted) {
      setShow(true);
    } else {
      setShow(false);
    }
    return () => {
      // console.log("EnglishDisplayList");
    };
  }, [statusApi]);

  useEffect(() => {
    if (statusApi === CommonStatus.deleted) {
      setShowPopupDelete(false);
    }
    return () => {
      // console.log("EnglishDisplayList");
    };
  }, [statusApi]);

  useEffect(() => {
    console.log("statusDeleteQuestion: ");
    console.log(statusDeleteQuestionCommon);
    if (statusDeleteQuestionCommon === CommonStatus.question_delete) {
      setShowPopupDelete(true);
    }
    return () => {
      // console.log("EnglishDisplayList");
    };
  }, [statusDeleteQuestionCommon]);
  //
  const handelDeleteWord = (value: string) => {
    setStatusDeleteQuestionCommon(value);
    if (value !== CommonStatus.question_delete_yes) {
      handelClosePopup();
    }
  };
  const handelClosePopup = () => {
    setShowPopupDelete(false);
    setStatusDeleteQuestionCommon("");
    console.log("handelClosePopup CommonTitleBodyUI");
  };

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
        style={{ zIndex: 100 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className={getStatus()}>
            {responseApiCommon.message ?? ""}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showPopupDelete} onHide={handelClosePopup}>
        <Modal.Header>
          <Modal.Title>Thông báo xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn muốn Xóa : {rowDataCommon.title ?? ""}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handelDeleteWord(CommonStatus.question_delete_yes)}
          >
            <Stack direction="horizontal" gap={2}>
              {statusApi === CommonStatus.deleting ? (
                <>
                  <Spinner animation="border" variant="light" size="sm" />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faTrash} />
                </>
              )}
              <span>Có</span>
            </Stack>
          </Button>

          <Button
            variant="secondary"
            onClick={() => handelDeleteWord(CommonStatus.question_delete_no)}
          >
            <span>Không</span>
          </Button>
        </Modal.Footer>
      </Modal>

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
            {/* <div className={BEConstCSS.grid_fill_loading}></div>
            <Container fluid>
              <Row className="position-absolute bottom-50 end-50">
                <Col className="d-flex align-items-center justify-content-center h-auto w-auto p-0">
                  <Spinner animation="border" variant="primary"></Spinner>
                  <span className="opacity-100 align-items-center justify-content-center h-auto w-auto p-0 text-info w-100 p-3 fw-bold">
                    Đang tải dữ liệu...
                  </span>
                </Col>
              </Row>
            </Container> */}

            <CommonLoading />
          </>
        ) : (
          <></>
        )}
      </Col>
      {/* </Container> */}
    </>
  );
};
