import { ReactNode } from "react";
import { Col } from "react-bootstrap";

export type CommonTitleBodyUIProps = { title: ReactNode; body: ReactNode };
export const CommonTitleBodyUI = ({ title, body }: CommonTitleBodyUIProps) => {
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
      </Col>
      {/* </Container> */}
    </>
  );
};
