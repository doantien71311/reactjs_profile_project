import { Accordion, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";
import {
  useContext,
  useEffect,
  useMemo,
  // useMemo,
  useRef,
  useState,
  startTransition,
} from "react";
import { ProfileBEKyNangIndex } from "./ProfileBEKyNangIndex";
import { ProfileBEQuaTrinhLamViecIndex } from "./ProfileBEQuaTrinhLamViecIndex";
import { ProfileBEAnhDaiDienIndex } from "./ProfileBEAnhDaiDienIndex";
import ReactQuill from "react-quill-new";

//
// import ImageResize from "quill-image-resize-module-react";
// Quill.register("modules/imageResize", ImageResize);
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ProfileBEDinhHuongIndex } from "./ProfileBEDinhHuongIndex";
import { ProfileBEHocVanIndex } from "./ProfileBEHocVanIndex";
//
export const ProfileBEEditForm = () => {
  const {
    dataApi,
    setDataApi,
    isLoadingApi,
    //
    dataApiTenNv,
    setDataApiTenNv,
    //
    dataApiTenNvEn,
    setDataApiTenNvEn,
    //
    dataApiDienThoai,
    setDataApiDienThoai,
    //
    dataApiDienThoaiEn,
    setDataApiDienThoaiEn,
    //
    dataApiEmail,
    setDataApiEmail,
    //
    dataApiEmailEn,
    setDataApiEmailEn,
    //
    dataApiThuongTru,
    setDataApiThuongTru,
    //
    dataApiThuongTruEn,
    setDataApiThuongTruEn,
    //
    dataApiMoTa,
    setDataApiMoTa,
    //
    dataApiMoTaEN,
    setDataApiMoTaEN,
    //
  } = useContext<ProfileBEEditContextProps>(ProfileBEEditContext);
  const tab_mota_vn = "tab_mota_vn";
  const tab_mota_en = "tab_mota_en";
  const initialized = useRef(false);
  const reactQuillRef = useRef<ReactQuill>(null);
  const reactQuillRefMoTaEN = useRef<ReactQuill>(null);
  const [tabMota, setTabMota] = useState("tab_mota_vn");
  //
  const handleOnSelectTab = (value: string | null) => {
    // console.log("handleOnSelectTab:");
    // console.log(value);
    setTabMota(value ?? "");
  };
  //
  useEffect(() => {
    // if (initialized.current) return;
    initialized.current = true;
    return () => {
      console.log("Cách 2 ProfileBEEditForm: useEffect - count - cleanup");
    };
  }, []);

  const imageHandler = () => {
    if (reactQuillRef.current) {
      const editor = reactQuillRef.current.getEditor();
      if (editor.hasFocus()) {
        const range = editor.getSelection();
        const value = prompt("Please enter the image URL VN");

        if (value && range) {
          editor.insertEmbed(range.index, "image", value, "user");
        }
      }
    }

    if (reactQuillRefMoTaEN.current) {
      const editorEN = reactQuillRefMoTaEN.current.getEditor();
      if (editorEN.hasFocus()) {
        const rangeEN = editorEN.getSelection();
        const valueEN = prompt("Please enter the image URL EN");
        if (valueEN && rangeEN) {
          editorEN.insertEmbed(rangeEN.index, "image", valueEN, "user");
        }
      }
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ color: [] }], // Enables color picker in the toolbar
          [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }, { size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["color", "background"],
          [{ direction: "rtl" }, { direction: "ltr" }, "align"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["code-block", "table"],
          ["clean"],
        ],

        // resize: {
        //   locale: {},
        // },
        handlers: {
          // image: () => {
          //   console.log("image clicked");
          // },
          image: imageHandler,
        },
        // ImageResize: {
        //   modules: ["Resize", "DisplaySize", "Toolbar"],
        // },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        // parchment: Quill.import("parchment"),
        handleStyles: {
          displaySize: true,
          backgroundColor: "black",
          border: "none",
          color: "white",
        },
        modules: ["Resize", "DisplaySize", "Toolbar"],
        // displaySize: true,
        // handleStyles: {
        //   backgroundColor: "black",
        //   border: "none",
        //   color: "white",
        //   // other camelCase styles for size display
        // },
      },
    }),
    []
  );

  //#region cac hàm private
  const handleChangeTenNV = (event: string) => {
    setDataApiTenNv(event);
    // setDataApi({
    //   ...dataApi,
    //   ten_nv: event,
    // });
  };
  const handleChangeTenNV_EN = (event: string) => {
    setDataApiTenNvEn(event);

    // setDataApi({
    //   ...dataApi,
    //   ten_nv_en: event,
    // });
  };
  const handleChangeDienThoai = (event: string) => {
    setDataApiDienThoai(event);

    // startTransition(() => {
    //   setDataApi({
    //     ...dataApi,
    //     dienthoai: event,
    //   });
    // });
  };
  const handleChangeDienThoai_EN = (event: string) => {
    setDataApiDienThoaiEn(event);
    // startTransition(() => {
    //   setDataApi({
    //     ...dataApi,
    //     dienthoai_en: event,
    //   });
    // });
  };

  const handleChangeMoTa = (event: string) => {
    console.log(event);
    setDataApiMoTa(event);
    startTransition(() => {
      setDataApi({
        ...dataApi,
        mota: event,
      });
    });
  };
  const handleChangeEmail = (event: string) => {
    setDataApiEmail(event);

    // setDataApi({
    //   ...dataApi,
    //   email: event,
    // });
  };
  const handleChangeEmail_EN = (event: string) => {
    setDataApiEmailEn(event);
    // setDataApi({
    //   ...dataApi,
    //   email_en: event,
    // });
  };
  const handleChangeDiaChi = (event: string) => {
    setDataApiThuongTru(event);
    // setDataApi({
    //   ...dataApi,
    //   diachi_thuongtru: event,
    // });
  };
  const handleChangeDiaChi_EN = (event: string) => {
    setDataApiThuongTruEn(event);
    // setDataApi({
    //   ...dataApi,
    //   diachi_thuongtru_en: event,
    // });
  };

  const handleChangeMoTaEn = (event: string) => {
    setDataApiMoTaEN(event);
    startTransition(() => {
      setDataApi({
        ...dataApi,
        mota_en: event,
      });
    });
  };

  //#endregion cac hàm private

  useEffect(() => {
    // if (initialized.current) return;
    initialized.current = true;
    // console.log(dataApi);
    return () => {
      console.log("Cách 2 ProfileBEEditForm: useEffect - count - cleanup");
    };
  }, []);

  return (
    <>
      <Accordion
        className="row_body_edit_bottom_accordion"
        defaultActiveKey={[
          "thongtincanhan",
          "hinhanh",
          "dinhhuong",
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
            {/* <Form> */}
            <Row>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Họ và tên:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={dataApiTenNv}
                  onChange={(event) => handleChangeTenNV(event.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={dataApiTenNvEn}
                  onChange={(event) => handleChangeTenNV_EN(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Điện thoại:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="profile-text-dien-thoai-name"
                  id="profile-text-dien-thoai-id"
                  key={"profile-text-dien-thoai-key"}
                  // value={dataApi.dienthoai ?? ""}
                  value={dataApiDienThoai}
                  onChange={(event) =>
                    handleChangeDienThoai(event.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Phone number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={dataApiDienThoaiEn}
                  onChange={(event) =>
                    handleChangeDienThoai_EN(event.target.value)
                  }
                  // onBlur={(event) =>
                  //   handleChangeDienThoai_EN(event.target.value)
                  // }
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={dataApiEmail}
                  placeholder=""
                  onChange={(event) => handleChangeEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={dataApiEmailEn}
                  placeholder=""
                  onChange={(event) => handleChangeEmail_EN(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Địa chỉ liên hệ:</Form.Label>
                <Form.Control
                  type="text"
                  value={dataApiThuongTru}
                  placeholder=""
                  onChange={(event) => handleChangeDiaChi(event.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} sm={12} md={6} className="mb-3">
                <Form.Label>Contact Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={dataApiThuongTruEn}
                  placeholder=""
                  onChange={(event) =>
                    handleChangeDiaChi_EN(event.target.value)
                  }
                />
              </Form.Group>
            </Row>
            {/* </Form> */}
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

        <ProfileBEDinhHuongIndex></ProfileBEDinhHuongIndex>

        <ProfileBEKyNangIndex></ProfileBEKyNangIndex>

        <ProfileBEQuaTrinhLamViecIndex></ProfileBEQuaTrinhLamViecIndex>

        <ProfileBEHocVanIndex></ProfileBEHocVanIndex>

        <Accordion.Item eventKey="mota">
          <Accordion.Header>MÔ TẢ BẢN THÂN</Accordion.Header>
          <Accordion.Body>
            {isLoadingApi ? (
              <></>
            ) : (
              <>
                <Tabs
                  defaultActiveKey={tab_mota_vn}
                  activeKey={tabMota}
                  onSelect={handleOnSelectTab}
                  className="mb-1"
                >
                  <Tab eventKey={tab_mota_vn} title="VN">
                    <div spellCheck={false}>
                      <ReactQuill
                        id="asdasdsadasdasd"
                        key={`sadadsadasdasd asdas`}
                        ref={reactQuillRef}
                        theme="snow"
                        // theme="bubble"
                        modules={modules}
                        value={dataApiMoTa ?? ""}
                        onChange={(event) => handleChangeMoTa(event)}
                      />
                    </div>
                  </Tab>
                  <Tab eventKey={tab_mota_en} title="EN">
                    <div spellCheck={false}>
                      <ReactQuill
                        ref={reactQuillRefMoTaEN}
                        id="asd2342"
                        key={`sadadsadasdas sdfsf d asdas`}
                        theme="snow"
                        // theme="bubble"
                        modules={modules}
                        value={dataApiMoTaEN}
                        onChange={(event) => handleChangeMoTaEn(event)}
                      />
                    </div>
                  </Tab>
                </Tabs>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
