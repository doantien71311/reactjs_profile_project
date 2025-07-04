import { useContext, useRef, useState } from "react";
import { DataGrid, DataGridHandle, RenderCellProps } from "react-data-grid";
// import BEConstCSS from "../../../BEConstCSS";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";

import {
  Accordion,
  Button,
  Form,
  Modal,
  Image,
  InputGroup,
  Col,
  Row,
} from "react-bootstrap";
import BEConstCSS from "../../BEConstCSS";
import {
  CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import { ProfileHinhAnhType } from "../../../../model/ProfileNhanVienType";
import { v4 as uuidv4 } from "uuid";
import { uploadSingleImage } from "../../../../services/HttpServices";
import UrlApi from "../../../../services/UrlApi";

export const ProfileBEAnhDaiDienIndex = () => {
  const useData =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).dataApi;
  const setDataApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).setDataApi;
  const [showKyNang, setShowKyNang] = useState(false);
  const [useDataRow, setUseDataRow] = useState<ProfileHinhAnhType>({});
  const handleKyNangClose = () => setShowKyNang(false);
  const handleKyNangShow = () => setShowKyNang(true);

  //#region các nút trên lưới
  const handleAddRow = () => {
    setUseDataRow({
      id: uuidv4(),
      stt: (useData.profile_nhanvien_kynang ?? []).length + 1,
    });
    setShowKyNang(true);
  };
  const handleUpdateRow = (props: RenderCellProps<ProfileHinhAnhType>) => {
    handleKyNangShow();
    setUseDataRow(props.row);
  };
  const handleDeleteRow = (props: RenderCellProps<ProfileHinhAnhType>) => {
    setDataApi({
      ...useData,
      profile_nhanvien_hinhanh: (useData.profile_nhanvien_hinhanh ?? []).filter(
        (f) => f.id !== props.row.id
      ),
    });
    setShowKyNang(false);
  };
  //
  const handleSaveDataToGrid = () => {
    const rowIndex = (useData.profile_nhanvien_hinhanh ?? []).findIndex(
      (f) => f.id === useDataRow.id
    );
    if (rowIndex < 0) (useData.profile_nhanvien_hinhanh ?? []).push(useDataRow);
    else {
      (useData.profile_nhanvien_hinhanh ?? [])[rowIndex] = useDataRow;
    }
    //
    setDataApi({ ...useData });
    setShowKyNang(false);
  };
  //#endregion các nút trên lưới

  //#region các thay đổi control
  //  event: ChangeEvent<HTMLInputElement> | undefined
  //  event: ChangeEvent<FormControlProps> | undefined
  const handleFileChange = (
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
        setUseDataRow({
          ...useDataRow,
          ten_hinhanh: file.name,
          url_hinhanh: data.file_url,
          ma_hinhanh: data.file_name ?? "",
        });
      }
    );
  };

  const handleChangeTenHinhAnh = (event: string) => {
    setUseDataRow({
      ...useDataRow,
      ten_hinhanh: event,
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
        props: RenderCellProps<ProfileHinhAnhType>
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
      key: "url_hinhanh",
      name: "Ảnh",
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      // width: "minmax(70px, 70px)",
      resizable: false,
      renderCell(props: RenderCellProps<ProfileHinhAnhType>) {
        return (
          <Image
            key={props.row.id ?? ""}
            style={{ width: "70px", height: "70px", objectFit: "scale-down" }}
            src={props.row.url_hinhanh ?? ""}
            fluid
            rounded
          />
        );
      },
    },
    {
      key: "ten_hinhanh",
      name: "Tên hình ảnh",
      width: "minmax(200px, max-content)",
    },
    {
      key: "ma_hinhanh",
      name: "Mã hình ảnh",
      // width: "10%",
      //   minWidth: 150,
      //   width: "max-content",
      width: "minmax(150px, max-content)",
      // maxWidth: 100,
    },
    // {
    //   key: "url_hinhanh",
    //   name: "Url hình ảnh",
    //   width: "500px",
    //   minWidth: 500,
    //   // maxWidth: "max-content",
    //   // resizable: true,
    //   // width: "minmax(500px, max-content)",
    //   //   width: "max-content",
    //   //   minWidth: 200,
    //   // maxWidth: 100,
    // },
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
          <Modal.Title>Cập nhật hình ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Hình ảnh:</Form.Label>
              <Form.Group controlId="formFile" as={Col} className="mb-3">
                <Row>
                  <Image
                    className="mb-3"
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "scale-down",
                      border: "1px solid back",
                    }}
                    src={useDataRow.url_hinhanh ?? ""}
                    fluid
                    rounded
                  />
                </Row>
                <Row>
                  <a
                    className="mb-3"
                    href={useDataRow.url_hinhanh ?? ""}
                    target="_blank"
                  >
                    {useDataRow.url_hinhanh ?? ""}
                  </a>
                </Row>

                <InputGroup>
                  <Button>Xóa hình</Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileChange(event)}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tên hình ảnh:</Form.Label>
              <Form.Control
                type="text"
                value={useDataRow.ten_hinhanh ?? ""}
                onChange={(event) => handleChangeTenHinhAnh(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mã hình ảnh:</Form.Label>
              <Form.Control
                type="text"
                readOnly={true}
                value={useDataRow.ma_hinhanh}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>STT:</Form.Label>
              <Form.Control
                type="number"
                maxLength={2}
                value={useDataRow.stt ?? 0}
              ></Form.Control>
            </Form.Group>
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

      <Accordion.Item eventKey="hinhanh">
        <Accordion.Header>Hình ảnh</Accordion.Header>
        <Accordion.Body>
          <DataGrid
            key={`${useData.soid}-hinhanh`}
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill_preview}`}
            ref={gridRef}
            // className={BEConstCSS.grid_fill}
            // rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={useData.profile_nhanvien_hinhanh ?? []}
            rowHeight={70}
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
