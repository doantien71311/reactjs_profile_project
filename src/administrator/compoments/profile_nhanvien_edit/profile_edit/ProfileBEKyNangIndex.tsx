import { useContext, useRef, useState } from "react";
import { DataGrid, DataGridHandle, RenderCellProps } from "react-data-grid";
// import BEConstCSS from "../../../BEConstCSS";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";

import { Accordion, Button, Form, Modal } from "react-bootstrap";
import BEConstCSS from "../../BEConstCSS";
import {
  CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import { ProfileKyNangType } from "../../../../model/ProfileNhanVienType";
import { v4 as uuidv4 } from "uuid";

export const ProfileBEKyNangIndex = () => {
  const { dataApiKyNang, setDataApiKyNang } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);

  const [showKyNang, setShowKyNang] = useState(false);
  const [useDataRow, setUseDataRow] = useState<ProfileKyNangType>({});
  const handleKyNangClose = () => setShowKyNang(false);
  const handleKyNangShow = () => setShowKyNang(true);

  //#region các nút trên lưới
  const handleAddRow = () => {
    setUseDataRow({
      id: uuidv4(),
      stt: dataApiKyNang.length + 1,
    });
    setShowKyNang(true);
  };
  const handleUpdateRow = (props: RenderCellProps<ProfileKyNangType>) => {
    handleKyNangShow();
    console.log(props.row);
    // setUseDataRow({ ...useDataRow, thoigian_qtlv: props.row.thoigian_qtlv });
    setUseDataRow(props.row);
  };
  const handleDeleteRow = (props: RenderCellProps<ProfileKyNangType>) => {
    // const indexDelete = (useData.profile_nhanvien_kynang ?? []).findIndex(
    //   (f) => f.id === props.row.id
    // );
    // delete (useData.profile_nhanvien_kynang ?? [])[indexDelete];
    // setDataApi(useData);

    setDataApiKyNang(dataApiKyNang.filter((f) => f.id !== props.row.id));
    setShowKyNang(false);
  };
  //
  const handleSaveDataToGrid = () => {
    const rowIndex = dataApiKyNang.findIndex((f) => f.id === useDataRow.id);
    if (rowIndex < 0) (dataApiKyNang ?? []).push(useDataRow);
    else {
      dataApiKyNang[rowIndex] = useDataRow;
    }
    //
    setDataApiKyNang([...dataApiKyNang]);
    setShowKyNang(false);
  };
  //#endregion các nút trên lưới

  //#region các thay đổi control
  const handleChangeTenKyNang = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      ten_kynang: event,
    });
  };
  const handleChangeTenKyNang_EN = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      ten_kynang_en: event,
    });
  };
  const handleChangePhanTramKyNang = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      phantram_kynang: parseInt(event),
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
      key: "ten_kynang",
      name: "Tên kỹ năng",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "ten_kynang_en",
      name: "Skill",
      width: "minmax(300px, max-content)",
      // width: "max-content",
      // minWidth: "10%",
      // maxWidth: 100,
    },
    {
      key: "phantram_kynang",
      name: "Tỷ lệ",
      // width: "10%",
      //   minWidth: 150,
      //   width: "max-content",
      width: "minmax(100px, max-content)",
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
          <Modal.Title>Cập nhật kỹ năng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Tên kỹ năng:</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.ten_kynang ?? ""}
              onChange={(event) => handleChangeTenKyNang(event.target.value)}
            ></Form.Control>
            <Form.Label>Skill:</Form.Label>
            <Form.Control
              type="text"
              value={useDataRow.ten_kynang_en ?? ""}
              onChange={(event) => handleChangeTenKyNang_EN(event.target.value)}
            ></Form.Control>
            <Form.Label>% kỹ năng:</Form.Label>
            <Form.Control
              type="number"
              maxLength={2}
              value={useDataRow.phantram_kynang}
              onChange={(event) =>
                handleChangePhanTramKyNang(event.target.value)
              }
            ></Form.Control>
            <Form.Label>STT:</Form.Label>
            <Form.Control
              type="number"
              maxLength={2}
              value={useDataRow.stt ?? 0}
            ></Form.Control>
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

      <Accordion.Item eventKey="kynang">
        <Accordion.Header>KỸ NĂNG</Accordion.Header>
        <Accordion.Body>
          <DataGrid
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill_preview}`}
            ref={gridRef}
            // className={BEConstCSS.grid_fill}
            // rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={dataApiKyNang}
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
