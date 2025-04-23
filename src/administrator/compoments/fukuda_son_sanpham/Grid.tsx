import { useContext, useRef, useState } from "react";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
import {
  CellClickArgs,
  CellMouseEvent,
  CellSelectArgs,
  type DataGridHandle,
} from "react-data-grid";
import { DataGrid } from "react-data-grid";
import {
  FukudaSonSanPhamBEContext,
  FukudaSonSanPhamBEContextProps,
} from "./FukudaSonSanPhamBEContext";

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

  const columns = [
    { key: "id", name: "ID" },
    { key: "ma_hh", name: "Mã hàng hóa" },
    { key: "ten_hh", name: "Tên hàng hóa" },
  ];

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
  return (
    <>
      {context.isLoadingApi ? (
        <p>Loading....</p>
      ) : (
        <DataGrid
          className="fill-grid"
          ref={gridRef}
          rowKeyGetter={rowKeyGetter}
          columns={columns}
          rows={context.dataApi}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          onSelectedCellChange={onSelectedCellChange}
          onCellClick={onCellClick}
        />
      )}
    </>
  );
};
