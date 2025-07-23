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
  // CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import { ProfileHocVanType } from "../../../../model/ProfileNhanVienType";
// import { v4 as uuidv4 } from "uuid";

export const ProfileBEHocVanIndex = () => {
  const { dataApiHocVan, setDataApiHocVan } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);

  const [showKyNang, setShowKyNang] = useState(false);
  const [useDataRow, setUseDataRow] = useState<ProfileHocVanType>({});
  const handleKyNangClose = () => setShowKyNang(false);
  const handleKyNangShow = () => setShowKyNang(true);

  //#region các nút trên lưới
  // const handleAddRow = () => {
  //   setUseDataRow({
  //     id: uuidv4(),
  //     stt: dataApiHocVan.length + 1,
  //   });
  //   setShowKyNang(true);
  // };
  const handleUpdateRow = (props: RenderCellProps<ProfileHocVanType>) => {
    handleKyNangShow();
    console.log(props.row);
    // setUseDataRow({ ...useDataRow, thoigian_qtlv: props.row.thoigian_qtlv });
    setUseDataRow(props.row);
  };
  const handleDeleteRow = (props: RenderCellProps<ProfileHocVanType>) => {
    // const indexDelete = (useData.profile_nhanvien_kynang ?? []).findIndex(
    //   (f) => f.id === props.row.id
    // );
    // delete (useData.profile_nhanvien_kynang ?? [])[indexDelete];
    // setDataApi(useData);

    setDataApiHocVan(dataApiHocVan.filter((f) => f.id !== props.row.id));

    setShowKyNang(false);
  };
  //
  const handleSaveDataToGrid = () => {
    const rowIndex = dataApiHocVan.findIndex((f) => f.id === useDataRow.id);
    if (rowIndex < 0) dataApiHocVan.push(useDataRow);
    else {
      dataApiHocVan[rowIndex] = useDataRow;
    }
    //
    setDataApiHocVan([...dataApiHocVan]);
    setShowKyNang(false);
  };
  //#endregion các nút trên lưới

  //#region các thay đổi control
  const handleChangeThoiGianHocVan = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      thoigian_hocvan: event,
    });
  };
  const handleChangeTenTruong = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      tentruong_hocvan: event,
    });
  };
  const handleChangeTenTruong_EN = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      tentruong_hocvan_en: event,
    });
  };
  const handleChangeChuyenNganh = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      chuyennganh_hocvan: event,
    });
  };
  const handleChangeChuyenNganh_EN = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      chuyennganh_hocvan_en: event,
    });
  };
  const handleChangeBangCap = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      bangcap_hocvan: event,
    });
  };
  const handleChangeBangCap_EN = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      bangcap_hocvan_en: event,
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
      frozen: true,
      resizable: true,
      // renderHeaderCell() // props: RenderHe
      // // aderCellProps<ProfileQuaTrinhLamViecType>
      // {
      //   return (
      //     <CommonButtonAddDataGrid
      //       OnHandleAddClick={handleAddRow}
      //     ></CommonButtonAddDataGrid>
      //   );
      // },
      renderCell(
        props: RenderCellProps<ProfileHocVanType>
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
      key: "tentruong_hocvan",
      name: "Tên trường",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "tentruong_hocvan_en",
      name: "University",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "chuyennganh_hocvan",
      name: "Chuyên ngành",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "chuyennganh_hocvan_en",
      name: "Major",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "bangcap_hocvan",
      name: "Bằng cấp",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "bangcap_hocvan_en",
      name: "Degree",
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

  return (
    <>
      <Modal
        // size="xl"
        size="lg"
        show={showKyNang}
        onHide={handleKyNangClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật học vấn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col} sm={9}>
                <Form.Label>Năm học:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.thoigian_hocvan ?? ""}
                  onChange={(event) =>
                    handleChangeThoiGianHocVan(event.target.value)
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={3}>
                <Form.Label>STT:</Form.Label>
                <Form.Control
                  type="number"
                  maxLength={2}
                  value={useDataRow.stt ?? 0}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12}>
                <Form.Label>Tên trường:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.tentruong_hocvan ?? ""}
                  onChange={(event) =>
                    handleChangeTenTruong(event.target.value)
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12}>
                <Form.Label>University:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.tentruong_hocvan_en ?? ""}
                  onChange={(event) =>
                    handleChangeTenTruong_EN(event.target.value)
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12}>
                <Form.Label>Chuyên ngành:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.chuyennganh_hocvan ?? ""}
                  onChange={(event) =>
                    handleChangeChuyenNganh(event.target.value)
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12}>
                <Form.Label>Major:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.chuyennganh_hocvan_en ?? ""}
                  onChange={(event) =>
                    handleChangeChuyenNganh_EN(event.target.value)
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} sm={12}>
                <Form.Label>Bằng cấp:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.bangcap_hocvan ?? ""}
                  onChange={(event) => handleChangeBangCap(event.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} sm={12}>
                <Form.Label>Degree:</Form.Label>
                <Form.Control
                  type="text"
                  value={useDataRow.bangcap_hocvan_en ?? ""}
                  onChange={(event) =>
                    handleChangeBangCap_EN(event.target.value)
                  }
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

      <Accordion.Item eventKey="hocvan">
        <Accordion.Header>GIÁO DỤC</Accordion.Header>
        <Accordion.Body>
          <DataGrid
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill_preview}`}
            ref={gridRef}
            // className={BEConstCSS.grid_fill}
            // rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={dataApiHocVan}
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
