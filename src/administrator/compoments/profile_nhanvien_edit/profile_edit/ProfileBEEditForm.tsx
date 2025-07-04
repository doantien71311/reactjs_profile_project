import { Accordion, Container, Form, Row } from "react-bootstrap";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";
import { useContext, useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import { ProfileBEKyNangIndex } from "./ProfileBEKyNangIndex";
import { ProfileBEQuaTrinhLamViecIndex } from "./ProfileBEQuaTrinhLamViecIndex";
import { ProfileBEAnhDaiDienIndex } from "./ProfileBEAnhDaiDienIndex";

export const ProfileBEEditForm = () => {
  const initialized = useRef(false);
  const { quill, quillRef } = useQuill();
  const useData =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).dataApi;
  const isLoadingApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).isLoadingApi;

  const setDataApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).setDataApi;

  const handleChangeTenNV = (event: string) => {
    setDataApi({
      ...useData,
      ten_nv: event,
    });
  };
  const handleChangeDienThoai = (event: string) => {
    setDataApi({
      ...useData,
      dienthoai: event,
    });
  };

  const handleChangeMoTa = (event: string) => {
    setDataApi({
      ...useData,
      mota: event,
    });
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (quill && !isLoadingApi) {
      quill.on("text-change", () => {
        // console.log("Text change!");
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        handleChangeMoTa(quillRef.current.firstChild.innerHTML);
      });
      //console.log(useData.mota);
      quill?.clipboard.dangerouslyPasteHTML(useData.mota ?? "");
    }

    return () => {
      console.log("Cách 2 ProfileBEEditForm: useEffect - count - cleanup");
    };
  }, [quill, isLoadingApi]);

  return (
    <>
      <Accordion
        className="row_body_edit_bottom_accordion"
        defaultActiveKey={[
          "thongtincanhan",
          "hinhanh",
          "kynang",
          "quatrinhlamviec",
          "hocvan",
          "mota",
        ]}
        alwaysOpen
      >
        <Accordion.Item eventKey="thongtincanhan">
          <Accordion.Header>THÔNG TIN CÁ NHÂN</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Họ và tên:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={useData.ten_nv ?? ""}
                  onChange={(event) => handleChangeTenNV(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Điện thoại:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={useData.dienthoai ?? ""}
                  onChange={(event) =>
                    handleChangeDienThoai(event.target.value)
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={useData.email ?? ""}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Địa chỉ liên hệ:</Form.Label>
                <Form.Control
                  type="text"
                  value={useData.diachi_thuongtru ?? ""}
                  placeholder=""
                />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* <Accordion.Item eventKey="34">
          <Accordion.Header>HÌNH ẢNH</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Col xs={2} md={3}>
                <Row>
                  {useData.profile_nhanvien_hinhanh?.map((item) => (
                    <Image src={item.url_hinhanh ?? ""} rounded />
                  ))}
                </Row>
              </Col>
            </Container>
          </Accordion.Body>
        </Accordion.Item> */}
        <ProfileBEAnhDaiDienIndex></ProfileBEAnhDaiDienIndex>

        <ProfileBEKyNangIndex></ProfileBEKyNangIndex>

        <ProfileBEQuaTrinhLamViecIndex></ProfileBEQuaTrinhLamViecIndex>

        <Accordion.Item eventKey="hocvan">
          <Accordion.Header>HỌC VẤN</Accordion.Header>
          <Accordion.Body>
            <Container key="hocvan-container" fluid>
              {useData.profile_nhanvien_hocvan?.map((item) => (
                <Row key="hocvan-container-row">
                  <Form>
                    <Form.Label>{item.thoigian_hocvan}</Form.Label>
                    <Form.Label>{item.chuyennganh_hocvan}</Form.Label>
                    <Form.Label>{item.chuyennganh_hocvan}</Form.Label>
                    <Form.Label>{item.bangcap_hocvan}</Form.Label>
                  </Form>
                </Row>
              ))}
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="mota">
          <Accordion.Header>MÔ TẢ BẢN THÂN</Accordion.Header>
          <Accordion.Body>
            <div style={{ width: "100%", height: "100%" }}>
              <div ref={quillRef} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
