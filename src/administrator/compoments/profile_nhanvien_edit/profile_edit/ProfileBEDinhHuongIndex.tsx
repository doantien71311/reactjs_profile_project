import { useContext, useRef, useState } from "react";
import { DataGrid, DataGridHandle, RenderCellProps } from "react-data-grid";
// import BEConstCSS from "../../../BEConstCSS";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";

import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import BEConstCSS from "../../BEConstCSS";
import {
  CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import {
  ProfileDinhHuongType,
  ProfileKyNangType,
} from "../../../../model/ProfileNhanVienType";
import { v4 as uuidv4 } from "uuid";

export const ProfileBEDinhHuongIndex = () => {
  const { dataApiDinhHuong, setDataApiDinhHuong } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);

  const [showKyNang, setShowKyNang] = useState(false);
  const [useDataRow, setUseDataRow] = useState<ProfileDinhHuongType>({});
  const handleKyNangClose = () => setShowKyNang(false);
  const handleKyNangShow = () => setShowKyNang(true);

  //#region các nút trên lưới
  const handleAddRow = () => {
    setUseDataRow({
      id: uuidv4(),
      stt: dataApiDinhHuong.length + 1,
    });
    setShowKyNang(true);
  };
  const handleUpdateRow = (props: RenderCellProps<ProfileDinhHuongType>) => {
    handleKyNangShow();
    console.log(props.row);
    // setUseDataRow({ ...useDataRow, thoigian_qtlv: props.row.thoigian_qtlv });
    setUseDataRow(props.row);
  };
  const handleDeleteRow = (props: RenderCellProps<ProfileDinhHuongType>) => {
    // const indexDelete = (useData.profile_nhanvien_kynang ?? []).findIndex(
    //   (f) => f.id === props.row.id
    // );
    // delete (useData.profile_nhanvien_kynang ?? [])[indexDelete];
    // setDataApi(useData);

    setDataApiDinhHuong(dataApiDinhHuong.filter((f) => f.id !== props.row.id));

    setShowKyNang(false);
  };
  //
  const handleSaveDataToGrid = () => {
    const rowIndex = dataApiDinhHuong.findIndex((f) => f.id === useDataRow.id);
    if (rowIndex < 0) dataApiDinhHuong.push(useDataRow);
    else {
      dataApiDinhHuong[rowIndex] = useDataRow;
    }
    //
    setDataApiDinhHuong([...dataApiDinhHuong]);
    setShowKyNang(false);
  };
  //#endregion các nút trên lưới

  //#region các thay đổi control
  const handleChangeTenKyNang = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      noidung: event,
    });
  };
  const handleChangeDinhHuong = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      noidung_en: event,
    });
  };
  //#endregion các thay đổi control

  const gridRef = useRef<DataGridHandle>(null);
  const columns = [
    {
      key: "SELECT_COLUMN_KEY",
      name: "",
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      resizable: true,
      renderHeaderCell() // props: RenderHe
      // aderCellProps<ProfileQuaTrinhLamViecType>
      {
        return (
          <CommonButtonAddDataGrid
            OnHandleAddClick={handleAddRow}
          ></CommonButtonAddDataGrid>
        );
      },
      renderCell(
        props: RenderCellProps<ProfileKyNangType>
        // ProfileQuaTrinhLamViecType
      ) {
        return (
          <CommonButtonEditDeleteDataGrid
            OnHandleEditClick={() => handleUpdateRow(props)}
            OnHandleDeleteClick={() => handleDeleteRow(props)}
          />
        );
      },
    },
    {
      key: "noidung",
      name: "Nội dung",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "noidung_en",
      name: "Nội dung EN",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
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
  ];
  //   function rowKeyGetter(row: ProfileKyNangType) {
  //     return row.id;
  //   }

  // function CustomToggle({
  //   children,
  //   eventKey,
  // }: {
  //   children: ReactNode;
  //   eventKey: string;
  // }) {
  //   const decoratedOnClick = useAccordionButton(eventKey, () =>
  //     console.log("totally custom!")
  //   );

  //   return (
  //     <button
  //       type="button"
  //       style={{ backgroundColor: "pink" }}
  //       onClick={decoratedOnClick}
  //     >
  //       {children}
  //     </button>
  //   );
  // }

  return (
    <>
      <Modal show={showKyNang} onHide={handleKyNangClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật định hướng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col} sm={12}>
                <Form.Label>Tên định hướng:</Form.Label>
                <Form.Control
                  // type="text"
                  as="textarea"
                  rows={4}
                  value={useDataRow.noidung ?? ""}
                  onChange={(event) =>
                    handleChangeTenKyNang(event.target.value)
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12}>
                <Form.Label>Tên định hướng EN:</Form.Label>
                <Form.Control
                  // type="text"
                  as="textarea"
                  rows={4}
                  value={useDataRow.noidung_en ?? ""}
                  onChange={(event) =>
                    handleChangeDinhHuong(event.target.value)
                  }
                ></Form.Control>
                <Form.Label>STT:</Form.Label>
                <Form.Control
                  type="number"
                  maxLength={2}
                  value={useDataRow.stt ?? 0}
                ></Form.Control>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleKyNangClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveDataToGrid}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion.Item eventKey="dinhhuong">
        <Accordion.Header>ĐỊNH HƯỚNG</Accordion.Header>
        <Accordion.Body>
          <DataGrid
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill_preview}`}
            ref={gridRef}
            // className={BEConstCSS.grid_fill}
            // rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={dataApiDinhHuong}
            // rows={useDataArray}
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
