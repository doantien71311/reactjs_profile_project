import { Accordion, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";
import { useContext, useEffect, useMemo, useRef } from "react";
import { ProfileBEKyNangIndex } from "./ProfileBEKyNangIndex";
import { ProfileBEQuaTrinhLamViecIndex } from "./ProfileBEQuaTrinhLamViecIndex";
import { ProfileBEAnhDaiDienIndex } from "./ProfileBEAnhDaiDienIndex";
import ReactQuill, { Quill } from "react-quill-new";
// import ImageResize from "quill-image-resize-module-react";
// Quill.register("modules/imageResize", ImageResize);
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
//
export const ProfileBEEditForm = () => {
  const { dataApi, isLoadingApi, setDataApi } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);
  const initialized = useRef(false);
  const reactQuillRef = useRef<ReactQuill>(null);
  // const { quill, quillRef } = useQuill({
  //   modules: {
  //     toolbar: [
  //       ["bold", "italic", "underline", "strike"],
  //       [{ align: [] }],

  //       [{ list: "ordered" }, { list: "bullet" }],
  //       [{ indent: "-1" }, { indent: "+1" }],

  //       [{ size: ["small", false, "large", "huge"] }],
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       ["link", "image", "video"],
  //       [{ color: [] }, { background: [] }],
  //     ],
  //     clipboard: {
  //       matchVisual: false,
  //     },
  //   },
  // });

  useEffect(() => {
    // if (initialized.current) return;
    initialized.current = true;
    // if (quill && !isLoadingApi) {
    //   quill.on("text-change", () => {
    //     // console.log("Text change!");
    //     // console.log(quill.getText()); // Get text only
    //     // console.log(quill.getContents()); // Get delta contents
    //     // console.log(quill.root.innerHTML); // Get innerHTML using quill
    //     // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
    //     handleChangeMoTa(quillRef.current.firstChild.innerHTML);
    //   });

    //   if (quill) {
    //     console.log("quill.clipboard.dangerouslyPasteHTML");
    //     quill.clipboard.dangerouslyPasteHTML(dataApi.mota ?? "");
    //   }
    // }

    return () => {
      console.log("Cách 2 ProfileBEEditForm: useEffect - count - cleanup");
    };
  }, []);

  // const modules = useMemo(() => {
  //   return {
  //     modules: {
  //       clipboard: {
  //         matchVisual: false,
  //       },

  //       // counter: true,
  //     },
  //   };
  // }, []);
  // const modules = useMemo(() => {
  //   return {
  //     modules: {
  //       toolbar: [
  //         ["bold", "italic", "underline", "strike"],
  //         [{ align: [] }],

  //         [{ list: "ordered" }, { list: "bullet" }],
  //         [{ indent: "-1" }, { indent: "+1" }],

  //         [{ size: ["small", false, "large", "huge"] }],
  //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //         ["link", "image", "video"],
  //         [{ color: [] }, { background: [] }],
  //       ],
  //       clipboard: {
  //         matchVisual: false,
  //       },
  //     },
  //   };
  // }, []);

  const imageHandler = () => {
    if (!reactQuillRef.current) return;

    const editor = reactQuillRef.current.getEditor();
    const range = editor.getSelection();
    const value = prompt("Please enter the image URL");

    if (value && range) {
      editor.insertEmbed(range.index, "image", value, "user");
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
          ["custom"],
        ],

        // resize: {
        //   locale: {},
        // },
        handlers: {
          // image: () => {
          //   console.log("image clicked");
          // },
          image: imageHandler,
          custom: () => {
            console.log("custom clicked");
          },
        },
        // ImageResize: {
        //   modules: ["Resize", "DisplaySize", "Toolbar"],
        // },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
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
    setDataApi({
      ...dataApi,
      ten_nv: event,
    });
  };
  const handleChangeDienThoai = (event: string) => {
    setDataApi({
      ...dataApi,
      dienthoai: event,
    });
  };

  const handleChangeMoTa = (event: string) => {
    setDataApi({
      ...dataApi,
      mota: event,
    });
  };
  const handleChangeEmail = (event: string) => {
    setDataApi({
      ...dataApi,
      email: event,
    });
  };
  const handleChangeDiaChi = (event: string) => {
    setDataApi({
      ...dataApi,
      diachi_thuongtru: event,
    });
  };
  //#endregion cac hàm private

  useEffect(() => {
    // if (initialized.current) return;
    initialized.current = true;
    console.log(dataApi);
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
                  value={dataApi.ten_nv ?? ""}
                  onChange={(event) => handleChangeTenNV(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Điện thoại:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={dataApi.dienthoai ?? ""}
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
                  value={dataApi.email ?? ""}
                  placeholder=""
                  onChange={(event) => handleChangeEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Địa chỉ liên hệ:</Form.Label>
                <Form.Control
                  type="text"
                  value={dataApi.diachi_thuongtru ?? ""}
                  placeholder=""
                  onChange={(event) => handleChangeDiaChi(event.target.value)}
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
              {dataApi.profile_nhanvien_hocvan?.map((item) => (
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
            {/* <div style={{ width: "100%", height: "100%" }}>
              <div ref={quillRef} />
            </div> */}

            {isLoadingApi ? (
              <></>
            ) : (
              <>
                <Tabs defaultActiveKey="mota-viet" className="mb-3">
                  <Tab eventKey="mota-viet" title="Editor">
                    <ReactQuill
                      key={`mota_${dataApi.soid}}`}
                      ref={reactQuillRef}
                      theme="snow"
                      // theme="bubble"
                      modules={modules}
                      // formats={formats}
                      value={dataApi.mota ?? ""}
                      onChange={(event) => handleChangeMoTa(event)}
                    />
                  </Tab>
                  <Tab eventKey="mota-code-html" title="Code Html">
                    {/* <SyntaxHighlighter
                      lineProps={{
                        style: {
                          wordBreak: "break-all",
                          whiteSpace: "pre-wrap",
                        },
                      }}
                      wrapLines={true}
                      // wrapLongLines
                      // showInlineLineNumbers={true}
                      // showLineNumbers={true}
                      language="html"
                      style={docco}
                    >
                      {dataApi.mota ?? ""}
                    </SyntaxHighlighter> */}
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
