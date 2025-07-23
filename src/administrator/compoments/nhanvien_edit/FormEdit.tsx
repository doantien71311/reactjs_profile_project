import {
  Col,
  Form,
  Row,
  Image,
  Stack,
  InputGroup,
  Button,
} from "react-bootstrap";
import { EditContext, EditContextProps } from "./Context";
import { useContext, useEffect, useRef, useState } from "react";
import { ChucVuType, ChucVuTypeList } from "../../../model/ChucVuType ";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LookupTinhThanhPho } from "../lookup/LookupTinhThanhPho";
import { DsTinhThanhPhoType } from "../../../model/DsTinhThanhPhoType";
import { LookupQuanHuyen } from "../lookup/LookupQuanHuyen";
import { DsQuanHuyenType } from "../../../model/DsQuanHuyenType";
import { LookupPhuongXa } from "../lookup/LookupPhuongXa";
import { DsPhuongXaType } from "../../../model/DsPhuongXaType";
import UrlApi from "../../../services/UrlApi";
import { uploadSingleImage } from "../../../services/HttpServices";

//
export const FormEdit = () => {
  const { dataApi, setDataApi } = useContext<EditContextProps>(EditContext);
  const [listChucVu] = useState<ChucVuType[]>(ChucVuTypeList());
  //
  const [isShowLookupTinhTP, setIsShowLookupTinhTP] = useState(false);
  const [isShowLookupQuanHuyen, setIsShowLookupQuanHuyen] = useState(false);
  const [isShowLookupPhuongXa, setIsShowLookupPhuongXa] = useState(false);
  //
  const intialized = useRef(false);

  useEffect(() => {
    if (intialized.current) return;
    intialized.current = true;
  }, []);

  //#region các hàm private
  const handleFileDeleteImage = () => {
    setDataApi({
      ...dataApi,
      url_hinhanh: "",
    });
  };
  const handleUploadImageChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
    // event: React.ChangeEvent<FormControlElement> | undefined
  ) => {
    if (!event) return;
    const files = event.currentTarget.files;
    if (!files) return;
    const file = files[0];
    console.log(file);
    uploadSingleImage(`${UrlApi.api_image_upload_anh_dai_dien}`, file).then(
      (data) => {
        setDataApi({
          ...dataApi,
          url_hinhanh: data.file_url,
        });
      }
    );
  };
  const handleChangeMaNV = (value: string) => {
    setDataApi({ ...dataApi, ma_nv: value });
  };
  const handleChangeTenNV = (value: string) => {
    setDataApi({ ...dataApi, ten_nv: value });
  };
  const handleChangeChucVu = (value: string) => {
    let ten_chucvu = "";
    const rowChucVu = listChucVu.find((f) => f.ma_chucvu == value);
    if (rowChucVu !== undefined && rowChucVu != null) {
      ten_chucvu = rowChucVu?.ten_chucvu;
    }
    setDataApi({ ...dataApi, ma_chucvu: value, ten_chucvu: ten_chucvu });
  };
  const handleChangeNgaySinh = (value: Date | null) => {
    setDataApi({ ...dataApi, ngaysinh: value ?? new Date() });
  };

  const handleChangeDiaChiThuongTru = (value: string) => {
    setDataApi({ ...dataApi, diachi_thuongtru: value });
  };

  const handleChangeDienThoai = (value: string) => {
    setDataApi({ ...dataApi, dienthoai: value });
  };
  const handleChangeEmail = (value: string) => {
    setDataApi({ ...dataApi, email: value });
  };

  const getCheckChucVu = (value: string): boolean => {
    if (value === dataApi.ma_chucvu) return true;
    return false;
  };

  const handleSearchMaTinhThanhPho = () => {
    setIsShowLookupTinhTP(true);
  };
  const getDataFromLookupTinhThanhPho = (item?: DsTinhThanhPhoType) => {
    if (item == null) return;
    const diachi_thuongtru = getDiaChiThuongTru(
      item.ten_tinhthanhpho,
      dataApi.ten_quanhuyen,
      dataApi.ten_phuongxa
    );
    setDataApi({
      ...dataApi,
      ma_tinhthanhpho: item.ma_tinhthanhpho,
      ten_tinhthanhpho: item.ten_tinhthanhpho,
      diachi_thuongtru: diachi_thuongtru,
    });
  };

  const handleSearchMaQuanHuyen = () => {
    setIsShowLookupQuanHuyen(true);
  };

  const getTranferDataLookupQuanHuyen = (item?: DsQuanHuyenType) => {
    if (item == null) return;
    const diachi_thuongtru = getDiaChiThuongTru(
      dataApi.ten_tinhthanhpho,
      item.ten_quanhuyen,
      dataApi.ten_phuongxa
    );
    setDataApi({
      ...dataApi,
      ma_quanhuyen: item.ma_quanhuyen,
      ten_quanhuyen: item.ten_quanhuyen,
      diachi_thuongtru: diachi_thuongtru,
    });
  };

  const handleSearchMaPhuongXa = () => {
    setIsShowLookupPhuongXa(true);
  };

  const getTranferDataLookupPhuongXa = (item?: DsPhuongXaType) => {
    if (item == null) return;
    const diachi_thuongtru = getDiaChiThuongTru(
      dataApi.ten_tinhthanhpho,
      dataApi.ten_quanhuyen,
      item.ten_phuongxa
    );
    setDataApi({
      ...dataApi,
      ma_phuongxa: item.ma_phuongxa,
      ten_phuongxa: item.ten_phuongxa,
      diachi_thuongtru: diachi_thuongtru,
    });
  };

  const getDiaChiThuongTru = (
    ten_tinhthanhpho: string = "",
    ten_quanhuyen: string = "",
    ten_phuongxa: string = ""
  ) => {
    let result = `${ten_tinhthanhpho}, ${ten_quanhuyen}, ${ten_phuongxa}`;
    result = result.replace(",,,", ",");
    result = result.replace(", ,", ",");
    result = result.replace(",,", ",");
    return result;
  };

  //#endregion các hàm private

  return (
    <>
      <LookupTinhThanhPho
        isShow={isShowLookupTinhTP}
        setShow={setIsShowLookupTinhTP}
        tranferData={getDataFromLookupTinhThanhPho}
      />
      <LookupQuanHuyen
        isShow={isShowLookupQuanHuyen}
        setShow={setIsShowLookupQuanHuyen}
        tranferData={getTranferDataLookupQuanHuyen}
        maTinhThanhPho={dataApi.ma_tinhthanhpho ?? ""}
      />

      <LookupPhuongXa
        isShow={isShowLookupPhuongXa}
        setShow={setIsShowLookupPhuongXa}
        tranferData={getTranferDataLookupPhuongXa}
        maTinhThanhPho={dataApi.ma_tinhthanhpho ?? ""}
        maQuanHuyen={dataApi.ma_quanhuyen ?? ""}
      />

      <Form className="m-3">
        <Row>
          <Col sm={12} md={3}>
            <Form.Group>
              <Form.Label>Hình ảnh</Form.Label>
              <Stack direction="horizontal" gap={1}>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  className=""
                  onClick={() => handleFileDeleteImage()}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
                <input
                  className=""
                  type="file"
                  placeholder=""
                  accept="image/*"
                  onChange={(event) => handleUploadImageChange(event)}
                />
              </Stack>

              <Image
                key=""
                style={{
                  height: "inherit",
                  width: "inherit",
                  maxHeight: "250px",
                  maxWidth: "300px",
                }}
                src={dataApi.url_hinhanh}
                rounded
              ></Image>
            </Form.Group>
          </Col>
          <Col sm={12} md={9}>
            <Form.Group>
              <Form.Label>Mã nhân viên</Form.Label>
              <Form.Control
                type="text"
                value={dataApi.ma_nv ?? ""}
                onChange={(event) => handleChangeMaNV(event?.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Tên nhân viên</Form.Label>
              <Form.Control
                type="text"
                value={dataApi.ten_nv ?? ""}
                onChange={(event) => handleChangeTenNV(event?.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // pattern=""
                // required
                value={dataApi.email ?? ""}
                onChange={(event) => handleChangeEmail(event?.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Form.Group as={Col} sm={12} md={9}>
                <Form.Label>Điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={dataApi.dienthoai ?? ""}
                  onChange={(event) =>
                    handleChangeDienThoai(event?.target.value)
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={12} md={3}>
                <Form.Label>Ngày sinh</Form.Label>
                <Col>
                  <DatePicker
                    selected={dataApi.ngaysinh ?? new Date()}
                    dateFormat="dd/MM/yyyy"
                    // locale="vi"
                    showTimeSelect={false}
                    onChange={(dataDate) => handleChangeNgaySinh(dataDate)}
                  ></DatePicker>
                </Col>
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Form.Group as={Col} sm={12} md={12}>
            <Form.Label>Chức vụ:</Form.Label>
            <Stack direction="horizontal">
              {listChucVu.map((item) => (
                <>
                  <Form.Check
                    inline
                    label={item.ten_chucvu}
                    name="group-chuc-vu"
                    value={item.ma_chucvu}
                    type="radio"
                    checked={getCheckChucVu(item.ma_chucvu)}
                    onChange={(event) => handleChangeChucVu(event.target.value)}
                    // id={`inline-${type}-1`}
                  />
                </>
              ))}
            </Stack>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={12}>
            <Form.Label>Mã tỉnh/TP:</Form.Label>
            <Row>
              <Col sm={12} md={3}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    value={dataApi.ma_tinhthanhpho ?? ""}
                    readOnly
                  ></Form.Control>
                  <Button onClick={() => handleSearchMaTinhThanhPho()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </InputGroup>
              </Col>
              <Form.Group as={Col} sm={12} md={9}>
                <Form.Control
                  type="text"
                  value={dataApi.ten_tinhthanhpho ?? ""}
                  readOnly
                ></Form.Control>
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={12}>
            <Form.Label>Mã quận huyện:</Form.Label>
            <Row>
              <Col as={Col} sm={12} md={3}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    value={dataApi.ma_quanhuyen ?? ""}
                    readOnly
                  ></Form.Control>
                  <Button onClick={() => handleSearchMaQuanHuyen()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </InputGroup>
              </Col>
              <Form.Group as={Col} sm={12} md={9}>
                <Form.Control
                  type="text"
                  value={dataApi.ten_quanhuyen ?? ""}
                  readOnly
                ></Form.Control>
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} sm={12}>
            <Form.Label>Mã phường xã:</Form.Label>

            <Row>
              <Col as={Col} sm={12} md={3}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    value={dataApi.ma_phuongxa ?? ""}
                    readOnly
                  ></Form.Control>
                  <Button onClick={() => handleSearchMaPhuongXa()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </InputGroup>
              </Col>
              <Form.Group as={Col} sm={12} md={9}>
                <Form.Control
                  type="text"
                  value={dataApi.ten_phuongxa ?? ""}
                  readOnly
                ></Form.Control>
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Địa chỉ thường trú:</Form.Label>
            <Form.Control
              type="text"
              value={dataApi.diachi_thuongtru ?? ""}
              onChange={(event) =>
                handleChangeDiaChiThuongTru(event?.target.value)
              }
            ></Form.Control>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};
