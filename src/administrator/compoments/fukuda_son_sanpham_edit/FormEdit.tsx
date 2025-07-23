import { Col, Form, Row, Image, Stack } from "react-bootstrap";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { EditContext, EditContextProps } from "./Context";
import { useContext, useEffect, useRef, useState } from "react";
import {
  NhomHangSanPhamType,
  NhomHangSanPhamTypeList,
} from "../../../model/NhomHangSanPhamType";
import {
  QuyCachSanPhamType,
  QuyCachSanPhamTypeList,
} from "../../../model/QuyCachSanPhamType";

export const FormEdit = () => {
  const { dataApi, setDataApi } = useContext<EditContextProps>(EditContext);
  const [listNhomHang] = useState<NhomHangSanPhamType[]>(
    NhomHangSanPhamTypeList()
  );
  const [listQuyCach] = useState<QuyCachSanPhamType[]>(
    QuyCachSanPhamTypeList()
  );
  const intialized = useRef(false);

  useEffect(() => {
    if (intialized.current) return;
    intialized.current = true;
    // getCheckNhomHang(dataApi.ma_hh_nhom ?? "");
  }, []);

  //#region các hàm private
  const handleChangeMaHHNCC = (value: string) => {
    setDataApi({ ...dataApi, ma_hh_nhacungcap: value });
  };
  const handleChangeTenHHNCC = (value: string) => {
    setDataApi({ ...dataApi, ten_hh: value });
  };
  const handleChangeQuyCach = (value: string) => {
    setDataApi({ ...dataApi, quycach: value });
  };
  const handleChangeDonGiaGoc = (numberFormatValues?: NumberFormatValues) => {
    setDataApi({ ...dataApi, dongia_goc: numberFormatValues?.floatValue });
  };
  const handleChangeDonGiaBan = (numberFormatValues?: NumberFormatValues) => {
    // console.log(numberFormatValues?.floatValue);
    setDataApi({ ...dataApi, dongia_ban: numberFormatValues?.floatValue });
  };
  const handleChangeMaQuyCach = (value: string) => {
    console.log(value);
    setDataApi({ ...dataApi, ma_quydoi: value });
  };
  const handleChangeNhomHang = (value: string) => {
    console.log(value);
    setDataApi({ ...dataApi, ma_hh_nhom: value });
  };

  const getCheckNhomHang = (value: string): boolean => {
    if (value === dataApi.ma_hh_nhom) return true;
    return false;
  };
  const getCheckQuyCach = (value: string): boolean => {
    if (value === dataApi.ma_quydoi) return true;
    return false;
  };
  //#endregion các hàm private

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
                placeholder="dasdas"
                accept="image/*"
                // onChange={(event) => handleFileChangeIllustrationImage(event)}
              />
              <Image
                key=""
                style={{ height: "inherit" }}
                src={dataApi.hinhanh_url}
                fluid
                rounded
              ></Image>
            </Form.Group>
          </Col>
          <Col sm={12} md={9}>
            <Form.Group as={Col}>
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={dataApi.ten_hh ?? ""}
                onChange={(event) => handleChangeTenHHNCC(event?.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mã sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={dataApi.ma_hh_nhacungcap ?? ""}
                onChange={(event) => handleChangeMaHHNCC(event?.target.value)}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Mã quy cách</Form.Label>
                <Stack direction="horizontal">
                  {listQuyCach.map((item) => (
                    <>
                      <Form.Check
                        inline
                        label={item.ten_nhom_hh}
                        name="group-quy-cach-san-pham"
                        value={item.ma_nhom_hh}
                        type="radio"
                        checked={getCheckQuyCach(item.ma_nhom_hh)}
                        onChange={(event) =>
                          handleChangeMaQuyCach(event.target.value)
                        }
                        // id={`inline-${type}-1`}
                      />
                    </>
                  ))}
                </Stack>
              </Form.Group>
              <Form.Group as={Col} sm={12} md={3}>
                <Form.Label>Quy cách</Form.Label>
                <Form.Control
                  type="text"
                  value={dataApi.quycach}
                  onChange={(event) => handleChangeQuyCach(event?.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12} md={3}>
                <Form.Label>Đơn vị tính</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={dataApi.ten_dvt}
                ></Form.Control>
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
                    value={dataApi.dongia_goc}
                    onValueChange={(value) => handleChangeDonGiaGoc(value)}
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
                    value={dataApi.dongia_ban}
                    onValueChange={(value) => handleChangeDonGiaBan(value)}
                  />
                </Col>
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Nhóm mặt hàng</Form.Label>
          <Stack direction="horizontal">
            {listNhomHang.map((item) => (
              <>
                <Form.Check
                  inline
                  label={item.ten_nhom_hh}
                  value={item.ma_nhom_hh}
                  checked={getCheckNhomHang(item.ma_nhom_hh ?? "")}
                  onChange={(event) => handleChangeNhomHang(event.target.value)}
                  name="group-nhom-mat-hang"
                  type="radio"
                />
              </>
            ))}
          </Stack>
        </Form.Group>
      </Form>
    </>
  );
};
