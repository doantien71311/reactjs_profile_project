import { useContext, useMemo, useRef, useState } from "react";
import { NhanVienType } from "../../../model/NhanVienType";
import {
  CellClickArgs,
  CellMouseEvent,
  CellSelectArgs,
  Column,
  type DataGridHandle,
} from "react-data-grid";
import { DataGrid } from "react-data-grid";
import { NhanVienContext, NhanVienContextProps } from "./NhanVienContext";
import BEConstCSS from "../BEConstCSS";
import { Col, Container, Row, Spinner } from "react-bootstrap";

export const NhanVienGrid = () => {
  const context = useContext<NhanVienContextProps>(NhanVienContext);
  const gridRef = useRef<DataGridHandle>(null);
  const columns = useMemo((): readonly Column<NhanVienType>[] => {
    return [
      {
        key: "ma_nv",
        name: "Mã nhân viên",
        // width: "10%",
        minWidth: 150,
        width: "max-content",
        // maxWidth: 100,
      },
      {
        key: "ten_nv",
        name: "Tên nhân viên",
        width: "minmax(300px, max-content)",
        minWidth: 300,
        // maxWidth: 100,
        // renderHeaderCell: (p) => (
        //   <FilterRenderer<NhanVienType> {...p}>
        //     {({ filters, ...rest }) => (
        //       <input
        //         {...rest}
        //         // className={filterClassname}
        //         value={filters.ten_hh ?? ""}
        //         onChange={(e) =>
        //           // setFilters({
        //           //   ...filters,
        //           //   ten_hh: e.target.value,
        //           // })
        //           console.log(e)
        //         }
        //         onKeyDown={inputStopPropagation}
        //       />
        //     )}
        //   </FilterRenderer>
        // ),
      },
      {
        key: "dienthoai",
        name: "Điện thoại",
        // width: "10%",
        minWidth: 150,
        width: "max-content",
        // maxWidth: 100,
      },
      {
        key: "email",
        name: "Email",
        width: "minmax(10%, max-content)",
        minWidth: 300,
      },
      {
        key: "ngaysinh",
        name: "Ngày sinh",
        width: "minmax(10%, max-content)",
        minWidth: 150,
      },

      {
        key: "diachi_thuongtru",
        name: "Địa chỉ thường trú",
        width: "minmax(10%, max-content)",
        minWidth: 400,
      },
      {
        key: "ma_chucvu",
        name: "Mã chức vụ",
        width: "minmax(10%, max-content)",
        minWidth: 100,
      },
      {
        key: "ten_chucvu",
        name: "Tên chức vụ",
        width: "minmax(10%, max-content)",
        minWidth: 200,
      },
      {
        key: "url_hinhanh",
        name: "Hình ảnh",
        width: "minmax(300px, max-content)",
        minWidth: 300,
      },
      {
        key: "ma_nv_tuyendung",
        name: "Mã NV tuyển dụng",
        width: "minmax(10%, max-content)",
        minWidth: 150,
      },
      {
        key: "ten_nv_tuyendung",
        name: "Tên nhân viên tuyển dụng",
        width: "minmax(10%, max-content)",
        minWidth: 300,
      },
      {
        key: "id",
        name: "ID",
        // width: "5%",
        width: "max-content",
        minWidth: 50,
        // maxWidth: 100,
      },
    ];
  }, []);

  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<string> => new Set()
  );
  function rowKeyGetter(row: NhanVienType) {
    return row.ma_hh;
  }
  function onCellClick(
    args: CellClickArgs<NhanVienType>,
    event: CellMouseEvent
  ) {
    if (args.column.key === "id") {
      event.preventGridDefault();
    }
    context.selectRow.id = args.row.id;
    context.selectRow.ma_hh = args.row.ma_hh;
    context.setSelectRow(context.selectRow);
    // selectRow.id = args.row.id;
    // selectRow.ma_hh = args.row.ma_hh;
    // console.log("onCellClick: " + selectRow.id);
  }
  function onSelectedCellChange(args: CellSelectArgs<NhanVienType>) {
    if (!args.row) return;
    context.selectRow.id = args.row.id;
    context.selectRow.ma_hh = args.row.ma_hh;
    context.setSelectRow(context.selectRow);
    // console.log("onSelectedCellChange: " + selectRow.id);
  }

  // const [filters, setFilters] = useState(
  //   (): Filter => ({
  //     ten_hh: "",
  //     ma_hh_nhacungcap: "",
  //     ma_hh: "",
  //     // id: "",
  //     complete: undefined,
  //     enabled: true,
  //   })
  // );

  return (
    <>
      {/* <FilterContext value={filters}> */}
      <DataGrid
        ref={gridRef}
        className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill}`}
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={context.dataApi}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onSelectedCellChange={onSelectedCellChange}
        onCellClick={onCellClick}
        defaultColumnOptions={{
          minWidth: 50,
          resizable: true,
          sortable: true,
          draggable: true,
        }}
      />
      {/* </FilterContext> */}

      {context.isLoadingApi ? (
        <>
          <div className={BEConstCSS.grid_fill_loading}></div>
          <Container fluid>
            <Row className="position-absolute bottom-50 end-50">
              <Col className="d-flex align-items-center justify-content-center h-auto w-auto p-0">
                <Spinner animation="border" variant="primary"></Spinner>
                <span className="opacity-100 align-items-center justify-content-center h-auto w-auto p-0 text-info w-100 p-3 fw-bold">
                  Đang tải dữ liệu...
                </span>
              </Col>
            </Row>

            {/* <Row className="align-items-center justify-content-center h-auto w-auto p-3 position-absolute bottom-50 end-50 bg-danger">
            <Col className="bg-success align-items-center justify-content-center h-100 d-inline-block">
              <Spinner animation="border" variant="primary"></Spinner>
            </Col>
          </Row>
          <Row>
            <Col className="bg-success align-items-center justify-content-center h-100 d-inline-block">
              <span className="text-info w-100 p-3 fw-bold align-middle">
                Đang tải dữ liệu...
              </span>
            </Col>
          </Row> */}
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
