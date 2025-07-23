import { useContext, useRef } from "react";
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

import { Accordion } from "react-bootstrap";
import BEConstCSS from "../../BEConstCSS";
import { ProfileQuaTrinhLamViecType } from "../../../../model/ProfileNhanVienType";
// import { useQuill } from "react-quilljs";
import {
  CommonButtonAddDataGrid,
  CommonButtonEditDeleteDataGrid,
} from "../../common_ui/CommonUI";
import { useNavigate } from "react-router-dom";
import ChucNangUrl from "../../../ChucNangUrl";

export const ProfileBEQuaTrinhLamViecIndex = () => {
  const navigate = useNavigate();
  const { dataApiQTLV, setDataApiQTLV } =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext);

  //#region các nút trên lưới
  const handleAddRow = () => {
    navigate(
      ChucNangUrl.toUrlDanhMuc(
        ChucNangUrl.administrator_profile_qtlv_edit,
        "*",
        true
      )
    );
  };
  const handleUpdateRow = (
    props: RenderCellProps<ProfileQuaTrinhLamViecType>
  ) => {
    navigate(
      ChucNangUrl.toUrlDanhMuc(
        ChucNangUrl.administrator_profile_qtlv_edit,
        props.row.id ?? "",
        false
      )
    );
  };

  const handleDeleteRow = (
    props: RenderCellProps<ProfileQuaTrinhLamViecType>
  ) => {
    setDataApiQTLV(dataApiQTLV.filter((f) => f.id !== props.row.id));
  };

  //#endregion trên lưới

  const gridRef = useRef<DataGridHandle>(null);
  const columns = [
    {
      key: "SELECT_COLUMN_KEY",
      name: "",
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      resizable: true,
      frozen: true,
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
      key: "thoigian_qtlv_en",
      name: "Working date",
      width: "minmax(15%, max-content)",
    },
    {
      key: "congty_qtlv",
      name: "Tên công ty",
      width: "minmax(30%, max-content)",
      // maxWidth: 100,
    },
    {
      key: "congty_qtlv_en",
      name: "Company",
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
      key: "vitri_qtlv_en",
      name: "Designation EN",
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
      key: "mota_qtlv_en",
      name: "Mô tả công việc EN",
      width: "minmax(100%, max-content)",
      renderCell(props: RenderCellProps<ProfileQuaTrinhLamViecType>) {
        return (
          <div
            style={{ width: "100%", height: "100%", overflowY: "scroll" }}
            dangerouslySetInnerHTML={{ __html: `${props.row.mota_qtlv_en}` }}
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
      <Accordion.Item eventKey="quatrinhlamviec">
        <Accordion.Header>QUÁ TRÌNH LÀM VIỆC</Accordion.Header>
        <Accordion.Body>
          <DataGrid
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill_preview}`}
            ref={gridRef}
            // className={BEConstCSS.grid_fill}
            // rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={dataApiQTLV}
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
