import { useContext, useEffect, useRef, useState } from "react";
import {
  DataGrid,
  DataGridHandle,
  RenderCellProps,
  RenderHeaderCellProps,
  useHeaderRowSelection,
  useRowSelection,
} from "react-data-grid";
// import BEConstCSS from "../../../BEConstCSS";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";

import { Accordion, Button, Form, Modal } from "react-bootstrap";
import BEConstCSS from "../../BEConstCSS";
import {
  ProfileNhanVienType,
  ProfileQuaTrinhLamViecType,
} from "../../../../model/ProfileNhanVienType";
import { useQuill } from "react-quilljs";
import {
  CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import { v4 as uuidv4 } from "uuid";

function HeaderRenderer(props: RenderHeaderCellProps<ProfileNhanVienType>) {
  const { isIndeterminate, isRowSelected, onRowSelectionChange } =
    useHeaderRowSelection();

  return (
    <div></div>
    // <SelectCellFormatter
    //   aria-label="Select All"
    //   tabIndex={props.tabIndex}
    //   indeterminate={isIndeterminate}
    //   value={isRowSelected}
    //   onChange={(checked) => {
    //     onRowSelectionChange({ checked: isIndeterminate ? false : checked });
    //   }}
    // />
  );
}

function SelectFormatter(props: RenderCellProps<ProfileNhanVienType>) {
  const { isRowSelectionDisabled, isRowSelected, onRowSelectionChange } =
    useRowSelection();

  return (
    <div></div>
    // <SelectCellFormatter
    //   aria-label="Select"
    //   tabIndex={props.tabIndex}
    //   disabled={isRowSelectionDisabled}
    //   value={isRowSelected}
    //   onChange={(checked, isShiftClick) => {
    //     onRowSelectionChange({ row: props.row, checked, isShiftClick });
    //   }}
    // />
  );
}

export const ProfileBEQuaTrinhLamViecIndex = () => {
  const { quill, quillRef } = useQuill();
  const useData =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).dataApi;
  const isLoadingApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).isLoadingApi;
  const postDataApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).postDataApi;
  const setDataApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).setDataApi;

  const [useDataRow, setUseDataRow] = useState<ProfileQuaTrinhLamViecType>({});
  const [showKyNang, setShowKyNang] = useState(false);
  const handleKyNangClose = () => setShowKyNang(false);
  const handleKyNangShow = () => setShowKyNang(true);
  //
  const handleChangeQTLVMoTa = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      mota_qtlv: event,
    });
  };
  //
  //#region các nút trên lưới
  const handleAddRow = () => {
    setUseDataRow({
      id: uuidv4(),
      stt: (useData.profile_nhanvien_quatrinhlamviec ?? []).length + 1,
    });
    setShowKyNang(true);
  };
  const handleUpdateRow = (
    props: RenderCellProps<ProfileQuaTrinhLamViecType>
  ) => {
    handleKyNangShow();
    console.log(props.row);
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
      ...useData,
      profile_nhanvien_quatrinhlamviec: (
        useData.profile_nhanvien_quatrinhlamviec ?? []
      ).filter((f) => f.id !== props.row.id),
    });
    setShowKyNang(false);
  };

  //#endregion trên lưới

  useEffect(() => {
    if (quill && !isLoadingApi && quillRef) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild);
        handleChangeQTLVMoTa(quillRef.current.firstChild.innerHTML);
      });
      //console.log(useData.mota);
      quill?.clipboard.dangerouslyPasteHTML(useDataRow.mota_qtlv ?? "");
    }
    return () => {};
  }, [quill, isLoadingApi, useDataRow.mota_qtlv]);

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
      key: "stt",
      name: "STT",
      width: "70px",
      minWidth: 50,
      //   width: "max-content",
      // maxWidth: 100,
    },
    {
      key: "thoigian_qtlv",
      name: "Thời gian làm việc",
      width: "minmax(10%, max-content)",
    },
    {
      key: "congty_qtlv",
      name: "Tên công ty",
      width: "minmax(10%, max-content)",
      // maxWidth: 100,
    },

    {
      key: "vitri_qtlv",
      name: "Chức vụ",
      width: "minmax(10%, max-content)",
      // width: "max-content",
      // maxWidth: 100,
    },
    {
      key: "mota_qtlv",
      name: "Mô tả công việc",
      width: "minmax(50%, max-content)",

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
      <Modal show={showKyNang} onHide={handleKyNangClose}>
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
            ></Form.Control>
            <Form.Label>Tên công ty làm việc:</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.congty_qtlv ?? ""}
            ></Form.Control>
            <Form.Label>Vị trí làm việc:</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.congty_qtlv ?? ""}
            ></Form.Control>
            <Form.Label>Mô tả công việc:</Form.Label>
            <div
              style={{
                width: "100%",
                height: "100%",
                minWidth: "300px",
                minHeight: "100px",
              }}
            >
              <div ref={quillRef} />
            </div>
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
            rows={useData.profile_nhanvien_quatrinhlamviec ?? []}
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
