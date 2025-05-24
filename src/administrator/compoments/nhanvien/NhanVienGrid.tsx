import { useContext, useMemo, useRef, useState } from "react";
import { NhanVienType } from "../../../model/NhanVienType";
import {
  CellClickArgs,
  CellMouseEvent,
  CellSelectArgs,
  Column,
  SortColumn,
  type DataGridHandle,
} from "react-data-grid";
import { DataGrid } from "react-data-grid";
import { NhanVienContext, NhanVienContextProps } from "./NhanVienContext";
import BEConstCSS from "../BEConstCSS";
import { Col, Container, Row, Spinner } from "react-bootstrap";

interface SummaryRow {
  id: string;
  totalCount: number;
  yesCount: number;
}

export const NhanVienGrid = () => {
  const context = useContext<NhanVienContextProps>(NhanVienContext);
  const gridRef = useRef<DataGridHandle>(null);
  //
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const sortedRows = useMemo((): readonly NhanVienType[] => {
    if (sortColumns.length === 0) return context.dataApi;

    return context.dataApi.toSorted((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
        // return sort.direction === "ASC" ? 1 : -1;
      }
      return 0;
    });
  }, [context.dataApi, sortColumns]);
  type Comparator = (a: NhanVienType, b: NhanVienType) => number;
  function getComparator(sortColumn: string): Comparator {
    switch (sortColumn) {
      case "ma_nv":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "ten_nv":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "id":
      case "progress":
      case "startTimestamp":
      case "endTimestamp":
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }

  const summaryRows = useMemo((): readonly SummaryRow[] => {
    return [
      {
        id: "total_0",
        totalCount: context.dataApi.length,
        yesCount: context.dataApi.filter((r) => r.soid).length,
      },
    ];
  }, [context.dataApi]);
  //
  const columns = useMemo((): readonly Column<NhanVienType, SummaryRow>[] => {
    return [
      {
        key: "ma_nv",
        name: "Mã nhân viên",
        // minWidth: 100,
        width: "minmax(100px, max-content)",
        frozen: true,
        renderSummaryCell() {
          return <strong>Tổng cộng</strong>;
        },
      },
      {
        key: "ten_nv",
        name: "Tên nhân viên",
        width: "minmax(300px, max-content)",
        minWidth: 300,
        renderSummaryCell({ row }) {
          return `${row.totalCount.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })} Nhân viên`;
        },
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
    return row.soid;
  }
  function onCellClick(
    args: CellClickArgs<NhanVienType, SummaryRow>,
    event: CellMouseEvent
  ) {
    if (args.column.key === "soid") {
      event.preventGridDefault();
    }
    context.selectRow.soid = args.row.soid;
    context.selectRow.ma_nv = args.row.ma_nv;
    context.setSelectRow(context.selectRow);
    // selectRow.id = args.row.id;
    // selectRow.ma_hh = args.row.ma_hh;
    // console.log("onCellClick: " + selectRow.id);
  }
  function onSelectedCellChange(
    args: CellSelectArgs<NhanVienType, SummaryRow>
  ) {
    if (!args.row) return;
    context.selectRow.soid = args.row.soid;
    context.selectRow.ma_nv = args.row.ma_nv;
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
        // rows={context.dataApi}
        rows={sortedRows}
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
        // topSummaryRows={summaryRows}
        bottomSummaryRows={summaryRows}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
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
