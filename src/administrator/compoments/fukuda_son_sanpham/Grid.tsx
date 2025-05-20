import { createContext, useContext, useMemo, useRef, useState } from "react";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
import {
  CellClickArgs,
  CellMouseEvent,
  CellSelectArgs,
  Column,
  RenderHeaderCellProps,
  type DataGridHandle,
} from "react-data-grid";
import { DataGrid } from "react-data-grid";
import {
  FukudaSonSanPhamBEContext,
  FukudaSonSanPhamBEContextProps,
} from "./FukudaSonSanPhamBEContext";
import BEConstCSS from "../BEConstCSS";
import { Col, Container, Row, Spinner } from "react-bootstrap";

// Context is needed to read filter values otherwise columns are
// re-created when filters are changed and filter loses focus
const FilterContext = createContext<Filter | undefined>(undefined);

interface Filter extends Omit<FukudaSonSanPhamType, "id" | "complete"> {
  ten_hh: string | undefined;
  complete: number | undefined;
  enabled: boolean;
}

function FilterRenderer<R>({
  tabIndex,
  column,
  children,
}: RenderHeaderCellProps<R> & {
  children: (args: { tabIndex: number; filters: Filter }) => React.ReactElement;
}) {
  const filters = useContext(FilterContext)!;
  return (
    <>
      <div>{column.name}</div>
      {/* {filters.enabled && <div>{children({ tabIndex, filters })}</div>} */}
      <div>{children({ tabIndex, filters })}</div>
    </>
  );
}
function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.stopPropagation();
  }
}

export const Grid = () => {
  const context = useContext<FukudaSonSanPhamBEContextProps>(
    FukudaSonSanPhamBEContext
  );
  //console.log(context.dataApi);
  // const handeClick = () => {
  //   selectRow.ma_hh = "TESt";
  // };

  //
  const gridRef = useRef<DataGridHandle>(null);

  const columns = useMemo((): readonly Column<FukudaSonSanPhamType>[] => {
    return [
      {
        key: "ma_hh_nhacungcap",
        name: "Mã hàng NCC",
        // width: "10%",
        minWidth: 150,
        width: "max-content",
        // maxWidth: 100,
      },
      {
        key: "ten_hh",
        name: "Tên hàng hóa",
        // width: "minmax(100px, max-content)",
        width: "max-content",
        minWidth: 200,
        // maxWidth: 100,
        renderHeaderCell: (p) => (
          <FilterRenderer<FukudaSonSanPhamType> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                // className={filterClassname}
                value={filters.ten_hh ?? ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ten_hh: e.target.value,
                  })
                }
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: "ma_hh",
        name: "Mã hàng hóa",
        // width: "10%",
        minWidth: 150,
        width: "max-content",
        // maxWidth: 100,
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
  function rowKeyGetter(row: FukudaSonSanPhamType) {
    return row.ma_hh;
  }
  function onCellClick(
    args: CellClickArgs<FukudaSonSanPhamType>,
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
  function onSelectedCellChange(args: CellSelectArgs<FukudaSonSanPhamType>) {
    if (!args.row) return;
    context.selectRow.id = args.row.id;
    context.selectRow.ma_hh = args.row.ma_hh;
    context.setSelectRow(context.selectRow);
    // console.log("onSelectedCellChange: " + selectRow.id);
  }

  const [filters, setFilters] = useState(
    (): Filter => ({
      ten_hh: "",
      ma_hh_nhacungcap: "",
      ma_hh: "",
      // id: "",
      complete: undefined,
      enabled: true,
    })
  );

  return (
    <>
      <FilterContext value={filters}>
        <DataGrid
          ref={gridRef}
          className={`rdg-light ${BEConstCSS.grid_fill}`}
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
      </FilterContext>

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
