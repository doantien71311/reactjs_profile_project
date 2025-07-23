import { createContext, useContext, useMemo, useRef, useState } from "react";
import { NhanVienType } from "../../../model/NhanVienType";
import {
  // CellMouseArgs,
  // CellMouseEvent,
  CellSelectArgs,
  Column,
  RenderCellProps,
  RenderHeaderCellProps,
  SortColumn,
  type DataGridHandle,
} from "react-data-grid";
import { DataGrid } from "react-data-grid";
import { NhanVienContext, NhanVienContextProps } from "./NhanVienContext";
import BEConstCSS from "../BEConstCSS";
import { Image } from "react-bootstrap";

// const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
// });

interface SummaryRow {
  id: string;
  totalCount: number;
  yesCount: number;
}
interface NhanVienFilter extends Omit<NhanVienType, "soid" | "complete"> {
  ten_nv: string | undefined;
}
const FilterContext = createContext<NhanVienFilter | undefined>(undefined);
function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.stopPropagation();
  }
}
function FilterNhanVienRenderer<R, S>({
  tabIndex,
  column,
  children,
}: RenderHeaderCellProps<R, S> & {
  children: (args: {
    tabIndex: number;
    filters: NhanVienFilter;
  }) => React.ReactElement;
}) {
  const filters = useContext(FilterContext)!;
  return (
    <>
      <div>{column.name}</div>
      <div>{children({ tabIndex, filters })}</div>
    </>
  );
}
export const NhanVienGrid = () => {
  //
  const context = useContext<NhanVienContextProps>(NhanVienContext);
  const gridRef = useRef<DataGridHandle>(null);

  //#region các hàm private

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
      case "dienthoai":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "email":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "facebook":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "zalo":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "diachi_thuongtru":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "ma_chucvu":
      case "ten_chucvu":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "ma_nv_tuyendung":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "ten_nv_tuyendung":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "ngaysinh_string":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      case "soid":
        return (a, b) => {
          return (a[sortColumn] ?? "").localeCompare(b[sortColumn] ?? "");
        };
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }
  //#endregion end các hàm private

  const [filters, setFilters] = useState(
    (): NhanVienFilter => ({
      ten_nv: "",
      ma_nv: "",
      dienthoai: "",
      email: "",
      ngaysinh_string: "",
      diachi_thuongtru: "",
      ma_chucvu: "",
      ten_chucvu: "",
      ma_nv_tuyendung: "",
      ten_nv_tuyendung: "",
    })
  );

  //#region các use state
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  //#endregion các use state

  //#region các useMemo

  const filteredRows = useMemo(() => {
    // console.log("filteredRows :" + filters.ten_nv);
    const dataFilter = context.dataApi.filter((r) => {
      return (
        (filters.ten_nv
          ? (r.ten_nv ?? "")
              .toLowerCase()
              .includes(filters.ten_nv.toLowerCase())
          : true) &&
        (filters.ma_nv
          ? (r.ma_nv ?? "").toLowerCase().includes(filters.ma_nv.toLowerCase())
          : true) &&
        (filters.dienthoai
          ? (r.dienthoai ?? "")
              .toLowerCase()
              .includes(filters.dienthoai.toLowerCase())
          : true) &&
        (filters.ten_chucvu
          ? (r.ten_chucvu ?? "")
              .toLowerCase()
              .includes(filters.ten_chucvu.toLowerCase())
          : true) &&
        (filters.ma_nv_tuyendung
          ? (r.ma_nv_tuyendung ?? "")
              .toLowerCase()
              .includes(filters.ma_nv_tuyendung.toLowerCase())
          : true) &&
        (filters.ten_nv_tuyendung
          ? (r.ten_nv_tuyendung ?? "")
              .toLowerCase()
              .includes(filters.ten_nv_tuyendung.toLowerCase())
          : true) &&
        (filters.ngaysinh_string
          ? (r.ngaysinh_string ?? "")
              .toLowerCase()
              .includes(filters.ngaysinh_string.toLowerCase())
          : true)
      );
    });
    if (sortColumns.length === 0) return dataFilter;
    return dataFilter.toSorted((a, b) => {
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
  }, [
    context.dataApi,
    filters,
    //  , sortColumns /// Tiến tạm khóa vì sort column và filter row trùng nhau
  ]);

  // const sortedRows = useMemo((): readonly NhanVienType[] => {
  //   if (sortColumns.length === 0) return context.dataApi;

  //   return context.dataApi.toSorted((a, b) => {
  //     for (const sort of sortColumns) {
  //       const comparator = getComparator(sort.columnKey);
  //       const compResult = comparator(a, b);
  //       if (compResult !== 0) {
  //         return sort.direction === "ASC" ? compResult : -compResult;
  //       }
  //       // return sort.direction === "ASC" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  // }, [context.dataApi, sortColumns]);
  //
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
        // frozen: true,
        renderSummaryCell() {
          return <strong>Tổng cộng</strong>;
        },
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ma_nv ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ma_nv: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
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
        // headerCellClass: "filter-cell",
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ten_nv ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ten_nv: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "dienthoai",
        name: "Điện thoại",
        // width: "10%",
        minWidth: 150,
        width: "max-content",
        // maxWidth: 100,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.dienthoai ?? ""}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    dienthoai: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "email",
        name: "Email",
        width: "minmax(10%, max-content)",
        minWidth: 300,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.email ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    email: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "ngaysinh_string",
        name: "Ngày sinh",
        width: "minmax(10%, max-content)",
        minWidth: 150,
        // renderCell(props) {
        //   return new Intl.DateTimeFormat("vi-VN", {
        //     year: "numeric",
        //     month: "2-digit",
        //     day: "2-digit",
        //   }).format(props.row.ngaysinh);
        // },
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              // <Form.Control
              //   {...rest}
              //   type="date"
              //   name="datepic"
              //   placeholder="DateRange"
              //   value={filters.ngaysinh!}
              //   onChange={(e) => setFilters(e.target.value)}
              // />

              // <DatePicker
              //   {...rest}
              //   selected={filters.ngaysinh}
              //   dateFormat={"dd/MM/yyyy"}
              //   dateFormatCalendar={"dd/MM/yyyy"}
              //   preventOpenOnFocus={false}
              //   showTimeSelect={false}
              //   showTimeInput={false}
              //   showWeekPicker={false}
              //   showMonthYearPicker={false}
              //   showFullMonthYearPicker={false}
              //   showTwoColumnMonthYearPicker={false}
              //   showFourColumnMonthYearPicker={false}
              //   selectsDisabledDaysInRange={true}
              //   showYearPicker={false}
              //   showQuarterYearPicker={false}
              //   enableTabLoop={false}
              //   swapRange={false}
              //   onChange={(dataDate) =>
              //     setFilters({
              //       ...filters,
              //       ngaysinh: dataDate! ?? Date.now(),
              //     })
              //   }
              //   // onKeyDown={inputStopPropagation}
              // />

              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                value={filters.ngaysinh_string}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ngaysinh_string: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },

      {
        key: "diachi_thuongtru",
        name: "Địa chỉ thường trú",
        width: "minmax(10%, max-content)",
        minWidth: 400,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.diachi_thuongtru ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    diachi_thuongtru: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "ma_chucvu",
        name: "Mã chức vụ",
        width: "minmax(10%, max-content)",
        minWidth: 100,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ma_chucvu ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ma_chucvu: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "ten_chucvu",
        name: "Tên chức vụ",
        width: "minmax(10%, max-content)",
        minWidth: 200,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ten_chucvu ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ten_chucvu: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "url_hinhanh",
        name: "Ảnh",
        width: 50,
        frozen: true,
        minWidth: 70,
        maxWidth: 70,
        renderCell(props: RenderCellProps<NhanVienType, SummaryRow>) {
          return (
            <Image
              key={props.row.soid ?? ""}
              style={{
                width: "50px",
                height: "50px",
                // objectFit: "scale-down",
                objectFit: "cover",
                boxShadow: "1px 1px 3px grey",
              }}
              src={props.row.url_hinhanh ?? ""}
              fluid
              // thumbnail
              roundedCircle
            />
          );
        },
      },
      {
        key: "ma_nv_tuyendung",
        name: "Mã NV tuyển dụng",
        width: "minmax(10%, max-content)",
        minWidth: 150,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ma_nv_tuyendung ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ma_nv_tuyendung: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "ten_nv_tuyendung",
        name: "Tên nhân viên tuyển dụng",
        width: "minmax(10%, max-content)",
        minWidth: 300,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ten_nv_tuyendung ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ten_nv_tuyendung: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
      {
        key: "soid",
        name: "soid",
        // width: "5%",
        width: "max-content",
        minWidth: 50,
        // maxWidth: 100,
        renderHeaderCell: (p) => (
          <FilterNhanVienRenderer<NhanVienType, SummaryRow> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={"grid_fill_header_cell_filter"}
                // style={{
                //   inlineSize: "100%",
                //   padding: "4px",
                //   fontSize: "14px",
                // }}
                value={filters.ten_nv_tuyendung ?? ""}
                onChange={(e) => {
                  // console.log("ten_nv :" + e.target.value);
                  setFilters({
                    ...filters,
                    ten_nv: e.target.value,
                  });
                }}
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterNhanVienRenderer>
        ),
      },
    ];
  }, []);

  //#endregion các useMemo

  // const [selectedRows, setSelectedRows] = useState(
  //   (): ReadonlySet<string> => new Set()
  // );

  //#region các function của data grid
  function rowKeyGetter(row: NhanVienType) {
    return row.soid;
  }
  // function onCellClick(
  //   args: CellMouseArgs<NhanVienType, SummaryRow>,
  //   event: CellMouseEvent
  // ) {
  //   if (args.column.key === "soid") {
  //     event.preventGridDefault();
  //   }
  //   console.log("onCellClick: " + args.row.soid);
  //   console.log(args.row.soid);
  //   context.selectRow.soid = args.row.soid;
  //   context.selectRow.ma_nv = args.row.ma_nv;
  //   context.setSelectRow(context.selectRow);
  // }
  function onSelectedCellChange(
    args: CellSelectArgs<NhanVienType, SummaryRow>
  ) {
    if (!args.row) return;
    console.log(args.row);
    // context.selectRow.soid = args.row.soid;
    // context.selectRow.ma_nv = args.row.ma_nv;
    context.setSelectRow(args.row);
    console.log("onSelectedCellChange: " + args.row.soid);
  }
  //#endregion các function của data grid

  return (
    <div>
      <FilterContext value={filters}>
        <DataGrid
          ref={gridRef}
          key={"nhanviengrid"}
          className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_fill}`}
          rowKeyGetter={rowKeyGetter}
          columns={columns}
          rows={filteredRows}
          // selectedRows={selectedRows}
          // onSelectedRowsChange={setSelectedRows}
          onSelectedCellChange={onSelectedCellChange}
          // onCellClick={onCellClick}
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
          rowHeight={55}
          headerRowHeight={70}
        />
      </FilterContext>
    </div>
  );
};
