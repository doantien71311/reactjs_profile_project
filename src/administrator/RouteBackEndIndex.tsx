import { Col, Container, Row, Image } from "react-bootstrap";

export const RouteBackEndIndex = () => {
  return (
    <Container
      fluid
      style={{
        width: "100%",
        height: "100vh",
        // backgroundColor: "red",
      }}
      // className="align-items-center justify-content-center"
    >
      <Col
        xs={12}
        md={12}
        style={
          {
            //width: "100%",
            // height: "100vh",
            // backgroundColor: "red",
          }
        }
        className="h-100 w-100 align-items-center justify-content-between align-middle"
      >
        <Row
          style={
            {
              //width: "100%",
              // height: "100vh",
              // backgroundColor: "green",
            }
          }
          className="justify-content-center p-2 "
        >
          <Image
            thumbnail
            src="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb"
            style={{
              width: "20rem",
              height: "20rem",
            }}
          ></Image>
        </Row>
        <Row
          style={
            {
              //width: "100%",
              // height: "100vh",
              // backgroundColor: "green",
            }
          }
          className="justify-content-center fw-bold fs-3 text-center p-2 text-warning "
        >
          WEB PORTAL HỆ THỐNG QUẢN TRỊ MRTIEN71311 .NET DEVELOPER
        </Row>
        <Row className="justify-content-center fst-italic fs-3 text-center text-primary">
          Đổi mới-Chăm chỉ-Hòa đồng
        </Row>
      </Col>
    </Container>
  );
};
