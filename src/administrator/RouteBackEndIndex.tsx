import { Col, Container, Row, Image } from "react-bootstrap";

export const RouteBackEndIndex = () => {
  return (
    <Container
      fluid
      style={{
        width: "100%",
        height: "100%",
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
            srcSet="
            https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb=w480 480w,
            https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb=w800 800w,
            https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb=w1000 1000w"
            src="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb"
            // sizes="(max-with: 575px) 300px, (max-with: 991px) 700px, 900px"
            sizes="(max-width: 575px) 480px,  (max-with: 991px) 800px, 1000px"
            alt="Image"
            style={{
              width: "20rem",
              height: "20rem",
            }}
          ></Image>

          {/* <picture
            style={{
              width: "20rem",
              height: "20rem",
            }}
          >
            <source
              media="(width < 575px)"
              srcSet="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb=w480"
            />
            <source
              media="(width < 991px)"
              srcSet="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb=w500"
            />
            <source
              media="(width > 1000px)"
              srcSet="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb=w1000"
            />
            <img
              src="https://lh3.googleusercontent.com/d/1azMaUw_0-_46sQuTtFrvdeOshyxhKQnb"
              alt="qr code"
            />
          </picture> */}
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
