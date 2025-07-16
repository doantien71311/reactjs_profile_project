import { Col, Form, Row, Image } from "react-bootstrap";
import { NumericFormat } from "react-number-format";

export const FormEdit = () => {
  return (
    <>
      <Form className="m-3">
        <Row>
          <Col sm={12} md={3}>
            <Form.Group>
              <Form.Label>Hình ảnh</Form.Label>
              <input
                className=""
                type="file"
                accept="image/*"
                // onChange={(event) => handleFileChangeIllustrationImage(event)}
              />
              <Image key="asd" src="" fluid rounded></Image>
            </Form.Group>
          </Col>
          <Col sm={12} md={9}>
            <Form.Group as={Col}>
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mã sản phẩm</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>

            <Row>
              <Form.Group as={Col} sm={12} md={4}>
                <Form.Label>Mã quy cách</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12} md={4}>
                <Form.Label>Quy cách</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12} md={4}>
                <Form.Label>Đơn vị tính</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Đơn giá gốc</Form.Label>
                <Col>
                  <NumericFormat
                    style={{
                      textAlign: "right",
                      width: "100%",
                    }}
                    // value={value}
                    // onValueChange={(values) => {
                    //   setValue(values.value);
                    // }}
                    thousandSeparator={true}
                    // prefix="$"
                    decimalScale={0}
                    fixedDecimalScale={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Đơn giá bán</Form.Label>
                <Col>
                  <NumericFormat
                    style={{
                      textAlign: "right",
                      width: "100%",
                    }}
                    // value={value}
                    // onValueChange={(values) => {
                    //   setValue(values.value);
                    // }}
                    thousandSeparator={true}
                    // prefix="$"
                    decimalScale={0}
                    fixedDecimalScale={true}
                  />
                </Col>
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Nhóm mặt hàng</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};
