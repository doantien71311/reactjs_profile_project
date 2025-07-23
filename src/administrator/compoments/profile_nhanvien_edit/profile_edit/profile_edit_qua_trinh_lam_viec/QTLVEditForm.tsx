import { Accordion, Col, Form, Row, Tab, Tabs } from "react-bootstrap";

import { useContext, startTransition, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { QTLVEditContext, QTLVEditContextProps } from "./QTLVEditContext";

export const QTLVEditForm = () => {
  const {
    dataApi,
    setDataApi,
    isLoadingApi,
    //
    id_qtlv,
    //
    thoigian_qtlv,
    setThoigian_qtlv,
    //
    thoigian_qtlv_en,
    setThoigian_qtlv_en,
    //
    congty_qtlv,
    setCongty_qtlv,
    //
    congty_qtlv_en,
    setCongty_qtlv_en,
    //
    vitri_qtlv,
    setVitri_qtlv,
    //
    vitri_qtlv_en,
    setVitri_qtlv_en,
    //
    dataApiQTLVMoTa,
    reactQuillRefQTLVVN,
    // setDataApiQTLVMoTa,
    //
    dataApiQTLVMoTaEN,
    reactQuillRefQTLVEN,
    // setDataApiQTLVMoTaEN,
    //
  } = useContext<QTLVEditContextProps>(QTLVEditContext);
  //
  const tab_qtlv_mota_vn = "tab_qtlv_mota_vn";
  const tab_qtlv_mota_en = "tab_qtlv_mota_en";
  //
  // const reactQuillRefQTLVVN = useRef<ReactQuill>(null);
  // const reactQuillRefQTLVEN = useRef<ReactQuill>(null);
  //
  // const moduleABCDC = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: [
  //         [{ color: [] }], // Enables color picker in the toolbar
  //         [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }, { size: [] }],
  //         ["bold", "italic", "underline", "strike", "blockquote"],
  //         ["color", "background"],
  //         [{ direction: "rtl" }, { direction: "ltr" }, "align"],
  //         [
  //           { list: "ordered" },
  //           { list: "bullet" },
  //           { indent: "-1" },
  //           { indent: "+1" },
  //         ],
  //         ["link", "image", "video"],
  //         ["code-block", "table"],
  //         ["clean"],
  //       ],
  //     },
  //     clipboard: {
  //       matchVisual: false,
  //     },
  //     imageResize: {
  //       // parchment: Quill.import("parchment"),
  //       handleStyles: {
  //         displaySize: true,
  //         backgroundColor: "black",
  //         border: "none",
  //         color: "white",
  //       },
  //       modules: ["Resize", "DisplaySize", "Toolbar"],
  //       // displaySize: true,
  //       // handleStyles: {
  //       //   backgroundColor: "black",
  //       //   border: "none",
  //       //   color: "white",
  //       //   // other camelCase styles for size display
  //       // },
  //     },
  //   }),
  //   []
  // );

  const ReactQuillMemo = useMemo(() => {
    return (
      <ReactQuill
        id={uuidv4()}
        ref={reactQuillRefQTLVVN}
        key={uuidv4()}
        theme="snow"
        // modules={moduleABCDC}
        value={dataApiQTLVMoTa ?? ""}
        // onChange={(event) => handleChangeQTLVMoTa_VN(event)}
      />
    );
  }, [dataApiQTLVMoTa]);

  const ReactQuillQTLVENMemo = useMemo(() => {
    return (
      <ReactQuill
        id={uuidv4()}
        ref={reactQuillRefQTLVEN}
        key={uuidv4()}
        theme="snow"
        // modules={moduleABCDC}
        value={dataApiQTLVMoTaEN ?? ""}
        // onChange={(event) => handleChangeQTLVMoTa_EN(event)}
      />
    );
  }, [dataApiQTLVMoTaEN]);

  // const ReactQuillCallBacKEN = useMemo(() => {
  //   return (
  //     <ReactQuill
  //       id={uuidv4()}
  //       ref={reactQuillRefQTLVEN}
  //       key={uuidv4()}
  //       theme="snow"
  //       // modules={modules}
  //       value={dataApiQTLVMoTaEN ?? ""}
  //       onChange={(event) => handleChangeQTLVMoTa_EN(event)}
  //     />
  //   );
  // }, [dataApiQTLVMoTaEN]);

  //#region các hàm set value

  // const handleChangeQTLVMoTa_VN = (event: string) => {
  //   setDataApiQTLVMoTa(event);
  //   startTransition(() => {
  //     if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
  //     const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
  //       (row) => {
  //         if (row.id == id_qtlv) {
  //           return { ...row, mota_qtlv: event };
  //         } else {
  //           return row;
  //         }
  //       }
  //     );
  //     setDataApi({
  //       ...dataApi,
  //       profile_nhanvien_quatrinhlamviec: list_qtlv_map,
  //     });
  //   });
  // };

  // const handleChangeQTLVMoTa_EN = (event: string) => {
  //   setDataApiQTLVMoTaEN(event);
  //   startTransition(() => {
  //     if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
  //     const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
  //       (row) => {
  //         if (row.id == id_qtlv) {
  //           return { ...row, mota_qtlv_en: event };
  //         } else {
  //           return row;
  //         }
  //       }
  //     );
  //     setDataApi({
  //       ...dataApi,
  //       profile_nhanvien_quatrinhlamviec: list_qtlv_map,
  //     });
  //   });
  // };

  const handleChangeThoiGian = (event: string) => {
    setThoigian_qtlv(event);
    startTransition(() => {
      if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
      const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
        (row) => {
          if (row.id == id_qtlv) {
            return { ...row, thoigian_qtlv: event };
          } else {
            return row;
          }
        }
      );
      setDataApi({
        ...dataApi,
        profile_nhanvien_quatrinhlamviec: list_qtlv_map,
      });
    });
  };
  const handleChangeThoiGian_EN = (event: string) => {
    setThoigian_qtlv_en(event);
    startTransition(() => {
      if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
      const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
        (row) => {
          if (row.id == id_qtlv) {
            return { ...row, thoigian_qtlv_en: event };
          } else {
            return row;
          }
        }
      );
      setDataApi({
        ...dataApi,
        profile_nhanvien_quatrinhlamviec: list_qtlv_map,
      });
    });
  };
  const handleChangeCongTy = (event: string) => {
    setCongty_qtlv(event);
    startTransition(() => {
      if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
      const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
        (row) => {
          if (row.id == id_qtlv) {
            return { ...row, congty_qtlv: event };
          } else {
            return row;
          }
        }
      );
      setDataApi({
        ...dataApi,
        profile_nhanvien_quatrinhlamviec: list_qtlv_map,
      });
    });
  };
  const handleChangeCongTy_EN = (event: string) => {
    setCongty_qtlv_en(event);
    startTransition(() => {
      if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
      const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
        (row) => {
          if (row.id == id_qtlv) {
            return { ...row, congty_qtlv_en: event };
          } else {
            return row;
          }
        }
      );
      setDataApi({
        ...dataApi,
        profile_nhanvien_quatrinhlamviec: list_qtlv_map,
      });
    });
  };
  const handleChangeViTri = (event: string) => {
    setVitri_qtlv(event);
    // if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
    // const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
    //   (row) => {
    //     if (row.id == useDataRow.id) {
    //       return { ...row, vitri_qtlv: event };
    //     } else {
    //       return row;
    //     }
    //   }
    // );
    // setDataApi({
    //   ...dataApi,
    //   profile_nhanvien_quatrinhlamviec: list_qtlv_map,
    // });
  };
  const handleChangeViTri_EN = (event: string) => {
    setVitri_qtlv_en(event);
    startTransition(() => {
      if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
      const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
        (row) => {
          if (row.id == id_qtlv) {
            return { ...row, vitri_qtlv_en: event };
          } else {
            return row;
          }
        }
      );
      setDataApi({
        ...dataApi,
        profile_nhanvien_quatrinhlamviec: list_qtlv_map,
      });
    });
  };
  //#endregion các hàm set value

  return (
    <>
      <Form className="m-3">
        {/* <Form.Label>STT:</Form.Label>
        <Form.Control type="text"></Form.Control> */}

        <Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Thời gian làm việc</Form.Label>
            <Form.Control
              type="text"
              value={thoigian_qtlv ?? ""}
              onChange={(event) => handleChangeThoiGian(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Working date</Form.Label>
            <Form.Control
              type="text"
              value={thoigian_qtlv_en ?? ""}
              onChange={(event) => handleChangeThoiGian_EN(event.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Tên công ty làm việc:</Form.Label>
            <Form.Control
              type="text"
              value={congty_qtlv ?? ""}
              onChange={(event) => handleChangeCongTy(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Company EN:</Form.Label>
            <Form.Control
              type="text"
              value={congty_qtlv_en ?? ""}
              onChange={(event) => handleChangeCongTy_EN(event.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Vị trí làm việc:</Form.Label>
            <Form.Control
              type="text"
              value={vitri_qtlv ?? ""}
              onChange={(event) => handleChangeViTri(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Designation EN:</Form.Label>
            <Form.Control
              type="text"
              value={vitri_qtlv_en ?? ""}
              onChange={(event) => handleChangeViTri_EN(event.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
      </Form>
      <Accordion defaultActiveKey={["qtlv"]} className="m-3">
        <Accordion.Item eventKey="qtlv">
          <Accordion.Header>MÔ TẢ CÔNG VIỆC</Accordion.Header>
          <Accordion.Body>
            {isLoadingApi ? (
              <></>
            ) : (
              <Tabs defaultActiveKey={tab_qtlv_mota_vn}>
                <Tab eventKey={tab_qtlv_mota_vn} title="VN">
                  {ReactQuillMemo}
                  {/* <ReactQuill
                    id={uuidv4()}
                    ref={reactQuillRefQTLVVN}
                    key={uuidv4()}
                    modules={moduleABCDC}
                    value={dataApiQTLVMoTa}
                    // onChange={(event) => handleChangeQTLVMoTa_VN(event)}
                  /> */}
                </Tab>
                <Tab eventKey={tab_qtlv_mota_en} title="EN">
                  {ReactQuillQTLVENMemo}
                  {/* <ReactQuill
                    id={uuidv4()}
                    ref={reactQuillRefQTLVEN}
                    key={uuidv4()}
                    // modules={moduleABCDC}
                    value={dataApiQTLVMoTaEN}
                    // onChange={(event) => handleChangeQTLVMoTa_EN(event)}
                  /> */}
                </Tab>
              </Tabs>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
