import { useContext, useRef, useState } from "react";
import {
  DataGrid,
  DataGridHandle,
  RenderCellProps,
  // RenderHeaderCellProps,
  // useHeaderRowSelection,
  // useRowSelection,
} from "react-data-grid";
// import BEConstCSS from "../../../BEConstCSS";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";

import { Accordion, Button, Form, Modal } from "react-bootstrap";
import BEConstCSS from "../../BEConstCSS";
import { ProfileQuaTrinhLamViecType } from "../../../../model/ProfileNhanVienType";
// import { useQuill } from "react-quilljs";
import {
  CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill-new";

export const ProfileBEQuaTrinhLamViecIndex = () => {
  //console.log("ProfileBEQuaTrinhLamViecIndex");
  // const { quill, quillRef } = useQuill();
  //   const { quill, quillRef } = useQuill({
  //   modules: {
  //     clipboard: {
  //       matchVisual: false,
  //     },

  //     // counter: true,
  //   },
  // });

  // const initialized = useRef(false);
  // const useData =
  //   useContext<ProfileBEEditContextProps>(ProfileBEEditContext).dataApi;
  // const isLoadingApi =
  //   useContext<ProfileBEEditContextProps>(ProfileBEEditContext).isLoadingApi;
  // const postDataApi =
  //   useContext<ProfileBEEditContextProps>(ProfileBEEditContext).postDataApi;
  // const setDataApi =
  //   useContext<ProfileBEEditContextProps>(ProfileBEEditContext).setDataApi;

  const { dataApi, postDataApi, setDataApi } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);

  const [useDataRow, setUseDataRow] = useState<ProfileQuaTrinhLamViecType>({});
  const [showKyNang, setShowKyNang] = useState(false);
  const handleKyNangClose = () => setShowKyNang(false);
  const handleKyNangShow = () => setShowKyNang(true);

  //#region các hàm set value
  const handleChangeQTLVMoTa = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      mota_qtlv: event,
    });
    if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
    const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
      (row) => {
        if (row.id == useDataRow.id) {
          return { ...row, mota_qtlv: event };
        } else {
          return row;
        }
      }
    );
    setDataApi({
      ...dataApi,
      profile_nhanvien_quatrinhlamviec: list_qtlv_map,
    });
  };
  const handleChangeThoiGian = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      thoigian_qtlv: event,
    });
    if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
    const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
      (row) => {
        if (row.id == useDataRow.id) {
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
  };
  const handleChangeCongTy = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      congty_qtlv: event,
    });
    if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
    const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
      (row) => {
        if (row.id == useDataRow.id) {
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
  };
  const handleChangeViTri = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      vitri_qtlv: event,
    });
    if (dataApi.profile_nhanvien_quatrinhlamviec == null) return;
    const list_qtlv_map = dataApi.profile_nhanvien_quatrinhlamviec.map(
      (row) => {
        if (row.id == useDataRow.id) {
          return { ...row, vitri_qtlv: event };
        } else {
          return row;
        }
      }
    );
    setDataApi({
      ...dataApi,
      profile_nhanvien_quatrinhlamviec: list_qtlv_map,
    });
  };
  //#endregion các hàm set value

  //#region các nút trên lưới
  const handleAddRow = () => {
    setUseDataRow({
      id: uuidv4(),
      stt: (dataApi.profile_nhanvien_quatrinhlamviec ?? []).length + 1,
    });
    setShowKyNang(true);
  };
  const handleUpdateRow = (
    props: RenderCellProps<ProfileQuaTrinhLamViecType>
  ) => {
    handleKyNangShow();
    // console.log(props.row);
    // setUseDataRow({ ...useDataRow, thoigian_qtlv: props.row.thoigian_qtlv });
    setUseDataRow(props.row);
  };
  const saveDataRow = () => {
    // setDataApi({ ...useData, profile_nhanvien_quatrinhlamviec = useDataRow });
    handleKyNangClose();
    postDataApi();
  };

  const handleDeleteRow = (
    props: RenderCellProps<ProfileQuaTrinhLamViecType>
  ) => {
    setDataApi({
      ...dataApi,
      profile_nhanvien_quatrinhlamviec: (
        dataApi.profile_nhanvien_quatrinhlamviec ?? []
      ).filter((f) => f.id !== props.row.id),
    });
    setShowKyNang(false);
  };

  //#endregion trên lưới

  // useEffect(
  //   () => {
  //     // if (initialized.current) return;
  //     initialized.current = true;
  //     console.log("useEffect qua trinh lam viec");
  //     //
  //     if (quill && !isLoadingApi && quillRef && showKyNang) {
  //       quill.on("text-change", () => {
  //         console.log("text-change");
  //         // console.log("quillRef.current.firstChild.innerHTML");
  //         // console.log(quillRef.current.firstChild.innerHTML);
  //         // handleChangeQTLVMoTa(quillRef.current.firstChild.innerHTML);

  //         // if (quillRef.current.firstChild) {
  //         //   handleChangeQTLVMoTa(quillRef.current.firstChild.innerHTML);
  //         // } else {
  //         //   handleChangeQTLVMoTa(useDataRow.mota_qtlv ?? "");
  //         // }
  //       });
  //       if (quill) {
  //         console.log(
  //           "qua trình làm việc quill.clipboard.dangerouslyPasteHTML"
  //         );
  //         console.log(useDataRow.mota_qtlv);
  //         quill.clipboard.dangerouslyPasteHTML(useDataRow.mota_qtlv ?? "");
  //       }
  //     }
  //     return () => {};
  //   },
  //   [quill, isLoadingApi, useDataRow.mota_qtlv, showKyNang]
  //   // [quill, isLoadingApi]
  // );

  const gridRef = useRef<DataGridHandle>(null);
  const columns = [
    {
      key: "SELECT_COLUMN_KEY",
      name: "",
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      resizable: true,
      // sortable: false,
      // frozen: true,
      // renderCell({ row, onRowChange, tabIndex }) {
      //   return (
      //     <SelectCellFormatter
      //       value={row.available}
      //       onChange={() => {
      //         onRowChange({ ...row, available: !row.available });
      //       }}
      //       tabIndex={tabIndex}
      //     />
      //   );
      // },
      renderHeaderCell() // props: RenderHeaderCellProps<ProfileQuaTrinhLamViecType>
      {
        return (
          <CommonButtonAddDataGrid
            OnHandleAddClick={handleAddRow}
          ></CommonButtonAddDataGrid>
        );
      },
      renderCell(
        props: RenderCellProps<ProfileQuaTrinhLamViecType>
        // ProfileQuaTrinhLamViecType
      ) {
        return (
          <CommonButtonEditDeleteDataGrid
            OnHandleEditClick={() => handleUpdateRow(props)}
            OnHandleDeleteClick={() => handleDeleteRow(props)}
          />
        );
        // return <div>{props.row.id ?? ""}</div>;
      },
    },
    {
      key: "thoigian_qtlv",
      name: "Thời gian làm việc",
      width: "minmax(15%, max-content)",
    },
    {
      key: "congty_qtlv",
      name: "Tên công ty",
      width: "minmax(30%, max-content)",
      // maxWidth: 100,
    },

    {
      key: "vitri_qtlv",
      name: "Chức vụ",
      width: "minmax(30%, max-content)",
      // width: "max-content",
      // maxWidth: 100,
    },
    {
      key: "mota_qtlv",
      name: "Mô tả công việc",
      width: "minmax(100%, max-content)",
      renderCell(props: RenderCellProps<ProfileQuaTrinhLamViecType>) {
        return (
          <div
            style={{ width: "100%", height: "100%", overflowY: "scroll" }}
            dangerouslySetInnerHTML={{ __html: `${props.row.mota_qtlv}` }}
          ></div>
        );
      },
      // maxWidth: 100,
    },
    {
      key: "stt",
      name: "STT",
      width: "70px",
      minWidth: 50,
      //   width: "max-content",
      // maxWidth: 100,
    },
    // {
    //   key: "id",
    //   name: "ID",
    //   // width: "5%",
    //   width: "max-content",
    //   minWidth: 50,
    //   // maxWidth: 100,
    // },
  ];
  //   function rowKeyGetter(row: ProfileKyNangType) {
  //     return row.id;
  //   }

  return (
    <>
      <Modal show={showKyNang} size="lg" onHide={handleKyNangClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật quá trình làm việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>STT:</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Label>Thời gian làm việc</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.thoigian_qtlv ?? ""}
              onChange={(event) => handleChangeThoiGian(event.target.value)}
            ></Form.Control>
            <Form.Label>Tên công ty làm việc:</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.congty_qtlv ?? ""}
              onChange={(event) => handleChangeCongTy(event.target.value)}
            ></Form.Control>
            <Form.Label>Vị trí làm việc:</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.congty_qtlv ?? ""}
              onChange={(event) => handleChangeViTri(event.target.value)}
            ></Form.Control>
            <Form.Label>Mô tả công việc:</Form.Label>
            {/* <div
              style={{
                width: "100%",
                height: "100%",
                minWidth: "300px",
                minHeight: "100px",
              }}
            >
              <div
                key={`editor-${useDataRow.id ?? ""}`}
                // id={useDataRow.id ?? ""}
                ref={quillRef}
              />
            </div> */}
            <ReactQuill
              value={useDataRow.mota_qtlv ?? ""}
              onChange={(event) => handleChangeQTLVMoTa(event)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleKyNangClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={saveDataRow}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion.Item eventKey="quatrinhlamviec">
        <Accordion.Header>QUÁ TRÌNH LÀM VIỆC</Accordion.Header>
        <Accordion.Body>
          <DataGrid
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill_preview}`}
            ref={gridRef}
            // className={BEConstCSS.grid_fill}
            // rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={dataApi.profile_nhanvien_quatrinhlamviec ?? []}
            rowHeight={100}
            // selectedRows={selectedRows}
            // onSelectedRowsChange={setSelectedRows}
            // onSelectedCellChange={onSelectedCellChange}
            // onCellClick={onCellClick}
            defaultColumnOptions={{
              minWidth: 50,
              resizable: true,
              sortable: true,
              draggable: true,
            }}
          />
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};
