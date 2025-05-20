import { ReactNode } from "react";
import { Col, Form, Modal } from "react-bootstrap";

// export type CommonTitleBodyEditUIProps = { title: ReactNode; body: ReactNode };
export const CommonTitleBodyEditUI = ({
  title,
  body,
  isSavingData,
}: {
  title: ReactNode;
  body: ReactNode;
  isSavingData: boolean;
}) => {
  return (
    <>
      <Modal show={isSavingData}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật dữ liệu XXXX</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Đang lưu dữ liệu .......</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Col
        md={12}
        className="w-100 h-100 row_body_edit_toolbar_top"
        // style={{ width: "100%" }}
      >
        {title}
      </Col>

      <Col md={12} className="w-100 h-100 row_body_edit_grid_bottom">
        {body}
      </Col>
    </>
  );
};
