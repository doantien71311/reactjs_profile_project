import { useParams } from "react-router-dom";

export const FukudaSonSanPhamEditBEIndex = () => {
  const { keyString, isAddNew } = useParams();

  return (
    <>
      <h1>D9ay6 la2 FukudaSonSanPhamEditBEIndex</h1>
      <h1>{keyString}</h1>
      <h1>{isAddNew}</h1>
    </>
  );
};
