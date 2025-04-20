import { useEffect, useRef, useState } from "react";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
import UrlApi from "../../../services/UrlApi";
import { getArrayDataPromise } from "../../../services/HttpServices";
import { CommonProps } from "./Props";
import {
  CellClickArgs,
  CellMouseEvent,
  CellSelectArgs,
  type DataGridHandle,
} from "react-data-grid";
import { DataGrid } from "react-data-grid";

export const Grid = ({ selectRow }: CommonProps) => {
  const [dataApi, setDataApi] = useState<FukudaSonSanPhamType[]>([]);
  // //Cách 1
  // useEffect(() => {
  //   // getArrayDataPromise<FukudaSonSanPhamType>(
  //   //   UrlApi.api_fukuda_son_san_pham_lay_ds
  //   // ).then((data) => {
  //   //   data.map((map) => {
  //   //     console.log(map.ma_hh);
  //   //     console.log(map.ten_hh);
  //   //   });
  //   // });
  // });
  //Cách 2
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await getArrayDataPromise<FukudaSonSanPhamType>(
        UrlApi.api_fukuda_son_san_pham_lay_ds
      );
      console.log("Cách 2:");
      console.log(data);
      // ...
      setDataApi(data);
    }
    fetchData();
    console.log(selectRow);
  }, []);

  const handeClick = () => {
    selectRow.ma_hh = "TESt";
  };
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
    selectRow.id = args.row.id;
    selectRow.ma_hh = args.row.ma_hh;
    console.log("onCellClick: " + selectRow.id);
  }
  function onSelectedCellChange(args: CellSelectArgs<FukudaSonSanPhamType>) {
    if (!args.row) return;
    selectRow.id = args.row.id;
    selectRow.ma_hh = args.row.ma_hh;
    console.log("onSelectedCellChange: " + selectRow.id);
  }
  return (
    <>
      <DataGrid
        className="fill-grid"
        ref={gridRef}
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={dataApi}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onSelectedCellChange={onSelectedCellChange}
        onCellClick={onCellClick}
      />
      <button onClick={handeClick}></button>
      {/* {dataApi.map((item) => (
        <>
          <h6>{item.ma_hh}</h6>
          <h6>{item.ten_hh}</h6>
          <h6>{item.ma_hh_nhacungcap}</h6>
        </>
      ))} */}
    </>
  );
};
