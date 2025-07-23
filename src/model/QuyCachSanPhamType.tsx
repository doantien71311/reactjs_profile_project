export type QuyCachSanPhamType = {
  ma_nhom_hh: string;
  ten_nhom_hh: string;
};

export const QuyCachSanPhamTypeList = () => {
  const result: QuyCachSanPhamType[] = [];
  result.push({ ma_nhom_hh: "THUNG", ten_nhom_hh: "Thùng" });
  result.push({ ma_nhom_hh: "LON", ten_nhom_hh: "Lon" });
  result.push({ ma_nhom_hh: "BAO", ten_nhom_hh: "Bao" });
  result.push({ ma_nhom_hh: "KG", ten_nhom_hh: "Kg" });
  return result;
};
