import { useEffect } from "react";
import { useState } from "react";
import { getArrayDataPromise } from "../../../services/HttpServices";
import UrlApi from "../../../services/UrlApi";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";

export const FukudaSonSanPhamBEIndex = () => {
  const [dataApi, setDataApi] = useState<FukudaSonSanPhamType[]>([]);
  //Cách 1
  useEffect(() => {
    // getArrayDataPromise<FukudaSonSanPhamType>(
    //   UrlApi.api_fukuda_son_san_pham_lay_ds
    // ).then((data) => {
    //   data.map((map) => {
    //     console.log(map.ma_hh);
    //     console.log(map.ten_hh);
    //   });
    // });
  });

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
  }, []);

  return (
    <>
      {dataApi.map((map) => (
        <>
          <h6>{map.ma_hh}</h6>
          <h6>{map.ten_hh ?? ""}</h6>
        </>
      ))}
    </>
  );
};
