import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { numberToStringMoney } from "../../../utils/utilsFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const ItemGrid = ({ item }: { item: FukudaSonSanPhamType }) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Row className="align-items-center">
            <Col xs={4} md={4}>
              <Card.Subtitle className="text-center text-primary fw-bold">
                {item.ma_hh_nhacungcap}
              </Card.Subtitle>
            </Col>
            <Col xs={4} md={4}>
              <Card.Subtitle className="text-center text-danger text-decoration-line-through">
                {numberToStringMoney(item.dongia_ban)}
              </Card.Subtitle>
            </Col>
            <Col xs={4} md={4}>
              <Card.Subtitle className="text-center text-success">
                {numberToStringMoney(item.dongia_goc)}
              </Card.Subtitle>
            </Col>
          </Row>
        </Card.Header>

        <Row className="justify-content-center align-items-center">
          <Col xs={8}>
            <Card.Img
              // variant="top"
              style={{ maxWidth: "250px", maxHeight: "250px" }}
              src={item.hinhanh_url ?? ""}
            ></Card.Img>
          </Col>

          <Card.Subtitle as={Col} xs={4} className="text-center text-info">
            <Row> {item.ten_quydoi}</Row>
            <Row>{item.quycach}</Row>
          </Card.Subtitle>
        </Row>

        <Card.Body>
          <Card.Text>{item.ten_hh}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack gap={1} direction="horizontal">
            <span
              style={{ fontSize: "0.7rem" }}
              className="text-muted text-sm-start fst-italic"
            >
              {item.ma_hh_nhom}
            </span>
            <div className="ms-auto"></div>
            <Button size="sm" variant="muted">
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
            <Button size="sm" variant="muted" onClick={() => {}}>
              <FontAwesomeIcon icon={faPencil} />
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </>
  );
};
